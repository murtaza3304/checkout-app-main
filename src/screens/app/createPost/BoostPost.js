import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../../../assests/theme/Theme';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import {Text} from '../../../components/common/text/Text';
import DurationTimeDropDown from '../../../components/common/dropDown/DurationTimeDropDown';
import CountryPicker from 'react-native-country-picker-modal';
import {Button} from '../../../components/common/button/Button';
import {useStripe} from '@stripe/stripe-react-native';
import {BASE_URL} from '../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonToast from '../../../components/common/toasts/CommonToast';
import HashTagModel from '../../../components/common/countryPikerModel/HashTagModel';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {HASH_TAGS_DATA} from '../../../utils/ConstantData';
import {boostPost, getBoostPost} from '../../../redux/actions/PostAction';
import {Loader} from '../../../components/common/loader/Loader';
import moment from 'moment/moment';
const {showToast} = CommonToast();

export default function BoostPost({navigation, route}) {
  // console.log(route?.params?.postID, 'route?.params?.postID');

  const dispatch = useDispatch();

  // store data
  const getBoostPosts = useSelector(
    store => store?.PostsReducers?.isGetBoostPosts,
  );
  // console.log(getBoostPosts, 'getBoostPosts');

  const [country, setCountry] = useState(null);
  const [countryError, setCountryError] = useState('');
  const [isModel, setIsModel] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState('3');
  const [collectHashtags, setCollectHashtags] = useState([]);
  const [hashTagError, setHashTagError] = useState('');
  const [hashtagText, setHashtagText] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);

  // get boost post
  useEffect(() => {
    let postData = {
      postId: route?.params?.postID,
    };
    dispatch(getBoostPost(postData, setLoading));
  }, []);

  // make time counter
  const FutureDate = getBoostPosts?.success
    ? getBoostPosts?.boostPost?.futureTime
    : '';
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  // count time
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [getBoostPosts]);

  function calculateRemainingTime() {
    const now = moment();
    const futureDate = moment(FutureDate);
    const duration = moment.duration(futureDate.diff(now));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {days, hours, minutes, seconds};
  }

  // hashtags
  useEffect(() => {
    if (collectHashtags?.length > 0) {
      setHashTagError('');
    }
  }, [collectHashtags]);

  function generateRandomHexString(length) {
    const uid = uuid?.v4();
    return uid.replace(/-/g, '').substring(0, length);
  }

  const onHashtagSubmit = () => {
    if (!hashtagText) {
      return;
    } else {
      let newUid = generateRandomHexString(24);
      HASH_TAGS_DATA.push({id: newUid, name: `#${hashtagText} `});
    }
    setHashtagText('');
  };

  // select country
  const onSelect = country => {
    setCountry(country?.name);
    setIsModel(false);
    setCountryError('');
  };

  const validateAccountType = e => {
    if (e != '') {
      if (e === '3 Days' || e === '7 Days') {
        let newVal = e.slice(0, 1).toLowerCase();
        setDuration(newVal);
      } else {
        let newVal = e.slice(0, 2).toLowerCase();
        setDuration(newVal);
      }
    }
  };

  useEffect(() => {
    if (duration === '3') {
      setTotalCost(5);
    } else if (duration === '7') {
      setTotalCost(10);
    } else if (duration === '15') {
      setTotalCost(20);
    } else if (duration === '30') {
      setTotalCost(25);
    } else {
      setTotalCost(5);
    }
  }, [duration]);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const openPaymentSheet = async () => {
    if (!country && collectHashtags?.length <= 0) {
      setCountryError('*Required!');
      setHashTagError('*Required!');
      return;
    } else if (!country) {
      setCountryError('*Required!');
      return;
    } else if (collectHashtags?.length <= 0) {
      setHashTagError('*Required!');
      return;
    } else {
      if (
        country &&
        collectHashtags?.length > 0 &&
        !countryError &&
        !hashTagError
      ) {
        let user = await AsyncStorage.getItem('userDetails');
        user = JSON.parse(user);
        let token = user?.token;

        const response = await fetch(`${BASE_URL}/api/boost/payment-sheet`, {
          method: 'POST',
          body: JSON.stringify({amount: Math.floor(totalCost * 100)}),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`, // Set the Authorization header with the bearer token
          },
        });
        if (response.error) {
          showToast({
            title1: 'Error!',
            title2: 'Something went wrong.',
            type: 'error',
          });
          return;
        }
        let _data = await response.json();

        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
          merchantDisplayName: 'notJust.dev',
          paymentIntentClientSecret: _data.paymentIntent,
        });

        if (initResponse.error) {
          showToast({
            title1: 'Error!',
            title2: 'Something went wrong.',
            type: 'error',
          });
          return;
        }

        // 3. Present the Payment Sheet from Stripe
        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse.error) {
          showToast({
            title1: `Error code: ${paymentResponse.error.code}`,
            title2: paymentResponse.error.message,
            type: 'error',
          });
          return;
        } else {
          let postData = {
            postId: route?.params?.postID,
            targetAudience: collectHashtags,
            targetCountry: country,
            costPay: `$${totalCost}.00`,
            duration: duration,
          };
          dispatch(boostPost(postData));
          navigation.navigate('Home');
        }
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <CommonEllipseHeader
        bgColor={theme.lightColor.newBodyColor}
        navigation={navigation}
      />
      <View style={styles.screen}>
        {loading ? (
          <View
            style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              width: '100%',
              paddingHorizontal: 25,
            }}>
            {getBoostPosts?.success ? (
              <View style={styles.timeContainer}>
                <Text
                  children={
                    getBoostPosts?.message ? getBoostPosts?.message : ''
                  }
                  size={11}
                  textColor={theme.lightColor.termsBorder}
                  fonts={theme.fontFamily.TinosBold}
                  weight={theme.fontWeight.bold}
                  style={{marginBottom: 6}}
                />
                <View style={styles.remainingTimeContainer}>
                  <Text
                    children={'Time Remaining: '}
                    size={16}
                    textColor={theme.lightColor.termsBorder}
                    fonts={theme.fontFamily.TinosBold}
                    weight={theme.fontWeight.bold}
                  />
                  <Text
                    children={`${remainingTime.days} d & ${remainingTime.hours} : ${remainingTime.minutes} : ${remainingTime.seconds}`}
                    size={14}
                    textColor={theme.lightColor.termsBorder}
                    fonts={theme.fontFamily.TinosBold}
                  />
                </View>
              </View>
            ) : (
              false
            )}
            <View>
              <Text
                children={'Duration (Days)'}
                fonts={theme.fontFamily.TinosBold}
                textColor={theme.lightColor.darkGray}
                weight={theme.fontWeight.bold}
                size={15}
                style={{marginBottom: 10}}
              />
              <DurationTimeDropDown
                setDurationTime={validateAccountType}
                defualtValue={duration}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text
                children={'Target Audience by Country'}
                fonts={theme.fontFamily.TinosBold}
                weight={theme.fontWeight.bold}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 10}}
              />
              <Pressable
                style={styles.textInputStyle}
                onPress={() => setIsModel(true)}>
                <Text
                  children={country ? country : 'Select'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.black}
                  size={14}
                  onPressHandler={() => setIsModel(true)}
                />
              </Pressable>
              {countryError ? (
                <Text
                  children={countryError ? countryError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
            </View>
            <View style={{marginTop: 20}}>
              <Text
                children={'Target Audience by Platform'}
                fonts={theme.fontFamily.TinosBold}
                textColor={theme.lightColor.darkGray}
                weight={theme.fontWeight.bold}
                size={15}
                style={{marginBottom: 10}}
              />
              <Pressable
                style={styles.hashTagContainer}
                onPress={() => {
                  setModalVisible(true);
                }}>
                {collectHashtags?.length > 0 ? (
                  collectHashtags.map((item, index) => (
                    <Text
                      key={index}
                      children={`${item}, `}
                      size={14}
                      textColor={theme.lightColor.black}
                      fonts={theme.fontFamily.TinosRegular}
                      onPressHandler={() => setModalVisible(true)}
                    />
                  ))
                ) : (
                  <Text
                    children={'Select'}
                    size={14}
                    textColor={theme.lightColor.black}
                    fonts={theme.fontFamily.TinosRegular}
                    onPressHandler={() => setModalVisible(true)}
                  />
                )}
              </Pressable>
              {hashTagError ? (
                <Text
                  children={hashTagError ? hashTagError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
            </View>
            <View style={{marginTop: 20}}>
              <Text
                children={'Total Cost'}
                fonts={theme.fontFamily.TinosBold}
                weight={theme.fontWeight.bold}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 10}}
              />
              <CommonTextInput
                inputStyle={styles.textInputStyle}
                placeHoldertext={`$${totalCost}.00`}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                editable={false}
              />
            </View>

            <View style={{marginTop: 30}}>
              {getBoostPosts?.success ? (
                <Button
                  title={'Post'}
                  titleStyles={styles.titleStyles}
                  containerStyle={[
                    styles.containerStyle,
                    {backgroundColor: theme?.lightColor?.gray},
                  ]}
                  disabled={true}
                />
              ) : (
                <Button
                  title={'Post'}
                  onPressHandler={openPaymentSheet}
                  titleStyles={styles.titleStyles}
                  containerStyle={[
                    styles.containerStyle,
                    {backgroundColor: theme?.lightColor?.linearRed},
                  ]}
                  linearGradient={true}
                />
              )}
            </View>
          </ScrollView>
        )}
      </View>
      <CountryPicker
        modalProps={{
          visible: isModel,
          onRequestClose: () => setIsModel(false),
        }}
        renderFlagButton={() => null}
        {...{
          onSelect,
        }}
        withFilter={true}
        onClose={() => setIsModel(false)}
      />
      <HashTagModel
        setValue={setCollectHashtags}
        putValue={collectHashtags}
        modelData={HASH_TAGS_DATA}
        modelHeight={'100%'}
        title={'Target Audience'}
        inputSelect={true}
        setHashtagText={setHashtagText}
        onHashtagSubmit={onHashtagSubmit}
        hashtagText={hashtagText}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        placeholderInput="Add Audience"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  textInputStyle: {
    height: 45,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    justifyContent: 'center',
  },
  titleStyles: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.normal,
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: '100%',
    borderRadius: 8,
  },
  hashTagContainer: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  timeContainer: {
    backgroundColor: theme.lightColor.termsBackground,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.lightColor.termsBorder,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  remainingTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

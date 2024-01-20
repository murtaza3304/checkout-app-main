import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {Text} from '../../../components/common/text/Text';
import {theme} from '../../../assests/theme/Theme';
import ToggleSwitch from 'toggle-switch-react-native';
import {Button} from '../../../components/common/button/Button';
import {HASH_TAGS_DATA} from '../../../utils/ConstantData';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFeedPreferences,
  postFeedPreferences,
} from '../../../redux/actions/PostAction';
import {Loader} from '../../../components/common/loader/Loader';
import HashTagModel from '../../../components/common/countryPikerModel/HashTagModel';

export default function FeedPreferences({navigation}) {
  const dispatch = useDispatch();

  const feedData = useSelector(
    store => store?.PostsReducers?.isFeedPreferences,
  );
  // console.log(feedData, 'feedData');

  // states
  const [switchOne, setSwitchOne] = useState(false);
  const [switchTwo, setSwitchTwo] = useState(false);
  const [switchThree, setSwitchThree] = useState(false);
  const [hashtagValue, setHashtagValue] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedPreferencesError, setFeedPreferencesError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getFeedPreferences(setIsLoading));
  }, []);

  // get feed preferences
  useEffect(() => {
    if (feedData) {
      setAccountTypes(feedData?.accountType);
      setHashtagValue(feedData?.HashTags);
    }
  }, [feedData]);

  useEffect(() => {
    if (accountTypes?.includes('seller')) {
      setSwitchOne(false);
    } else {
      setSwitchOne(true);
    }
    if (accountTypes?.includes('consultant')) {
      setSwitchTwo(false);
    } else {
      setSwitchTwo(true);
    }
    if (accountTypes?.includes('supplier')) {
      setSwitchThree(false);
    } else {
      setSwitchThree(true);
    }
  }, [accountTypes]);

  const accountTypesHandler = data => {
    const accountTypeSelected = accountTypes.includes(data);
    if (accountTypeSelected) {
      setAccountTypes(
        accountTypes.filter(selectedItem => selectedItem !== data),
      );
    } else {
      setAccountTypes([...accountTypes, data]);
    }
  };

  const onSaveHandler = () => {
    let feedData = {
      HashTags: hashtagValue,
      accountType: accountTypes,
    };
    // console.log(feedData, 'feedData');
    dispatch(
      postFeedPreferences(
        feedData,
        setLoading,
        navigation,
        setFeedPreferencesError,
      ),
    );
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
        {isLoading ? (
          <View
            style={{
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{width: '100%', paddingHorizontal: 25}}>
            <Text
              children={'Feed Preferences'}
              size={20}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              weight={theme.fontWeight.bold}
              style={{marginBottom: 6}}
            />
            <Text
              children={'Hashtags interested to follow:'}
              size={15}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginBottom: 15}}
            />
            <Pressable
              style={styles.hashTagContainer}
              onPress={() => {
                setModalVisible(true);
              }}>
              {hashtagValue?.length > 0 ? (
                hashtagValue.map((item, index) => (
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
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  onPressHandler={() => setModalVisible(true)}
                />
              )}
            </Pressable>
            {/* switch container */}
            <View style={styles.mainSwitchContainer}>
              <Text
                children={'Users interested to follow'}
                size={18}
                textColor={theme.lightColor.darkGray}
                fonts={theme.fontFamily.TinosBold}
                style={{marginBottom: 15}}
              />
              <View style={styles.switchContainer}>
                <Text
                  children={'Reseller Users'}
                  size={15}
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  style={{marginBottom: 6}}
                />
                <ToggleSwitch
                  isOn={switchOne}
                  onColor={theme.lightColor.headerBg}
                  offColor={theme.lightColor.switchBtn}
                  size="small"
                  onToggle={() => {
                    setSwitchOne(!switchOne);
                    accountTypesHandler('seller');
                  }}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text
                  children={'Virtual Assistant or Consultant Users'}
                  size={15}
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  style={{marginBottom: 6, width: '80%'}}
                />
                <ToggleSwitch
                  isOn={switchTwo}
                  onColor={theme.lightColor.headerBg}
                  offColor={theme.lightColor.switchBtn}
                  size="small"
                  onToggle={() => {
                    setSwitchTwo(!switchTwo);
                    accountTypesHandler('consultant');
                  }}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text
                  children={'Supplier Users'}
                  size={15}
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  style={{marginBottom: 6}}
                />
                <ToggleSwitch
                  isOn={switchThree}
                  onColor={theme.lightColor.headerBg}
                  offColor={theme.lightColor.switchBtn}
                  size="small"
                  onToggle={() => {
                    setSwitchThree(!switchThree);
                    accountTypesHandler('supplier');
                  }}
                />
              </View>
            </View>
            {/* button */}
            <View style={{marginTop: 30}}>
              {feedPreferencesError ? (
                <Text
                  children={feedPreferencesError ? feedPreferencesError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginBottom: 8}}
                  alignText={'center'}
                />
              ) : (
                false
              )}
              <Button
                title={'Save'}
                onPressHandler={onSaveHandler}
                titleStyles={styles.titleStyles}
                containerStyle={styles.containerStyle}
                linearGradient={true}
                loading={loading}
              />
            </View>
          </ScrollView>
        )}
      </View>
      <HashTagModel
        setValue={setHashtagValue}
        putValue={hashtagValue}
        modelData={HASH_TAGS_DATA}
        modelHeight={'100%'}
        title={'Hashtags'}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  mainSwitchContainer: {
    marginTop: 25,
    marginBottom: 25,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  titleStyles: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.normal,
  },
  containerStyle: {
    backgroundColor: theme?.lightColor?.linearRed,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: '100%',
    borderRadius: 8,
  },
  hashTagContainer: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

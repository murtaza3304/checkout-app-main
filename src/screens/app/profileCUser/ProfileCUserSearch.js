import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CTypeSearchHeader from '../../../components/common/ctypeUserComponents/CTypeSearchHeader';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import {Loader} from '../../../components/common/loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {userSearch} from '../../../redux/actions/Actions';
import {windowHeight} from '../../../utils/Dimentions';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import FilterModel from '../../../components/common/countryPikerModel/FilterModel';
import VerifiedIconSvg from '../../../assests/icons/svg/homeSvgs/VerifiedIconSvg';
import {Rating} from 'react-native-ratings';

export default function ProfileCUserSearch({navigation}) {
  // hook
  const dispatch = useDispatch();
  const {capitalizeFirstLetter} = CapitalizeLetter();

  // store data
  const currentUserSearchData = useSelector(
    store => store?.Reducers?.isSearchUser,
  );
  // console.log(currentUserSearchData, 'currentSearchPostData');

  const onGoProfileCUserSpecificationScreen = data => {
    navigation.navigate('ProfileCUserSpecification', {
      cardData: data,
    });
  };

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);
  const [fillterModelData, setFillterModelData] = useState(null);

  // call api
  useEffect(() => {
    userCcurrentPage = 1;
    setHasReachesEnd(false);
    let newData = {
      role: 'supplier',
    };
    dispatch(userSearch(1, newData, setLoading, setHasReachesEnd));
  }, []);

  // control refresh
  const handleRefresh = () => {
    userCcurrentPage = 1;
    setHasReachesEnd(false);
    let newData = {
      role: 'supplier',
    };
    dispatch(userSearch(1, newData, setLoading, setHasReachesEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // search user
  useEffect(() => {
    userCcurrentPage = 1;
    setHasReachesEnd(false);
    let getSearch;
    getSearch = setTimeout(() => {
      let newData = {
        role: 'supplier',
        text: inputText,
      };
      dispatch(userSearch(1, newData, setLoading, setHasReachesEnd));
    }, 1000);
    return () => clearTimeout(getSearch);
  }, [inputText]);

  // load more user
  const fetchMore = () => {
    userCcurrentPage += 1;
    let newData = {
      role: 'supplier',
    };
    if (!hasReachesEnd) {
      if (fillterModelData) {
        dispatch(
          userSearch(
            userCcurrentPage,
            fillterModelData,
            setFooterLoading,
            setHasReachesEnd,
          ),
        );
      } else {
        dispatch(
          userSearch(
            userCcurrentPage,
            newData,
            setFooterLoading,
            setHasReachesEnd,
          ),
        );
      }
    }
  };

  // fillter data api
  const filterUserHandler = newData => {
    dispatch(userSearch(1, newData, setLoading, setHasReachesEnd));
  };

  const SearchCard = ({cardsData}) => {
    return (
      <TouchableOpacity
        style={styles.mainCardContainer}
        onPress={() => onGoProfileCUserSpecificationScreen(cardsData)}>
        <View style={styles.leftContainer}>
          <View style={styles.avatarImageContainer}>
            {cardsData?.profilePic ? (
              <Image
                source={{uri: cardsData?.profilePic}}
                resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                style={styles.avatarImage}
              />
            ) : (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <Image
                  source={require('../../../assests/images/userIconImage.png')}
                  resizeMode="contain"
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 35,
                  }}
                />
              </View>
            )}
            {cardsData?.identified_docs_status && (
              <View style={styles.IndicatorContainer}>
                <VerifiedIconSvg
                  height={16}
                  width={16}
                  color={theme.lightColor.orangeColor}
                />
              </View>
            )}
          </View>
          <Text
            children={
              cardsData?.firstName
                ? capitalizeFirstLetter(cardsData?.firstName)
                : ''
            }
            size={12}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosBold}
            style={{marginTop: 5}}
            onPressHandler={() =>
              onGoProfileCUserSpecificationScreen(cardsData)
            }
          />
          <Text
            children={
              cardsData?.lastName
                ? capitalizeFirstLetter(cardsData?.lastName)
                : ''
            }
            size={12}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosBold}
            onPressHandler={() =>
              onGoProfileCUserSpecificationScreen(cardsData)
            }
          />
          <Text
            children={
              cardsData?.accountType
                ? capitalizeFirstLetter(cardsData?.accountType)
                : ''
            }
            size={11}
            textColor={theme.lightColor.gray}
            fonts={theme.fontFamily.TinosRegular}
            onPressHandler={() =>
              onGoProfileCUserSpecificationScreen(cardsData)
            }
          />
          <Text
            children={
              cardsData?.country
                ? capitalizeFirstLetter(cardsData?.country)
                : ''
            }
            size={11}
            textColor={theme.lightColor.gray}
            fonts={theme.fontFamily.TinosRegular}
            onPressHandler={() =>
              onGoProfileCUserSpecificationScreen(cardsData)
            }
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: '70%',
            paddingBottom: 5,
          }}>
          <View style={styles.desContainer}>
            <Text
              children={'Business: '}
              size={10}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
            <Text
              children={
                cardsData?.businessCategory
                  ? cardsData?.businessCategory
                  : 'Category'
              }
              size={10}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosRegular}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
          </View>
          <View style={styles.desContainer}>
            <Text
              children={'Products: '}
              size={10}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
            <Text
              children={
                cardsData?.productCategory
                  ? cardsData?.productCategory
                  : 'Category'
              }
              size={10}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosRegular}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
          </View>
          <View style={styles.desContainer}>
            <Text
              children={'Phone: '}
              size={10}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
            <Text
              children={cardsData?.phoneNo ? cardsData?.phoneNo : ''}
              size={10}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosRegular}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
          </View>
          <View style={styles.desContainer}>
            <Text
              children={'Email: '}
              size={10}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
            <Text
              children={cardsData?.email ? cardsData?.email : 'abc.gmail.com '}
              size={10}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosRegular}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
          </View>
          <View style={styles.desContainer}>
            <Text
              children={'Website: '}
              size={10}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
            <Text
              children={
                cardsData?.website?.length > 0 ? cardsData?.website[0] : ''
              }
              size={10}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosRegular}
              onPressHandler={() =>
                onGoProfileCUserSpecificationScreen(cardsData)
              }
            />
          </View>
          <View style={styles.starContainer}>
            <Rating
              type="custom"
              ratingImage={require('../../../assests/images/starIcon.png')}
              ratingCount={5}
              imageSize={13}
              readonly={true}
              ratingColor="#f1c40f"
              style={{marginRight: 4, marginTop: 6}}
              startingValue={
                cardsData?.ratingStartValue ? cardsData?.ratingStartValue : 0
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <CTypeSearchHeader
        navigation={navigation}
        inputValue={inputText}
        onChangeHandle={setInputText}
        setModalVisible={setModalVisible}
      />
      <View style={styles.mainContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : currentUserSearchData?.length > 0 ? (
          <FlatList
            data={currentUserSearchData}
            renderItem={({item}) => <SearchCard cardsData={item} />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            onRefresh={() => {
              handleRefresh();
            }}
            refreshing={refreshing}
            onEndReached={() => fetchMore()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              footerLoading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 6,
                    backgroundColor: theme.lightColor.newBodyColor,
                  }}>
                  <Loader color={theme.lightColor.headerBg} size={26} />
                </View>
              ) : (
                false
              )
            }
          />
        ) : (
          <View style={styles.loadingContainer}>
            <Text
              children={'No results found'}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.darkGray}
              weight={theme.fontWeight.bold}
              size={16}
              alignText={'center'}
            />
          </View>
        )}
        <View style={{height: 65}} />
      </View>
      <FilterModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        roleFilter={'supplier'}
        pressHandler={filterUserHandler}
        setFillterModelData={setFillterModelData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 35,
  },
  mainCardContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: '#E4F2FA',
    borderColor: '#69C3F999',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  avatarImageContainer: {
    height: 44,
    width: 44,
    borderRadius: 44,
    borderColor: '#69C3F999',
    borderWidth: 1,
    position: 'relative',
  },
  avatarImage: {
    height: 42,
    width: 42,
    borderRadius: 42,
  },
  IndicatorContainer: {
    position: 'absolute',
    top: 28,
    right: 0,
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
  },
  desContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  loadingContainer: {
    height: windowHeight * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

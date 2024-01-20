import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import {Loader} from '../../../components/common/loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {userBSearch} from '../../../redux/actions/Actions';
import CTypeSearchHeader from '../../../components/common/ctypeUserComponents/CTypeSearchHeader';
import {windowHeight} from '../../../utils/Dimentions';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import FilterModelBUser from '../../../components/common/countryPikerModel/FilterModelBUser';
import VerifiedIconSvg from '../../../assests/icons/svg/homeSvgs/VerifiedIconSvg';
import {Rating} from 'react-native-ratings';

export default function ProfileBUserSearch({navigation}) {
  // hook
  const dispatch = useDispatch();
  const {capitalizeFirstLetter} = CapitalizeLetter();

  // store data
  const currentUserSearchData = useSelector(
    store => store?.Reducers?.isSearchBUser,
  );
  // console.log(currentUserSearchData, 'currentSearchPostData');

  const onGoProfileBUserSpecificationScreen = data => {
    navigation.navigate('ProfileBUserSpecification', {
      cardData: data,
    });
  };

  // states
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);
  const [fillterModelData, setFillterModelData] = useState(null);

  // call api
  useEffect(() => {
    userBcurrentPage = 1;
    setHasReachesEnd(false);
    let newData = {
      role: 'consultant',
    };
    dispatch(userBSearch(1, newData, setLoading, setHasReachesEnd));
  }, []);

  // control refresh
  const handleRefresh = () => {
    userBcurrentPage = 1;
    setHasReachesEnd(false);
    let newData = {
      role: 'consultant',
    };
    dispatch(userBSearch(1, newData, setLoading, setHasReachesEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // search user
  useEffect(() => {
    userBcurrentPage = 1;
    setHasReachesEnd(false);
    let getSearch;
    getSearch = setTimeout(() => {
      let newData = {
        role: 'consultant',
        text: inputText,
      };
      dispatch(userBSearch(1, newData, setLoading, setHasReachesEnd));
    }, 1000);
    return () => clearTimeout(getSearch);
  }, [inputText]);

  // load more user
  const fetchMore = () => {
    userBcurrentPage += 1;
    let newData = {
      role: 'consultant',
    };
    if (!hasReachesEnd) {
      if (fillterModelData) {
        dispatch(
          userBSearch(
            userBcurrentPage,
            fillterModelData,
            setFooterLoading,
            setHasReachesEnd,
          ),
        );
      } else {
        dispatch(
          userBSearch(
            userBcurrentPage,
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
    dispatch(userBSearch(1, newData, setLoading, setHasReachesEnd));
  };

  const SearchCard = ({cardsData}) => {
    return (
      <TouchableOpacity
        style={styles.mainCardContainer}
        key={cardsData?._id}
        onPress={() => onGoProfileBUserSpecificationScreen(cardsData)}>
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
              : false
          }
          size={14}
          textColor={theme.lightColor.darkGray}
          fonts={theme.fontFamily.TinosBold}
          style={{marginTop: 5}}
          onPressHandler={() => onGoProfileBUserSpecificationScreen(cardsData)}
        />
        <Text
          children={
            cardsData?.lastName
              ? capitalizeFirstLetter(cardsData?.lastName)
              : false
          }
          size={14}
          textColor={theme.lightColor.darkGray}
          fonts={theme.fontFamily.TinosBold}
          onPressHandler={() => onGoProfileBUserSpecificationScreen(cardsData)}
        />
        {cardsData?.accountType ? (
          <Text
            children={
              cardsData?.country
                ? capitalizeFirstLetter(cardsData?.accountType)
                : false
            }
            size={11}
            textColor={theme.lightColor.gray}
            fonts={theme.fontFamily.TinosRegular}
            onPressHandler={() =>
              onGoProfileBUserSpecificationScreen(cardsData)
            }
          />
        ) : (
          false
        )}
        {cardsData?.country ? (
          <Text
            children={
              cardsData?.country
                ? capitalizeFirstLetter(cardsData?.country)
                : false
            }
            size={11}
            textColor={theme.lightColor.gray}
            fonts={theme.fontFamily.TinosRegular}
            onPressHandler={() =>
              onGoProfileBUserSpecificationScreen(cardsData)
            }
          />
        ) : (
          false
        )}
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
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
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
                    backgroundColor: 'transparent',
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
      <FilterModelBUser
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        roleFilter={'consultant'}
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
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#E4F2FA',
    borderColor: '#69C3F999',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
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
    top: 29,
    right: 0,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loadingContainer: {
    height: windowHeight * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

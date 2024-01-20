import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import {theme} from '../../../assests/theme/Theme';
import CTypeComponentHeader from '../../../components/common/ctypeUserComponents/CTypeComponentHeader';
import {Text} from '../../../components/common/text/Text';
import RadioButton from '../../../components/common/radioButton/RadioButton';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import RatingStars from '../../../components/common/ratingStars/RatingStars';
import FeedBackModel from '../../../components/common/models/FeedBackModel';
import UseProfileBUserHooks from '../../../components/customHooks/UseProfileBUserHooks';
import {Button} from '../../../components/common/button/Button';
import {Loader} from '../../../components/common/loader/Loader';
import DateTime from '../../../utils/DateTime';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import {Rating} from 'react-native-ratings';
export default function ProfileBUserSpecification({navigation, route}) {
  // console.log(route?.params?.cardData, 'navigation-------oooo');
  // states
  const {
    isFocusedOne,
    isFocusedFour,
    isFocusedFive,
    isFocusedSeven,
    isFocusedEight,
    isFocusedNine,
    isFocusedTen,
    isFocusedEleven,
    ratingHandler,
    feedbackHandler,
    feedbackInput,
    loading,
    validateFeedbackInput,
    feedbackInputError,
    feedbackHandlerError,
    currentUserLoginData,
    currentUserData,
    getFeedbackHandler,
    getUserFeedbackData,
    currentUserFeedbackData,
  } = UseProfileBUserHooks({navigation, route});
  const {capitalizeFirstLetter} = CapitalizeLetter();
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setFocused] = useState(false);

  // call api
  useEffect(() => {
    getFeedbackHandler(route.params.cardData?._id, setIsLoading);
  }, [currentUserFeedbackData]);

  // control refresh
  const handleRefresh = () => {
    getFeedbackHandler(route.params.cardData?._id, setIsLoading);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // console.log(currentUserLoginData?._id, "currentUserLoginData?._id");
  // console.log(currentUserData?.user?._id, "currentUserData?.user?._id");
  const [showAllItems, setShowAllItems] = useState(false);
  const visibleItems = showAllItems
    ? getUserFeedbackData
    : getUserFeedbackData?.slice(0, 3);
  // console.log(visibleItems, 'visibleItems');
  const {getTimeAgo} = DateTime();
  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <CTypeComponentHeader
        navigation={navigation}
        typeOfUser={false}
        typeOfUserStyles={styles.typeOfUserStyle}
        typeOfUserTitle={route?.params?.cardData?.accountType}
        headerData={route?.params?.cardData}
        loginUserId={currentUserLoginData?._id}
        ratingValue={route?.params?.cardData?.ratingStartValue}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            width: '100%',
            paddingHorizontal: 25,
            paddingVertical: 25,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefresh()}
            />
          }>
          <View style={styles.cardContainer}>
            {route?.params?.cardData?.ecommercePlatform.length > 0 ? (
              <>
                <Text
                  children={'Platform Supported'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                />
                <View style={styles.categoryMainContainer}>
                  {route?.params?.cardData?.ecommercePlatform.length > 0
                    ? route?.params?.cardData?.ecommercePlatform.map(
                        (item, index) => (
                          <View
                            style={styles.singleCategoryContainer}
                            key={index}>
                            <RadioButton isFocusedColor={isFocusedOne} />
                            <Text
                              children={item}
                              fonts={theme.fontFamily.TinosRegular}
                              textColor={theme.lightColor.gray}
                              size={12.34}
                              style={{marginLeft: 5}}
                            />
                          </View>
                        ),
                      )
                    : false}
                </View>
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.toolsUsed?.length > 0 ? (
              <>
                <Text
                  children={'Tools'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                />
                <View style={styles.categoryMainContainer}>
                  {route?.params?.cardData?.toolsUsed?.length > 0
                    ? route?.params?.cardData?.toolsUsed?.map((item, index) => (
                        <View
                          style={styles.singleCategoryContainer}
                          key={index}>
                          <RadioButton isFocusedColor={isFocusedFour} />
                          <Text
                            children={item}
                            fonts={theme.fontFamily.TinosRegular}
                            textColor={theme.lightColor.gray}
                            size={12.34}
                            style={{marginLeft: 5}}
                          />
                        </View>
                      ))
                    : false}
                </View>
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.affiliatedAgency?.length > 0 &&
            route?.params?.cardData?.affiliatedAgency[0] ? (
              <>
                <Text
                  children={'Agency Affiliation'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                />
                {route?.params?.cardData?.affiliatedAgency?.length > 0
                  ? route?.params?.cardData?.affiliatedAgency?.map(
                      (item, index) =>
                        item ? (
                          <View
                            style={[
                              styles.singleCategoryContainer,
                              {marginTop: 8},
                            ]}
                            key={index}>
                            <RadioButton isFocusedColor={isFocusedSeven} />
                            <Text
                              children={item}
                              fonts={theme.fontFamily.TinosRegular}
                              textColor={theme.lightColor.gray}
                              size={12.34}
                              style={{marginLeft: 5}}
                            />
                          </View>
                        ) : (
                          false
                        ),
                    )
                  : false}
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.businessEmail ? (
              <>
                <Text
                  children={'Business Email'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                  style={{marginTop: 14}}
                />
                <View
                  style={[
                    styles.singleCategoryContainer,
                    {marginBottom: 20, marginTop: 8},
                  ]}>
                  <RadioButton isFocusedColor={isFocusedFive} />
                  <Text
                    children={
                      route?.params?.cardData?.businessEmail
                        ? route?.params?.cardData?.businessEmail
                        : ''
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.gray}
                    size={15}
                    style={{marginLeft: 5}}
                  />
                </View>
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.otherProfessionalLinks?.length > 0 &&
            route?.params?.cardData?.otherProfessionalLinks[0] ? (
              <>
                <Text
                  children={'Professional Profile Link '}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                />
                {route?.params?.cardData?.otherProfessionalLinks?.length > 0
                  ? route?.params?.cardData?.otherProfessionalLinks?.map(
                      (item, index) =>
                        item ? (
                          <View
                            style={[
                              styles.singleCategoryContainer,
                              {marginTop: 8},
                            ]}
                            key={index}>
                            <RadioButton isFocusedColor={isFocusedEight} />
                            <Text
                              children={item}
                              fonts={theme.fontFamily.TinosRegular}
                              textColor={theme.lightColor.linkColor}
                              size={12.34}
                              style={{marginLeft: 5}}
                            />
                          </View>
                        ) : (
                          false
                        ),
                    )
                  : false}
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.linkedinLink ? (
              <>
                <Text
                  children={'Linkedin Profile Link '}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                  style={{marginTop: 14}}
                />
                {route?.params?.cardData?.linkedinLink ? (
                  <View
                    style={[
                      styles.singleCategoryContainer,
                      {marginBottom: 20, marginTop: 8},
                    ]}>
                    <RadioButton isFocusedColor={isFocusedNine} />
                    <Text
                      children={route?.params?.cardData?.linkedinLink}
                      fonts={theme.fontFamily.TinosRegular}
                      textColor={theme.lightColor.linkColor}
                      size={12.34}
                      style={{marginLeft: 5}}
                    />
                  </View>
                ) : (
                  false
                )}
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.facebookLink ? (
              <>
                <Text
                  children={'Facebook Profile Link'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                />
                {route?.params?.cardData?.facebookLink ? (
                  <View
                    style={[
                      styles.singleCategoryContainer,
                      {marginBottom: 20, marginTop: 8},
                    ]}>
                    <RadioButton isFocusedColor={isFocusedTen} />
                    <Text
                      children={route?.params?.cardData?.facebookLink}
                      fonts={theme.fontFamily.TinosRegular}
                      textColor={theme.lightColor.linkColor}
                      size={12.34}
                      style={{marginLeft: 5}}
                    />
                  </View>
                ) : (
                  false
                )}
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.upworkLink ? (
              <>
                <Text
                  children={'Upwork Profile Link '}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                />
                {route?.params?.cardData?.upworkLink ? (
                  <View
                    style={[
                      styles.singleCategoryContainer,
                      {marginBottom: 20, marginTop: 8},
                    ]}>
                    <RadioButton isFocusedColor={isFocusedEleven} />
                    <Text
                      children={route?.params?.cardData?.upworkLink}
                      fonts={theme.fontFamily.TinosRegular}
                      textColor={theme.lightColor.linkColor}
                      size={12.34}
                      style={{marginLeft: 5}}
                    />
                  </View>
                ) : (
                  false
                )}
              </>
            ) : (
              false
            )}
            {route?.params?.cardData?.description ? (
              <>
                <Text
                  children={'Description '}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                />
                {route?.params?.cardData?.description ? (
                  <View
                    style={[
                      styles.singleCategoryContainer,
                      {marginBottom: 20, marginTop: 8},
                    ]}>
                    <RadioButton isFocusedColor={isFocusedEleven} />
                    <Text
                      children={route?.params?.cardData?.description}
                      fonts={theme.fontFamily.TinosRegular}
                      textColor={theme.lightColor.gray}
                      size={12}
                      style={{marginLeft: 5}}
                    />
                  </View>
                ) : (
                  false
                )}
              </>
            ) : (
              false
            )}
            {currentUserLoginData?._id === route.params.cardData?._id ||
            currentUserData?.user?._id === route.params.cardData?._id ? (
              false
            ) : (
              <>
                <View style={styles.ratingContainer}>
                  <Text
                    children={'Rating'}
                    fonts={theme.fontFamily.TinosBold}
                    textColor={theme.lightColor.darkGray}
                    size={15}
                  />
                  <RatingStars ratingHandler={ratingHandler} />
                </View>
                <View style={styles.contentInputContainer}>
                  <CommonTextInput
                    Value={feedbackInput}
                    inputStyle={[
                      styles.HeaderTextInputStyle,
                      {paddingBottom: feedbackInput ? 0 : 40},
                    ]}
                    onChangeHandler={e => validateFeedbackInput(e)}
                    placeHoldertext={`Share Feedback `}
                    placeholderColor={theme.lightColor.postInputPlaceholder}
                    multilineText={true}
                    onFocusHandler={() => setFocused(true)}
                    onBlurHandler={() => setFocused(false)}
                  />
                </View>
                {feedbackInputError ? (
                  <Text
                    children={feedbackInputError ? feedbackInputError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4}}
                  />
                ) : (
                  false
                )}
                <View style={{marginTop: 40}}>
                  {feedbackHandlerError ? (
                    <Text
                      children={
                        feedbackHandlerError ? feedbackHandlerError : false
                      }
                      fonts={theme.fontFamily.TinosRegular}
                      textColor={theme.lightColor.red}
                      size={10}
                      style={{marginBottom: 6}}
                      alignText={'center'}
                    />
                  ) : (
                    false
                  )}
                  <Button
                    title={'Submit'}
                    onPressHandler={feedbackHandler}
                    loading={loading}
                    titleStyles={styles.titleStyles}
                    containerStyle={styles.containerStyle}
                    linearGradient={true}
                  />
                </View>
              </>
            )}
            <View
              style={{
                marginTop:
                  currentUserLoginData?._id === route.params.cardData?._id
                    ? 0
                    : 30,
              }}>
              <Text
                children={'Feedback'}
                fonts={theme.fontFamily.TinosBold}
                textColor={theme.lightColor.darkGray}
                size={15}
              />
              {isLoading ? (
                <Loader color={theme?.lightColor?.headerBg} />
              ) : (
                <>
                  {visibleItems?.length > 0 ? (
                    visibleItems?.map((item, index) => (
                      <View style={styles.feedbackContainer} key={index}>
                        <View style={styles.feedbackAvatar}>
                          {item?.author?.profilePic ? (
                            <Image
                              source={{uri: item?.author?.profilePic}}
                              style={styles.feedbackAvatarImg}
                              resizeMode={
                                Platform.OS === 'android' ? 'cover' : 'contain'
                              }
                            />
                          ) : (
                            <View style={styles.defaultAvatar}>
                              <Image
                                source={require('../../../assests/images/userIconImage.png')}
                                style={{height: 30, width: 30}}
                                resizeMode={
                                  Platform.OS === 'android'
                                    ? 'cover'
                                    : 'contain'
                                }
                              />
                            </View>
                          )}
                        </View>
                        <View style={{width: '75%'}}>
                          <Text
                            children={`${capitalizeFirstLetter(
                              item?.author?.firstName,
                            )} ${capitalizeFirstLetter(
                              item?.author?.lastName,
                            )}`}
                            fonts={theme.fontFamily.TinosBold}
                            weight={theme.fontWeight.bold}
                            textColor={theme.lightColor.darkGray}
                            size={15}
                            style={{width: '90%'}}
                          />
                          <FeedBackModel
                            reportUserId={item?.author?._id}
                            loginUserId={currentUserLoginData?._id}
                            alreadySignupId={currentUserData?.user?._id}
                            navigation={navigation}
                          />
                          <View style={styles.starContainer}>
                            <Rating
                              type="star"
                              ratingCount={5}
                              imageSize={13}
                              readonly={true}
                              style={{marginRight: 4}}
                              startingValue={item?.rating ? item?.rating : 0}
                            />
                            <Text
                              children={`|   ${getTimeAgo(item?.createdAt)}`}
                              fonts={theme.fontFamily.TinosBold}
                              weight={theme.fontWeight.bold}
                              textColor={theme.lightColor.gray}
                              size={9}
                            />
                          </View>
                          <Text
                            children={item?.feedback}
                            fonts={theme.fontFamily.TinosRegular}
                            weight={theme.fontWeight.regular}
                            textColor={theme.lightColor.gray}
                            size={12}
                            style={{marginTop: 8}}
                          />
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text
                      children={'No feedback yet. Be the first one to rate!'}
                      alignText={'center'}
                      style={{marginTop: 16}}
                    />
                  )}
                </>
              )}
              {visibleItems?.length >= 3 ? (
                <TouchableOpacity
                  style={{marginTop: 14}}
                  onPress={() => setShowAllItems(!showAllItems)}>
                  <Button
                    title={showAllItems ? 'Show less' : 'Show more'}
                    onPressHandler={() => setShowAllItems(!showAllItems)}
                    titleStyles={styles.showItemsText}
                    containerStyle={styles.showItemsContainerStyle}
                  />
                </TouchableOpacity>
              ) : (
                false
              )}
            </View>
            <View style={{height: 10}}></View>
          </View>
        </ScrollView>
      </View>
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
    marginTop: 70,
  },
  cardContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: theme.lightColor.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  categoryMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 20,
  },
  singleCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 6,
  },
  contentInputContainer: {
    borderColor: theme.lightColor.postInputBg,
    borderRadius: 6,
    borderWidth: 1,
    height: 80,
    width: '100%',
    backgroundColor: theme.lightColor.white,
  },
  HeaderTextInputStyle: {
    width: '100%',
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    paddingHorizontal: 20,
  },
  feedBackIconContainer: {
    height: 22,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ratingContainer: {
    // backgroundColor: 'red',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeOfUserStyle: {
    marginTop: 6,
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
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  feedbackContainer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedbackAvatar: {
    borderWidth: 1,
    borderColor: theme.lightColor.headerBg,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  feedbackAvatarImg: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  showItemsText: {
    fontSize: 14,
    fontFamily: theme.fontFamily.TinosBold,
    fontWeight: theme.fontWeight.bold,
    color: theme.lightColor.darkGray,
  },
  showItemsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
});

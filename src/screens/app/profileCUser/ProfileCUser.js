import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../../assests/theme/Theme';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import ProfileHeader from '../../../components/common/profileHeader/ProfileHeader';
import {Text} from '../../../components/common/text/Text';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import {Button} from '../../../components/common/button/Button';
import CheckTerms from '../../../components/common/reCaptcha/CheckTerms';
import PlusIconSvg from '../../../assests/icons/svg/homeSvgs/PlusIconSvg';
import ProfileCUserCustomDropDown from '../../../components/common/customDropDown/ProfileCUserCustomDropDown';
import ProfileCHook from '../../../customHooks/profileHooks/ProfileCHook';
import HashTagModel from '../../../components/common/countryPikerModel/HashTagModel';
import {
  PRODUCT_CATEGORY_DATA,
  BUSINESS_CATEGORY_DATA,
} from '../../../utils/ConstantData';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';

export default function ProfileCUser({navigation}) {
  // hook
  const {
    imageUri,
    pickUpImageHandler,
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    validateFirstName,
    validateLastName,
    phoneNumber,
    validatePhoneNumber,
    businessName,
    validateBusinessName,
    businessNameOne,
    validateBusinessNameOne,
    businessNameTwo,
    validateBusinessNameTwo,
    businessNameThree,
    validateBusinessNameThree,
    businessNameFour,
    validateBusinessNameFour,
    onUpdateUserProfileHandler,
    userDescription,
    validateWebsiteName,
    validateWebsiteNameFour,
    validateWebsiteNameOne,
    validateWebsiteNameThree,
    validateWebsiteNameTwo,
    websiteName,
    websiteNameError,
    websiteNameErrorFour,
    websiteNameErrorOne,
    websiteNameErrorThree,
    websiteNameErrorTwo,
    websiteNameFour,
    websiteNameOne,
    websiteNameThree,
    websiteNameTwo,
    validateDescription,
    businessCategory,
    setBusinessCategory,
    productCategory,
    setProductCategory,
    loading,
    onUpdateUserProfileHandlerError,
    currentUserLoginData,
    currentUserData,
    getAllUpdatedUserData,
    currentUpdateUserData,
    openMessage,
    onpenMessageHandler,
    setOpenMessage,
    linkCounter,
    setLinkCounter,
    webCounter,
    setwebCounter,
    businessEmail,
    businessEmailError,
    validateBusinessEmail,
  } = ProfileCHook({navigation});
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondModelVisible, setIsSecondModelVisible] = useState(false);

  // to convert capital letter
  const {capitalizeFirstLetter} = CapitalizeLetter();

  return (
    <View
      style={styles.screen}
      onStartShouldSetResponder={() => setOpenMessage(false)}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ProfileHeader
        navigation={navigation}
        // settingRenderIcon={true}
        profileHeadingTxt={
          currentUpdateUserData?.user?.firstName &&
          currentUpdateUserData?.user?.lastName
            ? `${capitalizeFirstLetter(
                currentUpdateUserData?.user?.firstName,
              )} ${capitalizeFirstLetter(
                currentUpdateUserData?.user?.lastName,
              )}`
            : currentUserLoginData?.firstName && currentUserLoginData?.lastName
            ? `${capitalizeFirstLetter(
                currentUserLoginData?.firstName,
              )} ${capitalizeFirstLetter(currentUserLoginData?.lastName)}`
            : false
        }
        profileSecondHeadingTxt={
          currentUserLoginData?.accountType
            ? capitalizeFirstLetter(currentUserLoginData?.accountType)
            : ''
        }
        imageUri={
          imageUri
            ? imageUri
            : currentUpdateUserData?.user?.profilePic
            ? currentUpdateUserData?.user?.profilePic
            : currentUserLoginData?.profilePic
            ? currentUserLoginData?.profilePic
            : false
        }
        userCountry={
          currentUserLoginData?.country
            ? `${capitalizeFirstLetter(currentUserLoginData?.country)}`
            : ''
        }
        isVerifiedStatus={
          currentUserLoginData?.identified_docs_status
            ? `${currentUserLoginData?.identified_docs_status}`
            : false
        }
        pickUpImageHandler={pickUpImageHandler}
        uploadImage={true}
        ratingValue={currentUserLoginData?.ratingStartValue}
        imageViewer={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10,
                marginBottom: 12,
              }}>
              <View style={{width: '48%'}}>
                <Text
                  children={'First Name'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                  style={{marginBottom: 5, marginTop: 10}}
                  onPressHandler={() => setOpenMessage(false)}
                />
                <CommonTextInput
                  Value={firstName}
                  placeHoldertext={'First Name'}
                  inputStyle={styles.textInputStyle}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                  onChangeHandler={e => validateFirstName(e)}
                  onFocusHandler={() => setOpenMessage(false)}
                />
                {firstNameError ? (
                  <Text
                    children={firstNameError ? firstNameError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4}}
                  />
                ) : (
                  false
                )}
              </View>
              <View style={{width: '48%'}}>
                <Text
                  children={'Last Name'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                  style={{marginBottom: 5, marginTop: 10}}
                  onPressHandler={() => setOpenMessage(false)}
                />
                <CommonTextInput
                  Value={lastName}
                  placeHoldertext={'Last Name'}
                  inputStyle={styles.textInputStyle}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                  onChangeHandler={e => validateLastName(e)}
                  onFocusHandler={() => setOpenMessage(false)}
                />
                {lastNameError ? (
                  <Text
                    children={lastNameError ? lastNameError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4}}
                  />
                ) : (
                  false
                )}
              </View>
            </View>
            <View style={{width: '100%', marginBottom: 12}}>
              <Text
                children={'Business Email'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <CommonTextInput
                Value={businessEmail}
                inputStyle={styles.textInputStyle}
                onChangeHandler={e => validateBusinessEmail(e)}
                placeHoldertext={'Email'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                onFocusHandler={() => setOpenMessage(false)}
              />
              {businessEmailError ? (
                <Text
                  children={businessEmailError ? businessEmailError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
            </View>
            <View style={{width: '100%', marginBottom: 12}}>
              <Text
                children={'Business Phone #'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <CommonTextInput
                Value={phoneNumber}
                inputStyle={styles.textInputStyle}
                placeHoldertext={'Business Phone'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                keyboardTypeHandle={'number-pad'}
                onChangeHandler={e => validatePhoneNumber(e)}
                onFocusHandler={() => setOpenMessage(false)}
              />
            </View>
            <View style={{width: '100%', marginBottom: 12}}>
              <Text
                children={'Business Name'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <View>
                <CommonTextInput
                  Value={businessName}
                  inputStyle={[styles.textInputStyle, {paddingRight: 36}]}
                  onChangeHandler={e => validateBusinessName(e)}
                  onFocusHandler={() => setOpenMessage(false)}
                  placeHoldertext={'Business Name'}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                />
                <TouchableOpacity
                  style={styles.placeHolderIcon}
                  onPress={() => {
                    if (linkCounter < 4) {
                      setLinkCounter(linkCounter + 1);
                    } else {
                      return;
                    }
                    setOpenMessage(false);
                  }}>
                  <PlusIconSvg />
                </TouchableOpacity>
                {linkCounter > 0 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={businessNameOne}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateBusinessNameOne(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'Business Name'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {linkCounter > 1 ? (
                  <View style={{marginBottom: 8, marginTop: 6}}>
                    <CommonTextInput
                      Value={businessNameTwo}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateBusinessNameTwo(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'Business Name'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {linkCounter > 2 ? (
                  <View style={{marginBottom: 8}}>
                    <CommonTextInput
                      Value={businessNameThree}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateBusinessNameThree(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'Business Name'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {linkCounter > 3 ? (
                  <CommonTextInput
                    Value={businessNameFour}
                    inputStyle={styles.textInputStyle}
                    onChangeHandler={e => validateBusinessNameFour(e)}
                    onFocusHandler={() => setOpenMessage(false)}
                    placeHoldertext={'Business Name'}
                    placeholderColor={theme.lightColor.postInputPlaceholder}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View style={{width: '100%', marginBottom: 12}}>
              <Text
                children={'Website'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <View>
                <CommonTextInput
                  Value={websiteName}
                  inputStyle={[styles.textInputStyle, {paddingRight: 36}]}
                  onChangeHandler={e => validateWebsiteName(e)}
                  onFocusHandler={() => setOpenMessage(false)}
                  placeHoldertext={'URL'}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                />
                <TouchableOpacity
                  style={styles.placeHolderIcon}
                  onPress={() => {
                    if (webCounter < 4) {
                      setwebCounter(webCounter + 1);
                    } else {
                      return;
                    }
                    setOpenMessage(false);
                  }}>
                  <PlusIconSvg />
                </TouchableOpacity>
                {websiteNameError ? (
                  <Text
                    children={websiteNameError ? websiteNameError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {webCounter > 0 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={websiteNameOne}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateWebsiteNameOne(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {websiteNameErrorOne ? (
                  <Text
                    children={websiteNameErrorOne ? websiteNameErrorOne : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {webCounter > 1 ? (
                  <View style={{marginBottom: 8, marginTop: 6}}>
                    <CommonTextInput
                      Value={websiteNameTwo}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateWebsiteNameTwo(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {websiteNameErrorTwo ? (
                  <Text
                    children={websiteNameErrorTwo ? websiteNameErrorTwo : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {webCounter > 2 ? (
                  <View style={{marginBottom: 8}}>
                    <CommonTextInput
                      Value={websiteNameThree}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateWebsiteNameThree(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {websiteNameErrorThree ? (
                  <Text
                    children={
                      websiteNameErrorThree ? websiteNameErrorThree : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {webCounter > 3 ? (
                  <CommonTextInput
                    Value={websiteNameFour}
                    inputStyle={styles.textInputStyle}
                    onChangeHandler={e => validateWebsiteNameFour(e)}
                    onFocusHandler={() => setOpenMessage(false)}
                    placeHoldertext={'URL'}
                    placeholderColor={theme.lightColor.postInputPlaceholder}
                  />
                ) : (
                  <></>
                )}
                {websiteNameErrorFour ? (
                  <Text
                    children={
                      websiteNameErrorFour ? websiteNameErrorFour : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
              </View>
            </View>
            <Pressable
              onPress={() => setOpenMessage(false)}
              style={{width: '100%', marginBottom: 12}}>
              <Text
                children={'Business Category'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <Pressable
                style={styles.hashTagContainer}
                onPress={() => {
                  setIsSecondModelVisible(true);
                  setOpenMessage(false);
                }}>
                {businessCategory?.length > 0 ? (
                  businessCategory.map((item, index) => (
                    <Text
                      key={index}
                      children={`${item}, `}
                      size={14}
                      textColor={theme.lightColor.black}
                      fonts={theme.fontFamily.TinosRegular}
                      onPressHandler={() => setIsSecondModelVisible(true)}
                    />
                  ))
                ) : (
                  <Text
                    children={'Select'}
                    size={14}
                    textColor={theme.lightColor.postInputPlaceholder}
                    fonts={theme.fontFamily.TinosRegular}
                    onPressHandler={() => setIsSecondModelVisible(true)}
                  />
                )}
              </Pressable>
            </Pressable>
            <View>
              <Pressable
                onPress={() => setOpenMessage(false)}
                style={{width: '100%'}}>
                <Text
                  children={'Product Category'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                  style={{marginBottom: 5, marginTop: 5}}
                  onPressHandler={() => setOpenMessage(false)}
                />
                <Pressable
                  style={styles.hashTagContainer}
                  onPress={() => {
                    setModalVisible(true);
                    setOpenMessage(false);
                  }}>
                  {productCategory?.length > 0 ? (
                    productCategory.map((item, index) => (
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
                      textColor={theme.lightColor.postInputPlaceholder}
                      fonts={theme.fontFamily.TinosRegular}
                      onPressHandler={() => setModalVisible(true)}
                    />
                  )}
                </Pressable>
              </Pressable>
            </View>
            <View style={{width: '100%', marginTop: 14}}>
              <Text
                children={'Profile Summary'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <CommonTextInput
                Value={userDescription}
                inputStyle={styles.textInputStyle}
                onChangeHandler={e => validateDescription(e)}
                onFocusHandler={() => setOpenMessage(false)}
                placeHoldertext={'Profile Summary'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                multilineText={true}
              />
            </View>
            <View
              style={{
                marginTop: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckTerms
                verifyAccount={true}
                navigation={navigation}
                closeMessage={setOpenMessage}
              />
              <ProfileCUserCustomDropDown
                openMessage={openMessage}
                onPressHandler={onpenMessageHandler}
              />
            </View>
            <View style={{marginBottom: 5, marginTop: 20, zIndex: -1}}>
              {onUpdateUserProfileHandlerError ? (
                <Text
                  children={
                    onUpdateUserProfileHandlerError
                      ? onUpdateUserProfileHandlerError
                      : false
                  }
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginBottom: 4, marginTop: 6}}
                  alignText={'center'}
                />
              ) : (
                false
              )}
              <Button
                title={'Save'}
                onPressHandler={onUpdateUserProfileHandler}
                loading={loading}
                titleStyles={styles.titleStyles}
                containerStyle={styles.containerStyle}
                linearGradient={true}
              />
            </View>
            <View style={{height: 30}}></View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <HashTagModel
        setValue={setProductCategory}
        putValue={productCategory}
        modelData={PRODUCT_CATEGORY_DATA}
        modelHeight={'100%'}
        title={'Product Categories'}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <HashTagModel
        setValue={setBusinessCategory}
        putValue={businessCategory}
        modelData={BUSINESS_CATEGORY_DATA}
        modelHeight={'39%'}
        title={'Business Categories'}
        isModalVisible={isSecondModelVisible}
        setModalVisible={setIsSecondModelVisible}
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
    paddingHorizontal: 25,
    marginTop: 120,
  },
  textInputStyle: {
    height: 48,
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
  placeHolderIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
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

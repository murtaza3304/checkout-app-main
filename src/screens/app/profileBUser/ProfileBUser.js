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
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import ProfileHeader from '../../../components/common/profileHeader/ProfileHeader';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import {Text} from '../../../components/common/text/Text';
import {theme} from '../../../assests/theme/Theme';
import CheckTerms from '../../../components/common/reCaptcha/CheckTerms';
import {Button} from '../../../components/common/button/Button';
import PlusIconSvg from '../../../assests/icons/svg/homeSvgs/PlusIconSvg';
import ProfileBUserCustomDropDown from '../../../components/common/customDropDown/ProfileBUserCustomDropDown';
import ProfileBHook from '../../../customHooks/profileHooks/ProfileBHook';
import {E_COMMERCE_DATA, TOOLS_DATA} from '../../../utils/ConstantData';
import HashTagModel from '../../../components/common/countryPikerModel/HashTagModel';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';

export default function ProfileBUser({navigation}) {
  const {
    currentUserLoginData,
    imageUri,
    pickUpImageHandler,
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    validateFirstName,
    validateLastName,
    facebookLink,
    facebookLinkError,
    validateFacebookLink,
    linkedInLink,
    linkedInLinkError,
    validateLinkedInLink,
    upworkLink,
    upworkLinkError,
    validateUpworkLink,
    ProfessionalLink,
    ProfessionalLinkError,
    ProfessionalLinkErrorFour,
    ProfessionalLinkErrorOne,
    ProfessionalLinkErrorThree,
    ProfessionalLinkErrorTwo,
    ProfessionalLinkFour,
    ProfessionalLinkOne,
    ProfessionalLinkThree,
    ProfessionalLinkTwo,
    validateProfessionalLink,
    validateProfessionalLinkFour,
    validateProfessionalLinkOne,
    validateProfessionalLinkThree,
    validateProfessionalLinkTwo,
    platformCategory,
    setPlatformCategory,
    toolsCategory,
    setToolsCategory,
    agencyLink,
    agencyLinkError,
    agencyLinkErrorFour,
    agencyLinkErrorOne,
    agencyLinkErrorThree,
    agencyLinkErrorTwo,
    agencyLinkFour,
    agencyLinkOne,
    agencyLinkThree,
    agencyLinkTwo,
    validateAgencyLink,
    validateAgencyLinkFour,
    validateAgencyLinkOne,
    validateAgencyLinkThree,
    validateAgencyLinkTwo,
    validateDescription,
    userDescription,
    loading,
    onUpdateUserProfileHandler,
    onUpdateUserProfileHandlerError,
    getAllUpdatedUserData,
    currentUpdateUserData,
    openMessage,
    setOpenMessage,
    onpenMessageHandler,
    linkCounter,
    setLinkCounter,
    agancyCounter,
    setAgancyCounter,
    businessEmail,
    businessEmailError,
    validateBusinessEmail,
  } = ProfileBHook({navigation});
  // console.log(onUpdateUserProfileHandlerError,"onUpdateUserProfileHandlerError");
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
                marginBottom: 16,
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
                children={'Facebook Profile Link'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <CommonTextInput
                Value={facebookLink}
                inputStyle={styles.textInputStyle}
                onChangeHandler={e => validateFacebookLink(e)}
                placeHoldertext={'URL'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                onFocusHandler={() => setOpenMessage(false)}
              />
              {facebookLinkError ? (
                <Text
                  children={facebookLinkError ? facebookLinkError : false}
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
                children={'LinkedIn Profile Link'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <CommonTextInput
                Value={linkedInLink}
                inputStyle={styles.textInputStyle}
                onChangeHandler={e => validateLinkedInLink(e)}
                onFocusHandler={() => setOpenMessage(false)}
                placeHoldertext={'URL'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
              />
              {linkedInLinkError ? (
                <Text
                  children={linkedInLinkError ? linkedInLinkError : false}
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
                children={'Upwork Profile Link'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <CommonTextInput
                Value={upworkLink}
                inputStyle={styles.textInputStyle}
                onChangeHandler={e => validateUpworkLink(e)}
                onFocusHandler={() => setOpenMessage(false)}
                placeHoldertext={'URL'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
              />
              {upworkLinkError ? (
                <Text
                  children={upworkLinkError ? upworkLinkError : false}
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
                children={'Other Professional Link'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <View>
                <CommonTextInput
                  Value={ProfessionalLink}
                  inputStyle={[styles.textInputStyle, {paddingRight: 36}]}
                  onChangeHandler={e => validateProfessionalLink(e)}
                  onFocusHandler={() => setOpenMessage(false)}
                  placeHoldertext={'URL'}
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
                {ProfessionalLinkError ? (
                  <Text
                    children={
                      ProfessionalLinkError ? ProfessionalLinkError : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {linkCounter > 0 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={ProfessionalLinkOne}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateProfessionalLinkOne(e)}
                      placeHoldertext={'URL'}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {ProfessionalLinkErrorOne ? (
                  <Text
                    children={
                      ProfessionalLinkErrorOne
                        ? ProfessionalLinkErrorOne
                        : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {linkCounter > 1 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={ProfessionalLinkTwo}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateProfessionalLinkTwo(e)}
                      placeHoldertext={'URL'}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {ProfessionalLinkErrorTwo ? (
                  <Text
                    children={
                      ProfessionalLinkErrorTwo
                        ? ProfessionalLinkErrorTwo
                        : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {linkCounter > 2 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={ProfessionalLinkThree}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateProfessionalLinkThree(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {ProfessionalLinkErrorThree ? (
                  <Text
                    children={
                      ProfessionalLinkErrorThree
                        ? ProfessionalLinkErrorThree
                        : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {linkCounter > 3 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={ProfessionalLinkFour}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateProfessionalLinkFour(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {ProfessionalLinkErrorFour ? (
                  <Text
                    children={
                      ProfessionalLinkErrorFour
                        ? ProfessionalLinkErrorFour
                        : false
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
            <View style={{width: '100%'}}>
              <Text
                children={'e-Commerce Platform Supported'}
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
                {platformCategory?.length > 0 ? (
                  platformCategory.map((item, index) => (
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
            </View>
            <View style={{width: '100%'}}>
              <Text
                children={'Tools Used'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 20}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <Pressable
                style={styles.hashTagContainer}
                onPress={() => {
                  setIsSecondModelVisible(true);
                  setOpenMessage(false);
                }}>
                {toolsCategory?.length > 0 ? (
                  toolsCategory.map((item, index) => (
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
            </View>
            <View style={{width: '100%', marginBottom: 12}}>
              <Text
                children={'Affiliated Agency'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5, marginTop: 20}}
                onPressHandler={() => setOpenMessage(false)}
              />
              <View>
                <CommonTextInput
                  Value={agencyLink}
                  inputStyle={[styles.textInputStyle, {paddingRight: 36}]}
                  onChangeHandler={e => validateAgencyLink(e)}
                  onFocusHandler={() => setOpenMessage(false)}
                  placeHoldertext={'URL'}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                />
                <TouchableOpacity
                  style={styles.placeHolderIcon}
                  onPress={() => {
                    if (agancyCounter < 4) {
                      setAgancyCounter(agancyCounter + 1);
                    } else {
                      return;
                    }
                    setOpenMessage(false);
                  }}>
                  <PlusIconSvg />
                </TouchableOpacity>
                {agencyLinkError ? (
                  <Text
                    children={agencyLinkError ? agencyLinkError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {agancyCounter > 0 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={agencyLinkOne}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateAgencyLinkOne(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {agencyLinkErrorOne ? (
                  <Text
                    children={agencyLinkErrorOne ? agencyLinkErrorOne : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {agancyCounter > 1 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={agencyLinkTwo}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateAgencyLinkTwo(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {agencyLinkErrorTwo ? (
                  <Text
                    children={agencyLinkErrorTwo ? agencyLinkErrorTwo : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {agancyCounter > 2 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={agencyLinkThree}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateAgencyLinkThree(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {agencyLinkErrorThree ? (
                  <Text
                    children={
                      agencyLinkErrorThree ? agencyLinkErrorThree : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4, marginBottom: 4}}
                  />
                ) : (
                  false
                )}
                {agancyCounter > 3 ? (
                  <View style={{marginTop: 6}}>
                    <CommonTextInput
                      Value={agencyLinkFour}
                      inputStyle={styles.textInputStyle}
                      onChangeHandler={e => validateAgencyLinkFour(e)}
                      onFocusHandler={() => setOpenMessage(false)}
                      placeHoldertext={'URL'}
                      placeholderColor={theme.lightColor.postInputPlaceholder}
                    />
                  </View>
                ) : (
                  <></>
                )}
                {agencyLinkErrorFour ? (
                  <Text
                    children={agencyLinkErrorFour ? agencyLinkErrorFour : false}
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
            <View style={{width: '100%'}}>
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
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 18,
              }}>
              <CheckTerms
                verifyAccount={true}
                navigation={navigation}
                closeMessage={setOpenMessage}
              />
              <ProfileBUserCustomDropDown
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
                titleStyles={styles.titleStyles}
                containerStyle={styles.containerStyle}
                linearGradient={true}
                loading={loading}
              />
            </View>
            <View style={{height: 30}}></View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <HashTagModel
        setValue={setPlatformCategory}
        putValue={platformCategory}
        modelData={E_COMMERCE_DATA}
        modelHeight={'100%'}
        title={'E-Commerce Platform'}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <HashTagModel
        setValue={setToolsCategory}
        putValue={toolsCategory}
        modelData={TOOLS_DATA}
        modelHeight={'63%'}
        title={'Tools'}
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

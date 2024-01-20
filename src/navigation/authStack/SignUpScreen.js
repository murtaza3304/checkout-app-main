import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../assests/theme/Theme';
import ImageWithCaption from '../../components/common/imageWithCaption/ImageWithCaption';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import SelectAccountTypeDropDown from '../../components/common/dropDown/SelectAccountTypeDropDown';
import {Text} from '../../components/common/text/Text';
import {CommonTextInput} from '../../components/common/CommonTextInput/CommonTextInput';
import {Button} from '../../components/common/button/Button';
import CheckTerms from '../../components/common/reCaptcha/CheckTerms';
import CustomDropDown from '../../components/common/customDropDown/CustomDropDown';
import UseSignUpHook from '../../customHooks/authHooks/UseSignUpHook';
import CommonEllipseHeaderSignup from '../../components/common/commonEllipseHeader/CommonEllipseHeaderSignup';
// import CommonReCaptcha from '../../components/common/reCaptcha/CommonReCaptcha';
// import Recaptcha, { RecaptchaHandles } from 'react-native-recaptcha-that-works';

export default function SignUpScreen({navigation}) {
  const onLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };
  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const passwordHideShowHandle = () => {
    setOpenMessage(false);
    setPasswordHideShow(!passwordHideShow);
  };
  // const size = 'normal';

  const {
    firstName,
    lastName,
    email,
    password,
    onSignUpHandler,
    validateAccountType,
    validatePassword,
    passwordError,
    validateEmail,
    emailError,
    validateFirstName,
    firstNameError,
    validateLastName,
    lastNameError,
    accountTypeError,
    // captchaIconShowHandler,
    // isFocusedReCaptcha,
    // isFocusedReCaptchaError,
    isFocusedTerms,
    isFocusedTermsError,
    termsIconShowHandler,
    loading,
    userSignUpError,
    onpenMessageHandler,
    openMessage,
    setOpenMessage,
    // handleClosePress,
    // recaptcha,
    // setToken,
    // token,
    // setisFocusedReCaptcha,
    // setisFocusedReCaptchaError,
    // reCaptchaHandler
  } = UseSignUpHook({navigation});
  // console.log(token, "token........");

  return (
    <>
      <View
        style={{flex: 1}}
        onStartShouldSetResponder={() => setOpenMessage(false)}>
        <FocusAwareStatusBar
          barStyle={'dark-content'}
          translucent={true}
          backgroundColor={'transparent'}
        />
        <CommonEllipseHeaderSignup
          bgColor={theme.lightColor.newBodyColor}
          navigation={navigation}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <ImageWithCaption
                height={48}
                width={207}
                title={'Already have an account?'}
                btnTitle={'log-in'}
                imagePath={require('../../assests/images/appLogo.png')}
                onPress={onLoginScreen}
                titleStyles={styles.signupTitleStyles}
              />

              <View style={styles.dropDownContainers}>
                <SelectAccountTypeDropDown
                  setType={validateAccountType}
                  setMessage={setOpenMessage}
                />
                <CustomDropDown
                  openMessage={openMessage}
                  onPressHandler={onpenMessageHandler}
                />
              </View>
              {accountTypeError ? (
                <Text
                  children={accountTypeError ? accountTypeError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  zIndex: -1,
                }}>
                <View style={{width: '48%'}}>
                  <Text
                    children={'First Name'}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.gray}
                    size={14}
                    style={{marginBottom: 5, marginTop: 12}}
                    onPressHandler={() => setOpenMessage(false)}
                  />
                  <CommonTextInput
                    Value={firstName}
                    placeHoldertext={'First name'}
                    inputStyle={[
                      styles.textInputStyle,
                      {marginBottom: firstNameError ? 4 : 12},
                    ]}
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
                      style={{marginBottom: 12}}
                    />
                  ) : (
                    false
                  )}
                </View>
                <View style={{width: '48%', zIndex: -1}}>
                  <Text
                    children={'Last Name'}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.gray}
                    size={14}
                    style={{marginBottom: 5, marginTop: 12}}
                    onPressHandler={() => setOpenMessage(false)}
                  />
                  <CommonTextInput
                    Value={lastName}
                    placeHoldertext={'Last name'}
                    inputStyle={[
                      styles.textInputStyle,
                      {marginBottom: lastNameError ? 4 : 12},
                    ]}
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
                      style={{marginBottom: 12}}
                    />
                  ) : (
                    false
                  )}
                </View>
              </View>
              <View style={{width: '100%', zIndex: -1}}>
                <Text
                  children={'Email'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.gray}
                  size={14}
                  style={{marginBottom: 5}}
                  onPressHandler={() => setOpenMessage(false)}
                />
                <CommonTextInput
                  Value={email}
                  inputStyle={[
                    styles.textInputStyle,
                    {marginBottom: emailError ? 4 : 12},
                  ]}
                  onChangeHandler={e => validateEmail(e)}
                  placeHoldertext={'Your email'}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                  onFocusHandler={() => setOpenMessage(false)}
                />
                {emailError ? (
                  <Text
                    children={emailError ? emailError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginBottom: 12}}
                  />
                ) : (
                  false
                )}
              </View>
              <View style={{width: '100%', zIndex: -1}}>
                <Text
                  children={'Password'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.gray}
                  size={14}
                  style={{marginBottom: 5}}
                  onPressHandler={() => setOpenMessage(false)}
                />
                <CommonTextInput
                  Value={password}
                  inputStyle={[
                    styles.textInputStyle,
                    {marginBottom: passwordError ? 4 : 12},
                  ]}
                  placeHoldertext={'Your password'}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                  inputType={passwordHideShow}
                  passwordIcon={true}
                  passwordHideShowHandle={passwordHideShowHandle}
                  onChangeHandler={e => validatePassword(e)}
                  onFocusHandler={() => setOpenMessage(false)}
                />
                {passwordError ? (
                  <Text
                    children={passwordError ? passwordError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginBottom: 12}}
                  />
                ) : (
                  false
                )}
              </View>
              <View style={{marginBottom: 5, marginTop: 8}}>
                <CheckTerms
                  navigation={navigation}
                  checkPolicy={true}
                  isFocusedTerms={isFocusedTerms}
                  termsIconShowHandler={termsIconShowHandler}
                />
                {isFocusedTermsError ? (
                  <Text
                    children={isFocusedTermsError ? isFocusedTermsError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    alignText={'center'}
                  />
                ) : (
                  false
                )}
              </View>
              {/* <View style={{ marginBottom: 20, marginTop: 10, }}>
                            <CommonReCaptcha isFocusedReCaptcha={isFocusedReCaptcha} captchaIconShowHandler={captchaIconShowHandler} />
                            <Recaptcha
                                ref={recaptcha}
                                lang="en"
                                headerComponent={
                                    <Pressable
                                        style={{
                                            height: 42,
                                            backgroundColor: theme.lightColor.red,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={handleClosePress}
                                    >
                                        <Text
                                            children={"Close"}
                                            onPressHandler={handleClosePress}
                                            size={16}
                                            fonts={theme.fontFamily.TinosBold}
                                            textColor={theme.lightColor.white}
                                        />
                                    </Pressable>
                                }
                                // footerComponent={<Text>Footer here</Text>}
                                siteKey="6LdT5c8mAAAAAPezW070bTo3dq_4yVgyHcGTKzRU"
                                baseUrl="http:127.0.0.1"
                                size={size}
                                theme="dark"
                                onLoad={() => console.log('onLoad event')}
                                onClose={() => {
                                    console.log('onClose event')
                                    setisFocusedReCaptchaError('*Required!')
                                }}
                                onError={(err) => {
                                    // Alert.alert('onError event');
                                    console.log("onError event", err);
                                }}
                                onExpire={() => console.log('onExpire event')}
                                onVerify={(token) => {
                                    console.log('onVerify event');
                                    setToken(token);
                                    setisFocusedReCaptcha(true)
                                    setisFocusedReCaptchaError('')
                                    reCaptchaHandler(token)
                                }}
                                enterprise={false}
                                hideBadge={false}
                            />
                            {
                                isFocusedReCaptchaError ?
                                    <Text
                                        children={isFocusedReCaptchaError ? isFocusedReCaptchaError : false}
                                        fonts={theme.fontFamily.TinosRegular}
                                        textColor={theme.lightColor.red}
                                        size={10}
                                        alignText={'center'}
                                    />
                                    :
                                    false
                            }
                        </View> */}
              <View style={{marginTop: 14}}>
                {userSignUpError ? (
                  <Text
                    children={userSignUpError ? userSignUpError : false}
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
                  title={'Create an account'}
                  onPressHandler={onSignUpHandler}
                  titleStyles={styles.titleStyles}
                  containerStyle={styles.containerStyle}
                  linearGradient={true}
                  loading={loading}
                />
              </View>
              {/* <Button
                            title={'Privacy'}
                            // onPressHandler={}
                            titleStyles={styles.privacyTextStyles}
                            containerStyle={styles.privacyStyle}
                        /> */}
              <View style={{height: 6}}></View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
    paddingHorizontal: 25,
  },
  textInputStyle: {
    height: 42,
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
    height: 50,
    width: '100%',
    borderRadius: 8,
  },
  privacyStyle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 3,
    borderRadius: 8,
  },
  privacyTextStyles: {
    color: theme.lightColor.red,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.normal,
  },
  signupTitleStyles: {
    color: theme.lightColor.blue,
    fontFamily: theme.fontFamily.TinosBold,
    fontSize: 15,
  },
  dropDownContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

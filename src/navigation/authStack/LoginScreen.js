import {
  View,
  StyleSheet,
  Image,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import {theme} from '../../assests/theme/Theme';
import {Text} from '../../components/common/text/Text';
import {CommonTextInput} from '../../components/common/CommonTextInput/CommonTextInput';
import {Button} from '../../components/common/button/Button';
import UseLoginHook from '../../customHooks/authHooks/UseLoginHook';
import CommonEllipseLoginHeader from '../../components/common/commonEllipseHeader/CommonEllipseLoginHeader';

export default function LoginScreen({navigation}) {
  const onGoSignUpScreen = () => {
    navigation.navigate('SignUpScreen');
  };
  const onGoForgotScreen = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const passwordHideShowHandle = () => {
    setPasswordHideShow(!passwordHideShow);
  };

  const {
    email,
    password,
    onLoginHandler,
    validateEmail,
    emailError,
    validatePassword,
    passwordError,
    loading,
    userLoginError,
  } = UseLoginHook({navigation});

  const exitAppHandler = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <CommonEllipseLoginHeader
        bgColor={theme.lightColor.newBodyColor}
        navigation={navigation}
        goBackHandler={exitAppHandler}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.screen}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../assests/images/appLogo.png')}
              style={{height: 48, width: 207, marginTop: 3}}
            />
          </View>
          <View style={{width: '100%', marginTop: 30}}>
            <Text
              children={'Email'}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.gray}
              size={15}
              style={{marginBottom: 5, marginTop: 5}}
            />
            <CommonTextInput
              Value={email}
              inputStyle={[
                styles.textInputStyle,
                {marginBottom: emailError ? 4 : 12},
              ]}
              placeHoldertext={'Your email'}
              placeholderColor={theme.lightColor.postInputPlaceholder}
              onChangeHandler={e => validateEmail(e)}
            />
            {emailError ? (
              <Text
                children={emailError ? emailError : false}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
                style={{marginBottom: 9}}
              />
            ) : (
              false
            )}
          </View>
          <View style={{width: '100%', marginBottom: 20}}>
            <Text
              children={'Password'}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.gray}
              size={15}
              style={{marginBottom: 5, marginTop: 5}}
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
              passwordHideShowHandle={passwordHideShowHandle}
              passwordIcon={true}
              onChangeHandler={e => validatePassword(e)}
            />
            {passwordError ? (
              <Text
                children={passwordError ? passwordError : false}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
                style={{marginBottom: 9}}
              />
            ) : (
              false
            )}
          </View>
          {userLoginError ? (
            <Text
              children={userLoginError ? userLoginError : false}
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
            title={'Login'}
            onPressHandler={onLoginHandler}
            titleStyles={styles.titleStyles}
            containerStyle={styles.containerStyle}
            linearGradient={true}
            loading={loading}
          />
          <Button
            title={'Forgot Password'}
            onPressHandler={onGoForgotScreen}
            titleStyles={styles.forgotTitleStyles}
            containerStyle={styles.forgotContainerStyle}
          />
          <Button
            title={'Create Account'}
            onPressHandler={onGoSignUpScreen}
            titleStyles={styles.accountTitleStyles}
            containerStyle={styles.accountContainerStyle}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
    paddingHorizontal: 25,
  },
  textStyle: {
    alignSelf: 'center',
    marginTop: 22,
    // transform: [{scale: theme.animation.scale}],
  },
  textInputStyle: {
    height: 45,
    width: '100%',
    marginBottom: 16,
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
  forgotTitleStyles: {
    color: theme.lightColor.red,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    textDecorationLine: 'underline',
    textDecorationColor: theme.lightColor.red,
  },
  forgotContainerStyle: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  accountTitleStyles: {
    color: theme.lightColor.red,
    fontSize: 18,
    fontFamily: theme.fontFamily.TinosBold,
  },
  accountContainerStyle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 30,
  },
});

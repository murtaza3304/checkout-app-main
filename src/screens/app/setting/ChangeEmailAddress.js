import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {Text} from '../../../components/common/text/Text';
import {theme} from '../../../assests/theme/Theme';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../../components/common/button/Button';
import {emailChange, otpEmailChange} from '../../../redux/actions/AuthActions';

export default function ChangeEmailAddress({navigation}) {
  const dispatch = useDispatch();

  // Store Data
  const currentLoginData = useSelector(store => store?.AuthReducers.user);
  const StoreData = useSelector(store => store?.AuthReducers.isNewEmailOtp);

  //   states
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailChangeHandlerError, setEmailChangeHandlerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [optCode, setOtpCode] = useState('');
  const [optCodeError, setOptCodeError] = useState('');

  // validate email
  const validateEmail = e => {
    setEmail(e);
    let checkEmail = String(e).match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    );
    if (e === '') {
      setEmailError('*Required!');
    } else if (e.includes(' ')) {
      setEmailError('Space is not allowed!');
    } else if (!checkEmail) {
      setEmailError('Email is not correct!');
    } else {
      setEmailError('');
    }
  };

  // validate otp code
  const validateOtp = e => {
    setOtpCode(e);
    if (e === '') {
      setOptCodeError('*Required!');
    } else {
      if (e.length < 6) {
        setOptCodeError('Enter 6 digits valid code!');
      } else {
        const numberPattern = /^\d+$/;
        const isNumber = numberPattern.test(e);
        if (!isNumber) {
          setOptCodeError('Invalid code!');
        } else {
          setOptCodeError('');
        }
      }
    }
  };

  //   email change handler
  const emailChangeHandler = () => {
    setEmailChangeHandlerError('');
    if (!email) {
      setEmailError('*Required!');
      return;
    } else {
      if (email && !emailError) {
        let emailData = {
          newEmail: email?.toLowerCase(),
        };
        dispatch(
          emailChange(emailData, setLoading, setEmailChangeHandlerError),
        );
      }
    }
  };

  // otp code handler
  const otpCodeHandler = () => {
    setEmailChangeHandlerError('');
    if (!optCode) {
      setOptCodeError('*Required!');
    } else {
      if (optCode && !optCodeError) {
        let otpCodeData = {
          otp: optCode,
        };
        // console.log(otpCodeData, "otpCodeData");
        dispatch(
          otpEmailChange(otpCodeData, setLoading, setEmailChangeHandlerError),
        );
        setOtpCode('');
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.screen}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              width: '100%',
              paddingHorizontal: 25,
            }}>
            <Text
              children={'Registered Email Address'}
              size={17}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              style={{marginBottom: 6}}
            />
            <Text
              children={
                currentLoginData?.email ? currentLoginData?.email : false
              }
              size={15}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginBottom: 30}}
            />
            {StoreData?.isSendOtp ? (
              <View style={{width: '100%', marginBottom: 16}}>
                <Text
                  children={'Enter Code'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                  style={{marginBottom: 8}}
                />
                <CommonTextInput
                  Value={optCode}
                  inputStyle={styles.textInputStyle}
                  placeHoldertext={'Enter Code'}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                  keyboardTypeHandle={'number-pad'}
                  onChangeHandler={e => validateOtp(e)}
                  maxCharacter={6}
                />
                {optCodeError ? (
                  <Text
                    children={optCodeError ? optCodeError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4}}
                  />
                ) : (
                  false
                )}
              </View>
            ) : (
              <View style={{width: '100%', marginBottom: 16}}>
                <Text
                  children={'Change Email Address'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.darkGray}
                  size={15}
                  style={{marginBottom: 8}}
                />
                <CommonTextInput
                  Value={email}
                  inputStyle={styles.textInputStyle}
                  placeHoldertext={'Email Address'}
                  placeholderColor={theme.lightColor.postInputPlaceholder}
                  onChangeHandler={e => validateEmail(e)}
                />
                {emailError ? (
                  <Text
                    children={emailError ? emailError : false}
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginTop: 4}}
                  />
                ) : (
                  false
                )}
              </View>
            )}
            <View style={{marginTop: 50}}>
              {emailChangeHandlerError ? (
                <Text
                  children={
                    emailChangeHandlerError ? emailChangeHandlerError : false
                  }
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginBottom: 4}}
                  alignText={'center'}
                />
              ) : (
                false
              )}
              {StoreData?.isSendOtp ? (
                <Button
                  title={'Save'}
                  onPressHandler={otpCodeHandler}
                  titleStyles={styles.titleStyles}
                  containerStyle={styles.containerStyle}
                  linearGradient={true}
                  loading={loading}
                />
              ) : (
                <Button
                  title={'Save'}
                  onPressHandler={emailChangeHandler}
                  titleStyles={styles.titleStyles}
                  containerStyle={styles.containerStyle}
                  linearGradient={true}
                  loading={loading}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
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
});

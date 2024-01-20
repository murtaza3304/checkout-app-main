import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import CommonEllipseHeader from '../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {theme} from '../../assests/theme/Theme';
import ImageWithCaption from '../../components/common/imageWithCaption/ImageWithCaption';
import {CommonTextInput} from '../../components/common/CommonTextInput/CommonTextInput';
import {Text} from '../../components/common/text/Text';
import {Button} from '../../components/common/button/Button';
import UseOtpHook from '../../customHooks/authHooks/UseOtpHook';
import moment from 'moment';
import {RE_SEND_CODE} from '../../redux/types/AuthActionsTypes';
import {useDispatch, useSelector} from 'react-redux';

export default function OtpCodeScreen({navigation}) {
  const dispatch = useDispatch();
  const showTimeStemp = useSelector(store => store?.AuthReducers?.isReSendCode);
  // console.log(showTimeStemp, 'showTimeStemp');
  const code_SignUp_Resend = useSelector(
    store => store?.AuthReducers?.isCode_SignUp_Resend,
  );
  // console.log(code_SignUp_Resend,"code_SignUp_Resend");

  const {
    optCode,
    validateOtp,
    optCodeError,
    otpCodeHandler,
    otpCodeHandlerError,
    loading,
    onResendCodeHandler,
  } = UseOtpHook({navigation});

  // states
  const targetTime = moment().add(5, 'minutes');
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (showTimeStemp) {
      const interval = setInterval(() => {
        const currentTime = moment();
        const duration = moment.duration(targetTime.diff(currentTime));
        const newMinutes = duration.minutes();
        const newSeconds = duration.seconds();

        setMinutes(newMinutes);
        setSeconds(newSeconds);

        if (newMinutes === 0 && newSeconds === 0) {
          clearInterval(interval);
          dispatch({
            type: RE_SEND_CODE,
            payload: false,
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showTimeStemp, code_SignUp_Resend]);

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
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <ImageWithCaption
              height={130}
              width={207}
              title={
                'If your email is valid, you will receive a code. Please enter the code below'
              }
              textAlignment={'center'}
              imagePath={require('../../assests/images/background-complete.png')}
              paddingHorizontal={40}
            />
            <View style={{width: '100%', marginTop: 10, marginBottom: 30}}>
              <Text
                children={'Enter Code'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.gray}
                size={15}
                style={{marginBottom: 5}}
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
            {otpCodeHandlerError ? (
              <Text
                children={otpCodeHandlerError ? otpCodeHandlerError : false}
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
              title={'Continue'}
              onPressHandler={otpCodeHandler}
              titleStyles={styles.titleStyles}
              containerStyle={styles.containerStyle}
              linearGradient={true}
              loading={loading}
            />
            <ImageWithCaption
              title={'Didn’t get a code? '}
              btnTitle={'Resend code'}
              titleStyles={styles.resendTitleStyles}
              onPress={onResendCodeHandler}
            />
            {showTimeStemp ? (
              <Text
                children={`${minutes} : ${
                  seconds < 10 ? '0' + seconds : seconds
                } m`}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={15}
                alignText={'center'}
              />
            ) : (
              false
            )}
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
    paddingHorizontal: 25,
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
  resendTitleStyles: {
    color: theme.lightColor.red,
    fontFamily: theme.fontFamily.TinosBold,
    fontSize: 15,
  },
});

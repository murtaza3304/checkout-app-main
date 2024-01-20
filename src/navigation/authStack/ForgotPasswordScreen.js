import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import CommonEllipseHeader from '../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {theme} from '../../assests/theme/Theme';
import ImageWithCaption from '../../components/common/imageWithCaption/ImageWithCaption';
import {CommonTextInput} from '../../components/common/CommonTextInput/CommonTextInput';
import {Text} from '../../components/common/text/Text';
import {Button} from '../../components/common/button/Button';
import UseForgotPasswordHook from '../../customHooks/authHooks/UseForgotPasswordHook';

export default function ForgotPasswordScreen({navigation}) {
  const {
    forgotPasswordHandler,
    email,
    emailError,
    loading,
    validateEmail,
    forgotPasswordError,
  } = UseForgotPasswordHook({navigation});
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
                'To reset your password, enter the email address associated with your account'
              }
              textAlignment={'center'}
              imagePath={require('../../assests/images/background-complete.png')}
              paddingHorizontal={35}
            />
            <View style={{width: '100%', marginTop: 10, marginBottom: 30}}>
              <Text
                children={'Email'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.gray}
                size={15}
                style={{marginBottom: 5}}
              />
              <CommonTextInput
                Value={email}
                inputStyle={styles.textInputStyle}
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
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
            </View>
            {forgotPasswordError ? (
              <Text
                children={forgotPasswordError ? forgotPasswordError : false}
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
              onPressHandler={forgotPasswordHandler}
              titleStyles={styles.titleStyles}
              containerStyle={styles.containerStyle}
              linearGradient={true}
              loading={loading}
            />
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
});

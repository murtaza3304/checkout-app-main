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
import UseChangePasswordHook from '../../customHooks/authHooks/UseChangePasswordHook';

export default function ChangePasswordScreen({navigation}) {
  const {
    newPasswordError,
    validateNewPassword,
    validateConfirmPassword,
    changePasswordHandlerError,
    confirmPassword,
    confirmPasswordError,
    loading,
    newPassword,
    confirmPasswordHandler,
    passwordHideShowOne,
    passwordHideShowOneHandle,
    passwordHideShowTwo,
    passwordHideShowTwoHandle,
  } = UseChangePasswordHook({navigation});

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
                'Create a new password with at least 8 characters (Combination of alphanumeric capital letter and special character) .'
              }
              textAlignment={'center'}
              paddingHorizontal={30}
            />
            <View style={{width: '100%', marginTop: 14}}>
              <Text
                children={'Enter New Password'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.gray}
                size={15}
                style={{marginBottom: 5}}
              />
              <CommonTextInput
                Value={newPassword}
                inputStyle={styles.textInputStyle}
                placeHoldertext={'Enter New Password'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                inputType={passwordHideShowOne}
                passwordHideShowHandle={passwordHideShowOneHandle}
                passwordIcon={true}
                onChangeHandler={e => validateNewPassword(e)}
              />
              {newPasswordError ? (
                <Text
                  children={newPasswordError ? newPasswordError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
            </View>
            <View style={{width: '100%', marginTop: 14, marginBottom: 30}}>
              <Text
                children={'Re-enter New Password'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.gray}
                size={15}
                style={{marginBottom: 5, marginTop: 5}}
              />
              <CommonTextInput
                Value={confirmPassword}
                inputStyle={styles.textInputStyle}
                placeHoldertext={'Re-enter New Password'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                inputType={passwordHideShowTwo}
                passwordHideShowHandle={passwordHideShowTwoHandle}
                passwordIcon={true}
                onChangeHandler={e => validateConfirmPassword(e)}
              />
              {confirmPasswordError ? (
                <Text
                  children={confirmPasswordError ? confirmPasswordError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
            </View>
            {changePasswordHandlerError ? (
              <Text
                children={
                  changePasswordHandlerError
                    ? changePasswordHandlerError
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
              title={'Reset Password'}
              onPressHandler={confirmPasswordHandler}
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
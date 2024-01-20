import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {theme} from '../../../assests/theme/Theme';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {Text} from '../../../components/common/text/Text';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import {Button} from '../../../components/common/button/Button';
import UseChangePasswordHook from '../../../customHooks/authHooks/UseChangePasswordHook';

export default function PrivacyAndSecurity({navigation}) {
  const {
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
    loading,
    passwordHideShowOne,
    passwordHideShowTwo,
    passwordHideShowOneHandle,
    passwordHideShowTwoHandle,
    validateConfirmPassword,
    validateNewPassword,
    currentLoginData,
    getUserUpdateData,
    appConfirmPasswordHandler,
    changePasswordHandlerError,
    oldPassword,
    oldPasswordError,
    validateOldPassword,
  } = UseChangePasswordHook({navigation});
  const onGoPrivacyPolicyScreen = () => {
    navigation.navigate('PrivacyPolicy');
  };
  const onGoTermsAndConditionScreen = () => {
    navigation.navigate('TermsAndCondition');
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
            contentContainerStyle={{width: '100%', paddingHorizontal: 25}}>
            <Text
              children={'Privacy & Security Settings'}
              size={20}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosBold}
              style={{marginBottom: 15}}
            />
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
              style={{marginBottom: 20}}
            />
            <View style={{width: '100%', marginBottom: 16}}>
              <Text
                children={'Old Password'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5}}
              />
              <CommonTextInput
                Value={oldPassword}
                inputStyle={styles.textInputStyle}
                placeHoldertext={'OldPassword'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                inputType={passwordHideShowOne}
                passwordHideShowHandle={passwordHideShowOneHandle}
                passwordIcon={true}
                onChangeHandler={e => validateOldPassword(e)}
              />
              {oldPasswordError ? (
                <Text
                  children={oldPasswordError ? oldPasswordError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginTop: 4}}
                />
              ) : (
                false
              )}
            </View>
            <View style={{width: '100%', marginBottom: 16}}>
              <Text
                children={'New Password'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5}}
              />
              <CommonTextInput
                Value={newPassword}
                inputStyle={styles.textInputStyle}
                placeHoldertext={'New Password'}
                placeholderColor={theme.lightColor.postInputPlaceholder}
                inputType={passwordHideShowTwo}
                passwordHideShowHandle={passwordHideShowTwoHandle}
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
            <View style={{width: '100%'}}>
              <Text
                children={'Re-enter New Password'}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={15}
                style={{marginBottom: 5}}
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
            <TouchableOpacity onPress={onGoPrivacyPolicyScreen}>
              <Text
                children={'Privacy'}
                size={18}
                textColor={theme.lightColor.red}
                fonts={theme.fontFamily.TinosBold}
                style={{marginBottom: 10, marginTop: 25}}
                onPressHandler={onGoPrivacyPolicyScreen}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onGoTermsAndConditionScreen}>
              <Text
                children={'Terms & Condition'}
                size={18}
                textColor={theme.lightColor.red}
                fonts={theme.fontFamily.TinosBold}
                onPressHandler={onGoTermsAndConditionScreen}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation?.navigate('ChangeEmailAddress')}>
              <Text
                children={'Change Email Address'}
                size={18}
                textColor={theme.lightColor.red}
                fonts={theme.fontFamily.TinosBold}
                style={{marginTop: 10}}
                onPressHandler={() =>
                  navigation?.navigate('ChangeEmailAddress')
                }
              />
            </TouchableOpacity>
            {/* button */}
            <View style={{marginTop: 30, marginBottom: 30}}>
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
                  style={{marginBottom: 4}}
                  alignText={'center'}
                />
              ) : (
                false
              )}
              <Button
                title={'Save'}
                onPressHandler={appConfirmPasswordHandler}
                titleStyles={styles.titleStyles}
                containerStyle={styles.containerStyle}
                linearGradient={true}
                loading={loading}
              />
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
  passwordFieldsmainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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

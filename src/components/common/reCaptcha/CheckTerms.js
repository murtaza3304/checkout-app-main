import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {theme} from '../../../assests/theme/Theme';
import {Button} from '../button/Button';
import TrueIconSvg from '../../../assests/icons/svg/homeSvgs/TrueIconSvg';

export default function CheckTerms({
  checkPolicy,
  verifyAccount,
  isFocusedTerms,
  navigation,
  termsIconShowHandler = () => false,
  closeMessage,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.btnTextContainer}>
        {checkPolicy ? (
          <>
            {isFocusedTerms ? (
              <Button
                containerStyle={styles.btnContainer}
                renderIconLeft={() => (
                  <TrueIconSvg color={theme.lightColor.trueIconRed} />
                )}
                onPressHandler={termsIconShowHandler}
              />
            ) : (
              <Button
                containerStyle={styles.btnContainer}
                onPressHandler={termsIconShowHandler}
              />
            )}
            <Text
              style={{
                color: theme.lightColor.blue,
                fontFamily: theme.fontFamily.TinosRegular,
                fontWeight: theme.fontWeight.normal,
                fontSize: 13,
                marginLeft: 14,
              }}
              onPress={termsIconShowHandler}>
              Yes, I accept the{' '}
              <Text
                style={{
                  fontWeight: theme.fontWeight.bold,
                  fontFamily: theme.fontFamily.TinosBold,
                  textDecorationLine: 'underline',
                }}
                onPress={() => navigation.navigate('TermsAndCondition')}>
                terms
              </Text>{' '}
              and{' '}
              <Text
                style={{
                  fontWeight: theme.fontWeight.bold,
                  fontFamily: theme.fontFamily.TinosBold,
                  textDecorationLine: 'underline',
                }}
                onPress={() => navigation.navigate('PrivacyPolicy')}>
                policy
              </Text>
            </Text>
          </>
        ) : (
          false
        )}
        {verifyAccount ? (
          <Text
            style={{
              color: theme.lightColor.termsBorder,
              fontFamily: theme.fontFamily.TinosRegular,
              fontWeight: theme.fontWeight.normal,
              fontSize: 14,
            }}
            onPress={() => {
              navigation.navigate('ATypeUserVaildCard');
              closeMessage(false);
            }}>
            Verify my Account
          </Text>
        ) : (
          false
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // backgroundColor: 'blue'
  },
  btnContainer: {
    backgroundColor: theme.lightColor.termsBackground,
    borderWidth: 1,
    borderColor: theme.lightColor.termsBorder,
    height: 20,
    width: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 40,
    width: 40,
  },
});

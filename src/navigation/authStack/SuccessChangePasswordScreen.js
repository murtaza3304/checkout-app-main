import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import CommonEllipseHeader from '../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {theme} from '../../assests/theme/Theme';
import ImageWithCaption from '../../components/common/imageWithCaption/ImageWithCaption';
import {Button} from '../../components/common/button/Button';

export default function SuccessChangePasswordScreen({navigation}) {
  const onGoLoginScreen = () => {
    navigation.navigate('LoginScreen');
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
      <View style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <ImageWithCaption
            height={200}
            width={220}
            title={'Your password was successfully changed'}
            textAlignment={'center'}
            paddingHorizontal={50}
            desTextSize={20}
            desFontStyles={theme.fontFamily.TinosBold}
            destTextColor={theme.lightColor.black}
            imagePath={require('../../assests/images/successPasswordLogo.png')}
            desContainer={styles.desContainerStyle}
          />
          <Button
            title={'Login'}
            onPressHandler={onGoLoginScreen}
            titleStyles={styles.titleStyles}
            containerStyle={styles.containerStyle}
            linearGradient={true}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
    paddingHorizontal: 25,
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
    borderRadius: 8,
    justifyContent: 'center',
    height: 55,
    width: '100%',
  },
  desContainerStyle: {
    marginTop: 30,
    marginBottom: 20,
  },
});

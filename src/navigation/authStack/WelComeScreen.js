import {View, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import {theme} from '../../assests/theme/Theme';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import {Text} from '../../components/common/text/Text';
import MyProfileHook from '../../customHooks/postsHook/MyProfileHook';
import ArrowSplash from '../../assests/icons/svg/homeSvgs/ArrowSplash';
import {Button} from '../../components/common/button/Button';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import CapitalizeLetter from '../../utils/CapitalizeLetter';

export default function WelComeScreen({navigation}) {
  // store
  const {currentUserLoginData, getUserUpdateData} = MyProfileHook();
  const {capitalizeFirstLetter} = CapitalizeLetter();

  // console.log(currentUserLoginData, "currentUserLoginData");
  // console.log(getUserUpdateData, "getUserUpdateData");

  const onGetStarted = () => {
    navigation.navigate('AppStack', {
      isNotificationPage: false,
    });
  };

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Image
        source={require('../../assests/images/welcome.png')}
        style={styles.imageStyle}
        resizeMode="cover"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{flex: 1, paddingHorizontal: 25}}>
        <View style={styles.midImageStyle}>
          <Image
            source={require('../../assests/images/profile-interface/rafiki.png')}
            style={styles.midImage}
            resizeMode="contain"
          />
        </View>
        <Text
          children={'Welcome to Checkout'}
          textColor={theme.lightColor.red}
          size={20}
          fonts={theme.fontFamily.TinosBold}
          weight={theme.fontWeight.bold}
          style={styles.textStyle}
        />
        <Text
          children={`Hey ${
            currentUserLoginData?.firstName
              ? capitalizeFirstLetter(currentUserLoginData?.firstName)
              : getUserUpdateData?.user?.firstName
              ? capitalizeFirstLetter(getUserUpdateData?.user?.firstName)
              : false
          } ${
            currentUserLoginData?.lastName
              ? capitalizeFirstLetter(currentUserLoginData?.lastName)
              : getUserUpdateData?.user?.lastName
              ? capitalizeFirstLetter(getUserUpdateData?.user?.lastName)
              : false
          }, Welcome to MarketSpace 360, a community where e-commerce entrepreneurs can collaborate and support each other.`}
          textColor={theme.lightColor.gray}
          size={13}
          fonts={theme.fontFamily.TinosRegular}
          weight={theme.fontWeight.normal}
          style={styles.descriptionStyle}
        />
        <Text
          children={`Please be mindful of others when using MarketSpace 360. This means being kind and courteous, even when you disagree. It also means avoiding any behavior that could be harmful or upsetting. We hope you enjoy using MarketSpace 360! We have created a safe and inclusive space for everyone to thrive.`}
          textColor={theme.lightColor.gray}
          size={13}
          fonts={theme.fontFamily.TinosRegular}
          weight={theme.fontWeight.normal}
          alignText={'justify'}
        />
        <Button
          title={'I understand'}
          renderIconRight={() => <ArrowSplash />}
          containerStyle={styles.containerStyle}
          titleStyles={styles.titleStyles}
          onPressHandler={onGetStarted}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
  imageStyle: {
    height: windowHeight * 0.38,
    width: '100%',
    backgroundColor: 'transparent',
  },
  midImageStyle: {
    alignSelf: 'center',
    height: windowHeight * 0.26,
    width: windowWidth * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  midImage: {
    height: '100%',
    width: '100%',
  },
  textStyle: {
    alignSelf: 'center',
    marginTop: 20,
    // transform: [{scale: theme.animation.scale}],
  },
  descriptionStyle: {
    marginVertical: 13,
    textAlign: 'justify',
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  titleStyles: {
    fontSize: 14,
    fontWeight: theme.fontWeight.semiBold,
    textAlign: 'center',
    color: theme.lightColor.black,
    fontFamily: theme.fontFamily.times,
  },
});

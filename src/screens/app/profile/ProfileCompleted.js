import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import ImageWithCaption from '../../../components/common/imageWithCaption/ImageWithCaption';
import {Button} from '../../../components/common/button/Button';
import {theme} from '../../../assests/theme/Theme';

export default function ProfileCompleted({navigation}) {
  const onGoHomeScreen = () => {
    navigation.navigate('Setting');
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
            title={
              'Thank you for verifying your account. You will receive an email once your profile verification process is complete.'
            }
            textAlignment={'center'}
            paddingHorizontal={20}
            desTextSize={16}
            desFontStyles={theme.fontFamily.TinosBold}
            destTextColor={theme.lightColor.darkGray}
            imagePath={require('../../../assests/images/successPasswordLogo.png')}
            desContainer={styles.desContainerStyle}
          />
          <Button
            title={'Done'}
            onPressHandler={onGoHomeScreen}
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

import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import {theme} from '../../../assests/theme/Theme';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import {Button} from '../button/Button';
import {Text} from '../text/Text';
import SettingIconSvg from '../../../assests/icons/svg/homeSvgs/SettingIconSvg';
import ChatHeaderIconSvg from '../../../assests/icons/svg/homeSvgs/ChatHeaderIconSvg';
import LocationIconSvg from '../../../assests/icons/svg/homeSvgs/LocationIconSvg';
import VerifiedIconSvg from '../../../assests/icons/svg/homeSvgs/VerifiedIconSvg';
import {Rating} from 'react-native-ratings';

export default function ProfileHeader({
  navigation,
  settingRenderIcon,
  chatRenderIcon,
  profileHeadingTxt,
  profileSecondHeadingTxt,
  desContainer = false,
  imageUri,
  pickUpImageHandler = () => false,
  uploadImage = false,
  userCountry,
  isVerifiedStatus,
  ratingValue,
  imageViewer = true,
}) {
  const goBackHandler = () => {
    navigation.goBack();
  };
  const onGoSettingScreen = () => {
    navigation.navigate('Setting');
  };
  // navigate single image
  const SingleImage = data => {
    navigation.navigate('SingleImage', {
      images: data,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
      <View style={styles.headerNav}>
        <Button
          renderIconLeft={() => (
            <BackIconSvg
              height={14}
              width={20}
              color={theme.lightColor.white}
            />
          )}
          containerStyle={styles.btnStyle}
          onPressHandler={goBackHandler}
        />
        <Text
          children={'Profile'}
          textColor={theme.lightColor.white}
          size={20}
          fonts={theme.fontFamily.TinosBold}
        />
        {settingRenderIcon ? (
          <Button
            renderIconLeft={() => (
              <SettingIconSvg
                height={16}
                width={20}
                color={theme.lightColor.white}
              />
            )}
            containerStyle={styles.btnStyle}
            onPressHandler={onGoSettingScreen}
          />
        ) : (
          false
        )}
        {chatRenderIcon ? (
          <Button
            renderIconLeft={() => (
              <ChatHeaderIconSvg
                height={16}
                width={20}
                color={theme.lightColor.white}
              />
            )}
            containerStyle={styles.btnStyle}
            // onPressHandler={goBackHandler}
          />
        ) : (
          false
        )}
        {!settingRenderIcon && !chatRenderIcon ? (
          <Button
            // renderIconLeft={() => <ChatHeaderIconSvg
            //     height={16}
            //     width={20}
            //     color={theme.lightColor.white}
            // />}
            containerStyle={styles.btnStyle}
            // onPressHandler={goBackHandler}
          />
        ) : (
          false
        )}
      </View>
      <View style={styles.mainCardContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.avatarMainContainer}>
            <TouchableOpacity
              style={styles.avatarImageContainer}
              onPress={
                imageViewer
                  ? () => {imageUri? SingleImage(imageUri):null}
                  : () => pickUpImageHandler()
              }>
              {imageUri ? (
                <Image
                  source={{uri: imageUri}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                  style={styles.avatarImage}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%',
                    borderRadius: 50,
                  }}>
                  <Image
                    source={require('../../../assests/images/userIconImage.png')}
                    resizeMode="contain"
                    style={{height: 40, width: '100%'}}
                  />
                </View>
              )}
              {isVerifiedStatus && (
                <View style={{position: 'absolute', top: 50, right: 0}}>
                  <VerifiedIconSvg
                    height={18}
                    width={18}
                    color={theme.lightColor.orangeColor}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 50, marginBottom: 16, width: '80%'}}>
            {uploadImage ? (
              <Text
                children={'Upload Image'}
                textColor={theme.lightColor.gray}
                size={13}
                fonts={theme.fontFamily.TinosBold}
                style={{marginTop: 15}}
                alignText={'center'}
                onPressHandler={pickUpImageHandler}
              />
            ) : (
              false
            )}
            <Text
              children={profileHeadingTxt ? profileHeadingTxt : false}
              textColor={theme.lightColor.darkGray}
              size={16}
              fonts={theme.fontFamily.TinosBold}
              weight={theme.fontWeight.bold}
              style={{marginTop: uploadImage ? 7 : 15, width: '100%'}}
              alignText={'center'}
            />
            <Text
              children={profileSecondHeadingTxt}
              textColor={theme.lightColor.gray}
              size={13}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginTop: 5}}
              alignText={'center'}
            />
            {userCountry ? (
              <View style={styles.desContainer}>
                <View style={styles.iconContainer}>
                  <LocationIconSvg />
                </View>
                <Text
                  children={userCountry}
                  textColor={theme.lightColor.darkGray}
                  size={14}
                  fonts={theme.fontFamily.TinosBold}
                  style={{marginLeft: 6}}
                />
              </View>
            ) : (
              false
            )}
            <Rating
              type="star"
              ratingCount={5}
              imageSize={13}
              readonly={true}
              style={{marginRight: 4, marginTop: 6}}
              startingValue={ratingValue ? ratingValue : 0}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.28,
  },
  circle: {
    height: windowWidth * 1.5,
    width: windowWidth * 1.5,
    borderRadius: windowWidth * 1.5,
    backgroundColor: theme.lightColor.headerBg,
    position: 'absolute',
    top: -(windowWidth * 0.9),
    left: -(windowWidth * 0.26),
  },
  headerNav: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 45,
  },
  btnStyle: {
    height: 39,
    width: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    paddingHorizontal: 25,
  },
  cardContainer: {
    backgroundColor: theme.lightColor.white,
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 15,
  },
  avatarMainContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: theme.lightColor.white,
    borderRadius: 50,
  },
  avatarImageContainer: {
    height: 74,
    width: 74,
    borderRadius: 74,
    borderWidth: 3,
    borderColor: theme.lightColor.headerBg,
    backgroundColor: theme.lightColor.white,
    position: 'relative',
  },
  avatarImage: {
    height: 68.2,
    width: 68.2,
    borderRadius: 50,
  },
  iconContainer: {
    backgroundColor: theme.lightColor.iconFillColor,
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.lightColor.iconFillBorderColor,
  },
  desContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
});

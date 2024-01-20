import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import {theme} from '../../../assests/theme/Theme';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import {Button} from '../button/Button';
import {Text} from '../text/Text';
import ChatHeaderIconSvg from '../../../assests/icons/svg/homeSvgs/ChatHeaderIconSvg';
import LocationIconSvg from '../../../assests/icons/svg/homeSvgs/LocationIconSvg';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import VerifiedIconSvg from '../../../assests/icons/svg/homeSvgs/VerifiedIconSvg';
import {Rating} from 'react-native-ratings';

export default function UserSpecificationHeader({
  navigation,
  typeOfUser,
  typeOfUserStyles,
  typeOfUserTitle,
  headerData,
  loginUserId,
  chatUserData,
  ratingValue,
}) {
  const goBackHandler = () => {
    navigation.goBack();
  };
  const {capitalizeFirstLetter} = CapitalizeLetter();
  // onGoChatsScreen
  const onGoChatsScreen = data => {
    navigation.navigate('SingleChatMessage', {
      chatUser: data,
      cardItems: chatUserData,
      notificationId: '',
    });
  };

  // navigate single image
  const SingleImage = data => {
    console.log(data,"============data=======");
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
        <Button
          renderIconLeft={() =>
            loginUserId === headerData?._id ? null : (
              <ChatHeaderIconSvg
                height={16}
                width={20}
                color={theme.lightColor.white}
              />
            )
          }
          containerStyle={styles.btnStyle}
          onPressHandler={
            loginUserId === headerData?._id
              ? () => null
              : () => onGoChatsScreen(headerData?._id)
          }
        />
      </View>
      <View style={styles.mainCardContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.avatarMainContainer}>
            <TouchableOpacity
              style={styles.avatarImageContainer}
              onPress={() => {headerData.profilePic? SingleImage(headerData?.profilePic):null}}>
              {headerData?.profilePic ? (
                <Image
                  source={{uri: headerData?.profilePic}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.defaultAvatar}>
                  <Image
                    source={require('../../../assests/images/userIconImage.png')}
                    resizeMode="contain"
                    style={{height: 42, width: 42}}
                  />
                </View>
              )}
              {headerData?.identified_docs_status && (
                <View style={styles.IndicatorContainer}>
                  <VerifiedIconSvg
                    height={16}
                    width={16}
                    color={theme.lightColor.orangeColor}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 50, marginBottom: 25, width: '80%'}}>
            <Text
              children={
                headerData?.firstName && headerData?.lastName
                  ? `${capitalizeFirstLetter(
                      headerData?.firstName,
                    )} ${capitalizeFirstLetter(headerData?.lastName)}`
                  : ''
              }
              textColor={theme.lightColor.darkGray}
              size={16}
              fonts={theme.fontFamily.TinosBold}
              style={{marginTop: 15, width: '100%'}}
              alignText={'center'}
            />
            <View style={typeOfUserStyles}>
              {typeOfUser ? (
                <Text
                  children={capitalizeFirstLetter(typeOfUserTitle)}
                  textColor={theme.lightColor.darkGray}
                  size={13}
                  fonts={theme.fontFamily.TinosBold}
                  alignText={'center'}
                />
              ) : (
                <Text
                  children={capitalizeFirstLetter(typeOfUserTitle)}
                  textColor={theme.lightColor.gray}
                  size={13}
                  fonts={theme.fontFamily.TinosRegular}
                  alignText={'center'}
                />
              )}
              {typeOfUser ? (
                <Text
                  children={
                    headerData?.accountType
                      ? capitalizeFirstLetter(headerData?.accountType)
                      : ''
                  }
                  textColor={theme.lightColor.gray}
                  size={13}
                  fonts={theme.fontFamily.TinosRegular}
                  alignText={'center'}
                  style={{marginLeft: 10}}
                />
              ) : (
                false
              )}
            </View>
            <View style={styles.desContainer}>
              <View style={styles.iconContainer}>
                <LocationIconSvg />
              </View>
              <Text
                children={
                  headerData?.country
                    ? capitalizeFirstLetter(headerData?.country)
                    : ''
                }
                textColor={theme.lightColor.darkGray}
                size={16}
                fonts={theme.fontFamily.TinosBold}
                style={{marginLeft: 6}}
              />
            </View>
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
    height: windowHeight * 0.33,
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
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  iconContainer: {
    backgroundColor: theme.lightColor.iconFillColor,
    height: 22,
    width: 22,
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
    marginTop: 8,
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  IndicatorContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
  },
});

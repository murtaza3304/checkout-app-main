import {
  View,
  StyleSheet,
  ScrollView,
  Image as NativeImage,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Image from 'react-native-image-progress';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {theme} from '../../../assests/theme/Theme';
import CreatePostDropDown from '../../../components/common/dropDown/CreatePostDropDown';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import PhotosIconSvg from '../../../assests/icons/svg/homeSvgs/PhotosIconSvg';
import {Text} from '../../../components/common/text/Text';
import VideoIconSvg from '../../../assests/icons/svg/homeSvgs/VideoIconSvg';
import {Button} from '../../../components/common/button/Button';
import CreatePostHook from '../../../customHooks/postsHook/CreatePostHook';
import VideoPlayIconSvg from '../../../assests/icons/svg/homeSvgs/VideoPlayIconSvg';
import MyProfileHook from '../../../customHooks/postsHook/MyProfileHook';
import HashTagModel from '../../../components/common/countryPikerModel/HashTagModel';
import {HASH_TAGS_DATA} from '../../../utils/ConstantData';
import CrossIconSvg from '../../../assests/icons/svg/homeSvgs/CrossIconSvg';
import uuid from 'react-native-uuid';
import {Loader} from '../../../components/common/loader/Loader';

export default function CreatePost({navigation, route}) {
  // console.log(route?.params?.postCardData, "navigation post data");
  const {
    pickUpImageHandler,
    pickUpVideoHandler,
    imageUri,
    videoUri,
    onSubmitHandler,
    postInput,
    validatePostText,
    onCreatePostHandlerError,
    validatePrivacyStatusType,
    privacyStatusError,
    loading,
    postInputError,
    collectHashtags,
    setCollectHashtags,
    flag,
    onUpdateHandler,
    onUpdatePostHandlerError,
    hashTagError,
    mediaSizeError,
    privacyStatus,
    onRemoveImage,
    onRemoveVideo,
    mediaLoading,
    videoMediaLoading,
  } = CreatePostHook({navigation, route});
  const {getUserUpdateData, updateUserData, currentUserLoginData} =
    MyProfileHook();
  const [isModalVisible, setModalVisible] = useState(false);

  // console.log(imageUri, 'imageUri');
  // console.log(videoUri, 'videoUri');
  // console.log(updateImgFlag, "updateImgFlag");
  // console.log(updateVideoFlag, "updateVideoFlag");
  const [hashtagText, setHashtagText] = useState('');

  // // uuid
  function generateRandomHexString(length) {
    const uid = uuid?.v4();
    return uid.replace(/-/g, '').substring(0, length);
  }

  const onHashtagSubmit = () => {
    if (!hashtagText) {
      return;
    } else {
      let newUid = generateRandomHexString(24);
      HASH_TAGS_DATA.push({id: newUid, name: `#${hashtagText} `});
    }
    setHashtagText('');
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{width: '100%', paddingHorizontal: 25}}>
          <View style={styles.avaTarContainer}>
            <View>
              {updateUserData?.user?.profilePic ? (
                <NativeImage
                  source={{uri: updateUserData?.user?.profilePic}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                  style={styles.avatarImage}
                />
              ) : getUserUpdateData?.profilePic ? (
                <NativeImage
                  source={{uri: getUserUpdateData?.profilePic}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                  style={styles.avatarImage}
                />
              ) : currentUserLoginData?.profilePic ? (
                <NativeImage
                  source={{uri: currentUserLoginData?.profilePic}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                  style={styles.avatarImage}
                />
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderWidth: 1.3,
                    borderColor: theme.lightColor.headerBg,
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                  }}>
                  <NativeImage
                    source={require('../../../assests/images/userIconImage.png')}
                    resizeMode="contain"
                    style={{height: 30, width: 30}}
                  />
                </View>
              )}
            </View>
            <View>
              <CreatePostDropDown
                privacyStatus={validatePrivacyStatusType}
                privacyStatusValue={privacyStatus}
              />
              {privacyStatusError ? (
                <Text
                  children={privacyStatusError ? privacyStatusError : false}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={10}
                  style={{marginLeft: 24}}
                />
              ) : (
                false
              )}
            </View>
          </View>
          {/* TextInput */}
          <View style={styles.contentInputContainer}>
            <CommonTextInput
              Value={postInput}
              inputStyle={[
                styles.HeaderTextInputStyle,
                {paddingBottom: postInput ? 0 : 100},
              ]}
              onChangeHandler={e => validatePostText(e)}
              placeHoldertext={`What’s up`}
              placeholderColor={theme.lightColor.postInputPlaceholder}
              multilineText={true}
            />
          </View>
          {postInputError ? (
            <Text
              children={postInputError ? postInputError : false}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.red}
              size={10}
              style={{marginTop: 10}}
            />
          ) : (
            false
          )}
          <ScrollView
            horizontal={true}
            style={{
              marginTop: imageUri?.length > 0 || videoUri?.length > 0 ? 30 : 0,
            }}>
            {mediaLoading ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 130,
                  width: 102,
                  marginTop: 30,
                }}>
                <Loader color={theme.lightColor.headerBg} size={22} />
              </View>
            ) : imageUri?.length > 0 ? (
              imageUri?.map((item, index) => (
                <View key={index} style={{position: 'relative'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginRight: 6,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: 3,
                    }}
                    onPress={() => {
                      onRemoveImage(item?.file);
                    }}>
                    <CrossIconSvg height={16} width={16} />
                  </TouchableOpacity>
                  <Image
                    key={index}
                    source={{uri: item?.file}}
                    renderIndicator={() => (
                      <Loader color={theme.lightColor.headerBg} size={22} />
                    )}
                    style={{
                      height: 130,
                      width: 102,
                      marginRight: 6,
                      zIndex: -1,
                    }}
                    resizeMode="cover"
                  />
                </View>
              ))
            ) : (
              false
            )}
            {videoMediaLoading ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 130,
                  width: 102,
                  marginTop: 30,
                }}>
                <Loader color={theme.lightColor.headerBg} size={22} />
              </View>
            ) : videoUri?.length > 0 ? (
              videoUri?.map((item, index) => (
                <View key={index} style={{position: 'relative'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginRight: 6,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: 3,
                      zIndex: 1,
                    }}
                    onPress={() => {
                      onRemoveVideo(item?.file);
                    }}>
                    <CrossIconSvg height={16} width={16} />
                  </TouchableOpacity>
                  <ImageBackground
                    source={{uri: item?.file}}
                    resizeMode="cover"
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 130,
                      width: 102,
                      marginRight: 6,
                    }}>
                    <TouchableOpacity>
                      <VideoPlayIconSvg />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              ))
            ) : (
              false
            )}
          </ScrollView>
          {mediaSizeError ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: 30,
              }}>
              <Text
                children={mediaSizeError ? mediaSizeError : false}
                fonts={theme.fontFamily.TinosBold}
                textColor={theme.lightColor.red}
                weight={theme.fontWeight.bold}
                size={10}
              />
            </View>
          ) : (
            false
          )}
          {/* cards */}
          <View style={styles.mainCardContainer}>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={pickUpImageHandler}>
              <View style={styles.btnBG}>
                <PhotosIconSvg />
              </View>
              <Text
                children={'Photo'}
                textColor={theme.lightColor.darkGray}
                size={16}
                fonts={theme.fontFamily.TinosRegular}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={pickUpVideoHandler}>
              <View style={styles.btnBG}>
                <VideoIconSvg />
              </View>
              <Text
                children={'Video'}
                textColor={theme.lightColor.darkGray}
                size={16}
                fonts={theme.fontFamily.TinosRegular}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', marginBottom: 30, marginTop: 20}}>
            <Text
              children={'Hashtag'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={15}
              style={{marginBottom: 5, marginTop: 10}}
            />
            <Pressable
              style={styles.hashTagContainer}
              onPress={() => {
                setModalVisible(true);
              }}>
              {collectHashtags?.length > 0 ? (
                collectHashtags.map((item, index) => (
                  <Text
                    key={index}
                    children={`${item}, `}
                    size={14}
                    textColor={theme.lightColor.black}
                    fonts={theme.fontFamily.TinosRegular}
                    onPressHandler={() => setModalVisible(true)}
                  />
                ))
              ) : (
                <Text
                  children={'Select'}
                  size={14}
                  textColor={theme.lightColor.black}
                  fonts={theme.fontFamily.TinosRegular}
                  onPressHandler={() => setModalVisible(true)}
                />
              )}
            </Pressable>
            {hashTagError ? (
              <Text
                children={hashTagError ? hashTagError : false}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
                style={{marginTop: 4}}
              />
            ) : (
              false
            )}
          </View>
          {/* button */}
          <View>
            {flag ? (
              <>
                {onUpdatePostHandlerError ? (
                  <Text
                    children={
                      onUpdatePostHandlerError
                        ? onUpdatePostHandlerError
                        : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginBottom: 8}}
                    alignText={'center'}
                  />
                ) : (
                  false
                )}
                <Button
                  title={'Update'}
                  onPressHandler={onUpdateHandler}
                  titleStyles={styles.titleStyles}
                  containerStyle={styles.containerStyle}
                  linearGradient={true}
                  loading={loading}
                />
              </>
            ) : (
              <>
                {onCreatePostHandlerError ? (
                  <Text
                    children={
                      onCreatePostHandlerError
                        ? onCreatePostHandlerError
                        : false
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    textColor={theme.lightColor.red}
                    size={10}
                    style={{marginBottom: 8}}
                    alignText={'center'}
                  />
                ) : (
                  false
                )}
                <Button
                  title={'Post'}
                  onPressHandler={onSubmitHandler}
                  titleStyles={styles.titleStyles}
                  containerStyle={styles.containerStyle}
                  linearGradient={true}
                  loading={loading}
                />
              </>
            )}
          </View>
          <View style={{height: 20}}></View>
        </ScrollView>
      </View>
      <HashTagModel
        setValue={setCollectHashtags}
        putValue={collectHashtags}
        modelData={HASH_TAGS_DATA}
        modelHeight={'100%'}
        title={'Hashtags'}
        inputSelect={true}
        setHashtagText={setHashtagText}
        onHashtagSubmit={onHashtagSubmit}
        hashtagText={hashtagText}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        placeholderInput="Add Hashtag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  avaTarContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  contentInputContainer: {
    borderColor: theme.lightColor.headerBg,
    borderRadius: 6,
    borderWidth: 1,
    height: 150,
    width: '100%',
    backgroundColor: theme.lightColor.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  HeaderTextInputStyle: {
    width: '100%',
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    paddingHorizontal: 20,
  },
  mainCardContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  cardContainer: {
    width: '47%',
    backgroundColor: theme.lightColor.white,
    borderColor: theme.lightColor.postInputBg,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 6,
    borderRadius: 5,
    borderWidth: 1,
  },
  btnBG: {
    backgroundColor: theme.lightColor.bodyColor,
    borderColor: theme.lightColor.postInputBg,
    borderWidth: 1,
    height: 40,
    width: 40,
    padding: 4,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
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
  hashTagContainer: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

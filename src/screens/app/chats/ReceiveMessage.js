import {
  StyleSheet,
  View,
  Image as NativeImage,
  Pressable,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import Image from 'react-native-image-progress';
import ChatVideo from './ChatVideo';
import VideoPlayIconSvg from '../../../assests/icons/svg/homeSvgs/VideoPlayIconSvg';
import UTC_Time from '../../../utils/UTC_Time';

const ReceiveMessage = ({Messages, userInfo, navigation, messageItem}) => {
  // console.log(Messages, 'Messages receive');

  // onGoSingleImageScreen
  const onGoSingleImageScreen = data => {
    navigation.navigate('SingleImageScreen', {
      images: Messages?.file,
      currentIndex: data,
    });
  };
  const {convertUTC_Time} = UTC_Time();
  // onGoSingleVideoScreen
  const onGoSingleVideoScreen = data => {
    navigation.navigate('SingleVideoScreen', {
      videoUrl: data,
    });
  };
  return (
    <>
      {Messages?.file?.length > 0 && (
        <View style={styles.main1}>
          <View style={styles.profile}>
            {userInfo?.profilePic ? (
              <NativeImage
                source={{uri: userInfo?.profilePic}}
                resizeMode={Platform.OS === 'ios' ? 'center' : 'contain'}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.defaultAvatar}>
                <NativeImage
                  source={require('../../../assests/images/userIconImage.png')}
                  resizeMode={Platform.OS === 'ios' ? 'center' : 'contain'}
                  style={{height: 28, width: 28}}
                />
              </View>
            )}
          </View>
          {Messages?.file?.length > 0 && (
            <View style={styles.mainMediaContainer}>
              <View
                style={[
                  styles.mediaContainer,
                  {minHeight: Messages?.file?.length > 2 ? 90 : 120},
                ]}>
                {Messages?.file?.map((item, index) =>
                  item?.type?.toLowerCase() === 'image' ? (
                    <TouchableOpacity
                      key={index}
                      onPress={() => onGoSingleImageScreen(index)}>
                      <Image
                        source={{
                          uri: item?.fileKey ? item?.fileKey : item?.file,
                        }}
                        style={{
                          height: Messages?.file?.length > 2 ? 90 : 120,
                          width: Messages?.file?.length > 2 ? 66 : 100,
                          marginHorizontal: 1,
                          marginVertical: 1,
                        }}
                        resizeMode="cover"
                        borderRadius={6}
                      />
                    </TouchableOpacity>
                  ) : item?.type?.toLowerCase() === 'video' ? (
                    item?.fileKey ? (
                      <ChatVideo
                        key={index}
                        mediaUri={item?.fileKey}
                        navigation={navigation}
                      />
                    ) : item?.file ? (
                      <TouchableOpacity
                        key={index}
                        onPress={() => onGoSingleVideoScreen(item?.file)}>
                        <ImageBackground
                          source={{
                            uri: item?.file,
                          }}
                          style={{
                            height: 120,
                            width: 204,
                            marginVertical: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          resizeMode="cover"
                          borderRadius={6}>
                          <TouchableOpacity
                            onPress={() => onGoSingleVideoScreen(item?.file)}>
                            <VideoPlayIconSvg />
                          </TouchableOpacity>
                        </ImageBackground>
                      </TouchableOpacity>
                    ) : (
                      false
                    )
                  ) : (
                    false
                  ),
                )}
              </View>
              <Text
                children={
                  messageItem?.messageTime
                    ? convertUTC_Time(messageItem?.messageTime)
                    : ''
                }
                fonts={theme.fontFamily.TinosRegular}
                style={{marginTop: 2}}
                size={8}
                textColor={theme.lightColor.black}
              />
            </View>
          )}
        </View>
      )}
      {Messages?.text && (
        <View style={styles.main1}>
          <View style={styles.profile}>
            {userInfo?.profilePic ? (
              <NativeImage
                source={{uri: userInfo?.profilePic}}
                resizeMode={Platform.OS === 'ios' ? 'center' : 'contain'}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.defaultAvatar}>
                <NativeImage
                  source={require('../../../assests/images/userIconImage.png')}
                  resizeMode={Platform.OS === 'ios' ? 'center' : 'contain'}
                  style={{height: 28, width: 28}}
                />
              </View>
            )}
          </View>
          {Messages?.text && (
            <Pressable style={styles.mainMsgBox}>
              <View style={[styles.msgBox, {borderBottomStartRadius: 0}]}>
                <Text
                  children={Messages?.text}
                  fonts={theme.fontFamily.TinosRegular}
                  alignText={'justify'}
                  size={15}
                  textColor={theme.lightColor.chatTitleColor}
                />
              </View>
              <Text
                children={
                  messageItem?.messageTime
                    ? convertUTC_Time(messageItem?.messageTime)
                    : ''
                }
                fonts={theme.fontFamily.TinosRegular}
                style={{marginTop: 2}}
                size={8}
                textColor={theme.lightColor.black}
              />
            </Pressable>
          )}
        </View>
      )}
    </>
  );
};

export default ReceiveMessage;
const styles = StyleSheet.create({
  main1: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  mainMsgBox: {
    minWidth: '20%',
    maxWidth: '66%',
    marginLeft: 6,
  },
  mainMediaContainer: {
    minWidth: '20%',
    maxWidth: '66%',
    marginLeft: 6,
  },
  msgBox: {
    minHeight: 35,
    backgroundColor: theme.lightColor.white,
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.lightColor.gray,
  },
  avatarImage: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  mediaContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flexWrap: 'wrap',
  },
  defaultAvatar: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

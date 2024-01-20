import {
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import Image from 'react-native-image-progress';
import VideoPlayIconSvg from '../../../assests/icons/svg/homeSvgs/VideoPlayIconSvg';
import ChatVideo from './ChatVideo';
import UTC_Time from '../../../utils/UTC_Time';

const SendMessage = ({Messages, navigation, messageItem}) => {
  // console.log(Messages, 'Messages');
  // console.log(
  //   Messages?.file?.length > 0 && Messages?.text,
  //   'Messages?.file?.length > 0 && Messages?.text',
  // );
  const {convertUTC_Time} = UTC_Time();
  // onGoSingleImageScreen
  const onGoSingleImageScreen = data => {
    navigation.navigate('SingleImageScreen', {
      images: Messages?.file,
      currentIndex: data,
    });
  };

  // onGoSingleVideoScreen
  const onGoSingleVideoScreen = data => {
    navigation.navigate('SingleVideoScreen', {
      videoUrl: data,
    });
  };
  return (
    <>
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
                    source={{uri: item?.fileKey ? item?.fileKey : item?.file}}
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
            alignText={'right'}
            size={8}
            textColor={theme.lightColor.black}
          />
        </View>
      )}
      {Messages?.text && (
        <Pressable style={styles.mainMsgBox}>
          <View
            style={[
              styles.msgBox,
              {
                borderBottomEndRadius: 0,
              },
            ]}>
            <Text
              children={Messages?.text ? Messages?.text : ''}
              fonts={theme.fontFamily.TinosRegular}
              alignText={'justify'}
              size={15}
              textColor={theme.lightColor.white}
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
            alignText={'right'}
            size={8}
            textColor={theme.lightColor.black}
          />
        </Pressable>
      )}
    </>
  );
};

export default SendMessage;
const styles = StyleSheet.create({
  mainMsgBox: {
    minWidth: '20%',
    maxWidth: '66%',
    alignSelf: 'flex-end',
    marginBottom: 18,
    marginRight: 3,
  },
  msgBox: {
    minHeight: 35,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: theme.lightColor.headerBg,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  mainMediaContainer: {
    minWidth: '20%',
    maxWidth: '66%',
    marginBottom: 18,
    alignSelf: 'flex-end',
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});

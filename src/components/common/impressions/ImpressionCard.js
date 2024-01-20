import {
  View,
  StyleSheet,
  Image,
  Platform,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '../text/Text';
import AnalyticsLikeIconSvg from '../../../assests/icons/svg/homeSvgs/AnalyticsLikeIconSvg';
import {theme} from '../../../assests/theme/Theme';
import DateTime from '../../../utils/DateTime';
import {createThumbnail} from 'react-native-create-thumbnail';
import VideoPlayIconSvg from '../../../assests/icons/svg/homeSvgs/VideoPlayIconSvg';
import RNFetchBlob from 'rn-fetch-blob';
import {Loader} from '../loader/Loader';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import GraphIconSvg from '../../../assests/icons/svg/homeSvgs/GraphIconSvg';

export default function ImpressionCard({cardItems, navigation, iconGraph}) {
  // console.log(cardItems, 'cardItems');
  const {getCommentTimeAgo} = DateTime();
  const {capitalizeFirstLetter} = CapitalizeLetter();

  // states
  const [thumbnail, setThumbnail] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);

  useEffect(() => {
    if (cardItems?.post?.file[0]?.type?.toLowerCase() === 'video') {
      setMediaLoading(true);
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp4',
      })
        .fetch('GET', cardItems?.post?.file[0]?.fileKey, {})
        .then(res => {
          createThumbnail({
            url:
              Platform?.OS === 'ios'
                ? res.path(res.path())
                : `file://${res.path(res.path())}`,
            timeStamp: 10000,
          })
            .then(response => {
              // console.log(response, 'response');
              setThumbnail(response?.path);
              setMediaLoading(false);
            })
            .catch(err => console.log({err}));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  // on go analytics screen
  const onGoAnalyticsScreen = () => {
    navigation?.navigate('PostsAnalytics', {
      cardItems,
    });
  };

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => onGoAnalyticsScreen()}>
      <View style={styles.cardHeader}>
        {cardItems?.post?.author?.firstName &&
          cardItems?.post?.author?.lastName && (
            <Text
              children={`${capitalizeFirstLetter(
                cardItems?.post?.author?.firstName,
              )} ${capitalizeFirstLetter(cardItems?.post?.author?.lastName)}`}
              size={16}
              textColor={theme.lightColor.darkGray}
              weight={theme.fontWeight.bold}
              fonts={theme.fontFamily.TinosBold}
              lines={1}
              onPressHandler={() => onGoAnalyticsScreen()}
            />
          )}
        <Text
          children={`Posted this ${getCommentTimeAgo(cardItems?.createdAt)}`}
          size={12}
          textColor={theme.lightColor.gray}
          fonts={theme.fontFamily.TinosRegular}
          onPressHandler={() => onGoAnalyticsScreen()}
        />
      </View>
      <View style={styles.contentMainContainer}>
        <View style={styles.cardImageContainer}>
          {cardItems?.post?.file[0]?.type?.toLowerCase() === 'image' ? (
            <Image
              source={{uri: cardItems?.post?.file[0]?.fileKey}}
              resizeMode="contain"
              style={styles.mainCardImage}
            />
          ) : cardItems?.post?.file[0]?.type?.toLowerCase() === 'video' ? (
            mediaLoading ? (
              <View style={styles.loaderContainer}>
                <Loader color={theme.lightColor.headerBg} size={18} />
              </View>
            ) : (
              thumbnail && (
                <ImageBackground
                  source={{uri: thumbnail}}
                  resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
                  style={styles.videoThumbnail}
                  imageStyle={{borderRadius: 6}}>
                  <VideoPlayIconSvg />
                </ImageBackground>
              )
            )
          ) : (
            cardItems?.post?.fileType?.toLowerCase() === 'text' && (
              <View style={styles.textContainer}>
                <Text
                  children={cardItems?.post?.text}
                  size={13}
                  textColor={theme.lightColor.white}
                  fonts={theme.fontFamily.TinosBold}
                  weight={theme.fontWeight.bold}
                  alignText={'center'}
                />
              </View>
            )
          )}
        </View>
        <View style={styles.desContainer}>
          {cardItems?.post?.text &&
            cardItems?.post?.fileType?.toLowerCase() !== 'text' && (
              <Text
                children={cardItems?.post?.text}
                size={13}
                textColor={theme.lightColor.gray}
                fonts={theme.fontFamily.TinosBold}
                style={{marginBottom: 6}}
                weight={theme.fontWeight.bold}
                onPressHandler={() => onGoAnalyticsScreen()}
              />
            )}
          <Text
            children={`${
              cardItems?.impressionsCount > 0
                ? cardItems?.impressionsCount
                : '0'
            } Impressions`}
            size={13.5}
            textColor={theme.lightColor.headerBg}
            fonts={theme.fontFamily.TinosBold}
            onPressHandler={() => onGoAnalyticsScreen()}
          />
          <View style={styles.likeContainer}>
            <AnalyticsLikeIconSvg height={16} width={16} />
            <Text
              children={cardItems?.likesCount > 0 ? cardItems?.likesCount : '0'}
              size={14}
              textColor={theme.lightColor.gray}
              fonts={theme.fontFamily.TinosBold}
              style={{marginLeft: 10}}
              onPressHandler={() => onGoAnalyticsScreen()}
            />
          </View>
          {iconGraph && (
            <View style={{alignItems: 'flex-end'}}>
              <GraphIconSvg />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.lightColor.newBodyColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 10,
  },
  cardImageContainer: {
    height: 95,
    width: '34%',
    borderRadius: 6,
  },
  mainCardImage: {
    height: '100%',
    width: '100%',
    borderRadius: 6,
  },
  contentMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  desContainer: {
    width: '60%',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  videoThumbnail: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  textContainer: {
    backgroundColor: theme.lightColor.headerBg,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

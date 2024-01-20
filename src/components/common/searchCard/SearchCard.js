import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Image from 'react-native-image-progress';
import {Text} from '../text/Text';
import {theme} from '../../../assests/theme/Theme';
import DateTime from '../../../utils/DateTime';
import RNFetchBlob from 'rn-fetch-blob';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Loader} from '../loader/Loader';
import VideoPlayIconSvg from '../../../assests/icons/svg/homeSvgs/VideoPlayIconSvg';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';

export default function SearchCard({navigation, cardsData, index}) {
  // console.log(cardsData, "cardData");

  const {getTimeAgo} = DateTime();
  const {capitalizeFirstLetter} = CapitalizeLetter();
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);
  const onGoSearchResults = (data, index) => {
    navigation.navigate('SearchResults', {
      cardData: {
        data,
        index,
        notificationId: '',
      },
    });
  };

  useEffect(() => {
    if (cardsData?.file[0]?.type?.toLowerCase() == 'video') {
      setMediaLoading(true);
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp4',
      })
        .fetch('GET', cardsData?.file[0]?.fileKey, {})
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
              setThumbnailImage(response?.path);
              setMediaLoading(false);
            })
            .catch(err => console.log({err}));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setThumbnailImage(cardsData?.file[0]?.fileKey);
    }
  }, []);

  return (
    <>
      {cardsData?.file?.length > 0 &&
      ['media', 'image', 'video']?.includes(
        cardsData?.fileType?.toLowerCase(),
      ) ? (
        <TouchableOpacity
          style={styles.searchCardContainer}
          onPress={() => onGoSearchResults(cardsData, index)}>
          <View style={styles.cardMainContainer}>
            <View style={styles.cardImgcontainer}>
              {mediaLoading ? (
                <View style={styles.loaderContainer}>
                  <Loader color={theme.lightColor.headerBg} size={18} />
                </View>
              ) : (
                <>
                  {cardsData?.file?.length > 0 && thumbnailImage ? (
                    <>
                      {cardsData?.file[0]?.type?.toLowerCase() == 'video' ? (
                        <ImageBackground
                          source={{uri: thumbnailImage}}
                          resizeMode={
                            Platform.OS === 'android' ? 'cover' : 'contain'
                          }
                          style={styles.videoThumbnail}
                          imageStyle={{borderRadius: 6}}>
                          <VideoPlayIconSvg />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: thumbnailImage}}
                          resizeMode="contain"
                          style={styles.cardImg}
                          borderRadius={6}
                          renderIndicator={() => (
                            <Loader
                              color={theme.lightColor.headerBg}
                              size={22}
                            />
                          )}
                        />
                      )}
                    </>
                  ) : (
                    false
                  )}
                </>
              )}
            </View>
            <View style={styles.desContainer}>
              {cardsData?.author?.firstName && cardsData?.author?.lastName && (
                <Text
                  children={`${capitalizeFirstLetter(
                    cardsData?.author?.firstName,
                  )} ${capitalizeFirstLetter(cardsData?.author?.lastName)}`}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  weight={theme.fontWeight.bold}
                  size={17}
                  lines={1}
                  onPressHandler={() => onGoSearchResults(cardsData, index)}
                />
              )}
              <Text
                children={cardsData?.text}
                fonts={theme.fontFamily.TinosBold}
                textColor={theme.lightColor.darkGray}
                size={14}
                onPressHandler={() => onGoSearchResults(cardsData, index)}
              />
              <Text
                children={getTimeAgo(cardsData?.createdAt)}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.gray}
                size={10}
                style={{marginTop: 2}}
                onPressHandler={() => onGoSearchResults(cardsData, index)}
              />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        false
      )}
      <View style={{height: 27}} />
    </>
  );
}

const styles = StyleSheet.create({
  searchCardContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: theme.lightColor.newBodyColor,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    marginHorizontal: 25,
    marginTop: 12,
  },
  cardMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardImgcontainer: {
    height: 70,
    width: '30%',
    borderRadius: 10,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    borderRadius: 6,
  },
  desContainer: {
    width: '65%',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  videoThumbnail: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

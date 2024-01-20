import {TouchableOpacity, ImageBackground, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import VideoPlayIconSvg from '../../../assests/icons/svg/homeSvgs/VideoPlayIconSvg';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Loader} from '../../../components/common/loader/Loader';
import {theme} from '../../../assests/theme/Theme';

export default function ChatVideo({mediaUri, navigation}) {
  // state
  const [thumbnail, setThumbnail] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);

  // createThumbnail
  useEffect(() => {
    setMediaLoading(true);
    createThumbnail({
      url: Platform?.OS === 'ios' ? mediaUri : `file://${mediaUri}`,
      timeStamp: 10000,
    })
      .then(response => {
        // console.log('res+++++++>>>>>>>>', response?.path);
        setThumbnail(response?.path);
        setMediaLoading(false);
      })
      .catch(err => console.log('chat video thumbnail error', {err}));
  }, []);
  const onGoSingleVideoScreen = data => {
    navigation.navigate('SingleVideoScreen', {
      videoUrl: data,
    });
  };
  return mediaLoading ? (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Loader color={theme.lightColor.headerBg} size={22} />
    </View>
  ) : (
    thumbnail && (
      <TouchableOpacity onPress={() => onGoSingleVideoScreen(mediaUri)}>
        <ImageBackground
          source={{
            uri: thumbnail,
          }}
          style={{
            height: 120,
            width: 204,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="cover"
          borderRadius={6}>
          <TouchableOpacity onPress={() => onGoSingleVideoScreen(mediaUri)}>
            <VideoPlayIconSvg />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    )
  );
}

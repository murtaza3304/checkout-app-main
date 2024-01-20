import React, {useState, useEffect} from 'react';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  AppState,
} from 'react-native';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import RNFetchBlob from 'rn-fetch-blob';
import {Loader} from '../../../components/common/loader/Loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function SingleVideo({
  focusedIndex,
  index,
  isScreenFocused,
  videoUrl,
  focusedVideo,
  setFocusedVideo,
  localUri = false,
}) {
  // console.log(
  //   focusedIndex,
  //   index,
  //   isScreenFocused,
  //   videoUrl,
  //   focusedVideo,
  //   setFocusedVideo,
  //   'video data',
  // );

  const videoRef = React.createRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [videoPath, setVideoPath] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);

  useEffect(() => {
    if (localUri) {
      setVideoPath(videoUrl);
    } else {
      setMediaLoading(true);
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp4',
      })
        .fetch('GET', videoUrl, {})
        .then(res => {
          // console.log('response?????', res.path(res.path()));
          setVideoPath(res.path(res.path()));
          setMediaLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [videoUrl]);

  useEffect(() => {}, [videoPath]);

  if (setFocusedVideo) {
    useEffect(() => {
      if (!isScreenFocused) {
        setFocusedVideo(null);
      }
    }, [isScreenFocused]);
  }

  useEffect(() => {
    if (
      focusedVideo == index &&
      focusedIndex == index &&
      isScreenFocused &&
      AppState.currentState == 'active' &&
      play
    ) {
      setPlay(true);
      setTimeout(() => setShowControl(false), 2000);
    } else {
      setPlay(false);
      setShowControl(true);
    }
  }, [focusedVideo, focusedIndex, isScreenFocused, AppState.currentState]);

  const handlePlayPause = () => {
    if (play) {
      setPlay(false);
      setShowControl(true);
      setFocusedVideo(null);
      return;
    }
    setTimeout(() => setShowControl(false), 2000);
    setPlay(true);
    setFocusedVideo(index);
  };

  const handlePlay = () => {
    setTimeout(() => setShowControl(false), 500);
    setPlay(true);
    setFocusedVideo(index);
  };

  const skipBackward = () => {
    videoRef.current.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    videoRef.current.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  };

  const handleControls = () => {
    if (showControl) {
      setShowControl(false);
    } else {
      setShowControl(true);
    }
  };

  const onLoadEnd = data => {
    setDuration(data.duration);
    setCurrentTime(data.currentTime);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onSeek = data => {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  };

  const onEnd = () => {
    setPlay(false);
    videoRef.current.seek(0);
  };

  const onError = error => console.log('Oh! ', error);

  return Platform.OS === 'ios' && videoPath ? (
    <Video
      bufferConfig={{
        minBufferMs: 15000,
        maxBufferMs: 50000,
        bufferForPlaybackMs: 2500,
        bufferForPlaybackAfterRebufferMs: 5000,
      }}
      allowsExternalPlayback={false}
      resizeMode={'cover'}
      paused={false}
      controls={true}
      source={{uri: videoPath}} // Can be a URL or a local file.postsData?.file[0]
      fullscreenAutorotate={true}
      style={styles.backgroundVideo}
    />
  ) : mediaLoading ? (
    <View>
      <Loader color={'#fff'} size={30} />
    </View>
  ) : (
    videoPath && (
      <View style={styles.container}>
        <Pressable onPress={handleControls}>
          <Video
            ref={videoRef}
            source={{
              uri: videoPath,
            }}
            style={[
              styles.video,
              {height: localUri ? windowHeight * 0.6 : windowHeight},
            ]}
            controls={false}
            resizeMode={localUri ? 'cover' : 'contain'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!play}
            // muted={true}
            volume={10}
            bufferConfig={{
              minBufferMs: 5000,
              maxBufferMs: 10000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            onError={onError}
          />

          {showControl && (
            <View style={styles.controlOverlay}>
              <PlayerControls
                onPlay={handlePlay}
                onPause={handlePlayPause}
                playing={play}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />

              <View style={styles.bottomContainer}>
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration > 0 ? duration : 0}
                  onSlideStart={handlePlayPause}
                  onSlideComplete={handlePlayPause}
                  onSlideCapture={onSeek}
                />
              </View>
            </View>
          )}
        </Pressable>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  video: {
    width: windowWidth,
    backgroundColor: 'black',
  },
  fullscreenButton: {
    paddingRight: 14,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
  },
});

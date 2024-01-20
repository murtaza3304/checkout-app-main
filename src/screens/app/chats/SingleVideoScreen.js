import React, {useState, useEffect} from 'react';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Platform,
} from 'react-native';
import ProgressBar from '../videoScreen/ProgressBar';
import PlayerControls from '../videoScreen/PlayerControls';
import Orientation from 'react-native-orientation-locker';
import VideoSmallScreen from '../../../assests/icons/svg/videoIcons/VideoSmallScreen';
import VideoFullScreen from '../../../assests/icons/svg/videoIcons/VideoFullScreen';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import RNFetchBlob from 'rn-fetch-blob';
import {Loader} from '../../../components/common/loader/Loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;

const SingleVideoScreen = ({route, navigation}) => {
  // console.log(route?.params?.videoUrl, 'route?.params?.videoUrl');

  const videoRef = React.createRef();

  // change orientation
  useEffect(() => {
    Orientation.unlockAllOrientations();
    return () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    };
  }, []);

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [videoPath, setVideoPath] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);

  useEffect(() => {
    setMediaLoading(true);
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp4',
    })
      .fetch('GET', route?.params?.videoUrl, {})
      .then(res => {
        // console.log('response?????', res.path(res.path()));
        setVideoPath(res.path(res.path()));
        setMediaLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [route?.params?.videoUrl]);

  useEffect(() => {}, [videoPath]);

  const handleOrientation = orientation => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      setFullscreen(true);
      StatusBar.setHidden(true);
    } else {
      setFullscreen(false);
      StatusBar.setHidden(false);
    }
  };

  const handlePlayPause = () => {
    if (play) {
      setPlay(false);
      setShowControl(true);
      return;
    }
    setTimeout(() => setShowControl(false), 2000);
    setPlay(true);
  };

  const handlePlay = () => {
    setTimeout(() => setShowControl(false), 500);
    setPlay(true);
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

  const handleFullscreen = () => {
    if (fullscreen) {
      Orientation.unlockAllOrientations();
      setFullscreen(true);
    } else {
      Orientation.lockToLandscapeLeft();
      setFullscreen(false);
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

  return (
    <View style={styles.screen}>
      {Platform.OS === 'ios' && videoPath ? (
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
        <View style={styles.loaderContainer}>
          <Loader color={'#fff'} size={30} />
        </View>
      ) : (
        videoPath && (
          <View
            style={fullscreen ? styles.fullscreenContainer : styles.container}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerIconContainer}>
              <BackIconSvg color={'#fff'} height={15} width={20} />
            </TouchableOpacity>
            <Pressable onPress={handleControls}>
              <Video
                ref={videoRef}
                source={{
                  uri: videoPath,
                }}
                style={fullscreen ? styles.fullscreenVideo : styles.video}
                controls={false}
                resizeMode={'contain'}
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

                  <View
                    style={[
                      styles.bottomContainer,
                      {paddingBottom: fullscreen ? 20 : 10},
                    ]}>
                    <ProgressBar
                      currentTime={currentTime}
                      duration={duration > 0 ? duration : 0}
                      onSlideStart={handlePlayPause}
                      onSlideComplete={handlePlayPause}
                      onSlideCapture={onSeek}
                    />
                    <TouchableOpacity
                      onPress={handleFullscreen}
                      style={styles.fullscreenButton}>
                      {fullscreen ? <VideoSmallScreen /> : <VideoFullScreen />}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Pressable>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#000',
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#000',
    height: '100%',
    justifyContent: 'center',
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  video: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
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
  },
  headerIconContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    position: 'absolute',
    top: 20,
    zIndex: 1,
  },
});

export default SingleVideoScreen;

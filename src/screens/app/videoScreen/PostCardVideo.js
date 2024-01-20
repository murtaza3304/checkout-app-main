import React, {useState, useEffect} from 'react';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  AppState,
} from 'react-native';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import VideoFullScreen from '../../../assests/icons/svg/videoIcons/VideoFullScreen';

const PostCardVideo = ({
  videoUrl,
  navigation,
  isFocusedCurrentPage,
  setFocusedVideo,
  focusedVideo,
  index,
}) => {
  // console.log(
  //   isFocusedCurrentPage,
  //   setFocusedVideo,
  //   focusedVideo,
  //   index,
  //   'video data',
  // );
  const videoRef = React.createRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [currentPage, setCurrentPage] = useState(false);

  if (setFocusedVideo) {
    useEffect(() => {
      if (!isFocusedCurrentPage) {
        setFocusedVideo(null);
      }
    }, [isFocusedCurrentPage]);
  }

  useEffect(() => {
    if (
      focusedVideo == index &&
      isFocusedCurrentPage &&
      AppState.currentState == 'active' &&
      play
    ) {
      setPlay(true);
      setTimeout(() => setShowControl(false), 2000);
    } else {
      setPlay(false);
      setShowControl(true);
    }
  }, [focusedVideo, isFocusedCurrentPage, AppState.currentState]);

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
    setCurrentPage(false);
  };

  const skipBackward = () => {
    videoRef.current.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    videoRef.current.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  };

  const changeTime = time => {
    setCurrentTime(time);
  };

  useEffect(() => {}, [currentPage]);

  useEffect(() => {
    if (currentPage) {
      videoRef.current.seek(currentTime);
    }
  }, [currentTime]);

  const handleControls = () => {
    if (showControl) {
      setShowControl(false);
    } else {
      setShowControl(true);
    }
  };

  const handleFullscreen = data => {
    navigation.navigate('VideoScreen', {
      videoData: {
        videoUrl: data,
        videoTime: currentTime,
        videoDuration: duration,
        videoPlay: play,
        changeTime,
        setCurrentPage,
      },
    });
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
    <Pressable onPress={handleControls}>
      <Video
        ref={videoRef}
        source={{
          uri: videoUrl,
        }}
        style={styles.video}
        controls={false}
        resizeMode={'cover'}
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
            <TouchableOpacity
              onPress={() => handleFullscreen(videoUrl)}
              style={styles.fullscreenButton}>
              <VideoFullScreen />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
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

export default PostCardVideo;

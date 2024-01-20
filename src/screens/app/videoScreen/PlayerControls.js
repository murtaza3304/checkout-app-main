import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import VideoPause from '../../../assests/icons/svg/videoIcons/VideoPause';
import VideoPlayIcon from '../../../assests/icons/svg/videoIcons/VideoPlayIcon';
import BackForwordPlay from '../../../assests/icons/svg/videoIcons/BackForwordPlay';
import GoTowordsPlay from '../../../assests/icons/svg/videoIcons/GoTowordsPlay';

const PlayerControls = props => {
  const {playing, onPlay, onPause, skipForwards, skipBackwards} = props;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <GoTowordsPlay />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
          <VideoPause height="50" width="50" />
        ) : (
          <VideoPlayIcon height="50" width="50" />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <BackForwordPlay />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  touchable: {
    padding: 4,
  },
});

export default PlayerControls;

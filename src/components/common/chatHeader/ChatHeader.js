import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import {Button} from '../button/Button';
import {theme} from '../../../assests/theme/Theme';

export default function ChatHeader({navigation}) {
  const goBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.circle}></View>
      <View style={styles.circleTwo}></View>
      <Button
        renderIconLeft={() => (
          <BackIconSvg
            height={14}
            width={20}
            color={theme.lightColor.darkGray}
          />
        )}
        containerStyle={styles.btnStyleContainer}
        onPressHandler={goBackHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.17,
  },
  circle: {
    height: windowWidth * 1,
    width: windowWidth * 1,
    borderRadius: windowWidth * 1,
    backgroundColor: 'rgba(161, 218, 253, 0.4)',
    position: 'absolute',
    top: -(windowWidth * 0.68),
    right: -(windowWidth * 0.35),
  },
  circleTwo: {
    height: windowWidth * 1,
    width: windowWidth * 1,
    borderRadius: windowWidth * 1,
    backgroundColor: 'rgba(161, 218, 253, 0.4)',
    position: 'absolute',
    top: -(windowWidth * 0.69),
    right: -(windowWidth * 0.18),
  },
  btnStyleContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    height: 39,
    width: 39,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

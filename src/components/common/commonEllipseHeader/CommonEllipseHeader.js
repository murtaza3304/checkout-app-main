import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import {Button} from '../button/Button';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import {theme} from '../../../assests/theme/Theme';

export default function CommonEllipseHeader({bgColor, navigation}) {
  const goBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.circle}></View>
      <View style={styles.circleTwo}></View>
      <Button
        renderIconLeft={() => (
          <BackIconSvg height={14} width={20} color={theme.lightColor.gray} />
        )}
        containerStyle={styles.btnStyle}
        onPressHandler={goBackHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.28,
  },
  circle: {
    height: windowWidth * 1.4,
    width: windowWidth * 1.46,
    borderRadius: windowWidth * 1.4,
    backgroundColor: 'rgba(161, 218, 253, 0.4)',
    position: 'absolute',
    top: -(windowWidth * 1),
    right: -(windowWidth * 0.49),
  },
  circleTwo: {
    height: windowWidth * 1.4,
    width: windowWidth * 1.46,
    borderRadius: windowWidth * 1.4,
    backgroundColor: 'rgba(161, 218, 253, 0.2)',
    position: 'absolute',
    top: -(windowWidth * 0.94),
    right: -(windowWidth * 0.42),
  },
  btnStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 50,
    left: 30,
    height: 39,
    width: 39,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

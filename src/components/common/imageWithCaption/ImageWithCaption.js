import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from '../text/Text';
import {Button} from '../button/Button';
import {theme} from '../../../assests/theme/Theme';

export default function ImageWithCaption({
  height,
  width,
  title,
  btnTitle,
  imagePath,
  textAlignment,
  titleStyles,
  destTextColor,
  desTextWeight,
  desTextSize,
  desFontStyles,
  desContainer,
  backgroundColor,
  marginVertical,
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
  captionStyle,
  onPress = () => false,
  disabled = false,
  notClick = true,
}) {
  return (
    <View style={styles.container}>
      {imagePath ? (
        <Image
          source={imagePath}
          style={{height: height, width: width, marginTop: 3}}
        />
      ) : (
        false
      )}
      <TouchableOpacity
        style={[styles.textContainer, desContainer]}
        onPress={notClick ? () => onPress() : () => null}>
        {title ? (
          <Text
            children={title}
            textColor={destTextColor ? destTextColor : theme.lightColor.gray}
            weight={desTextWeight ? desTextWeight : theme.fontWeight.medium}
            size={desTextSize ? desTextSize : 15}
            style={styles.textStyles}
            textPaddingHorizontal={paddingHorizontal}
            alignText={textAlignment}
            fonts={
              desFontStyles ? desFontStyles : theme.fontFamily.TinosRegular
            }
            onPressHandler={notClick ? onPress : () => null}
          />
        ) : (
          false
        )}
        {btnTitle ? (
          <Button
            title={btnTitle}
            titleStyles={titleStyles}
            containerStyle={styles.textStylesbtn}
            onPressHandler={disabled ? () => null : onPress}
            disabled={disabled}
          />
        ) : (
          false
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyles: {
    marginVertical: 12,
  },
  textStylesbtn: {
    height: 40,
    justifyContent: 'center',
  },
});

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../text/Text';
import SuggestionIconSvg from '../../../assests/icons/svg/homeSvgs/SuggestionIconSvg';

export default function ProfileAUserCustomDropDown({
  onPressHandler = () => false,
  openMessage,
}) {
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPressHandler()}>
        <SuggestionIconSvg />
      </TouchableOpacity>
      {openMessage ? (
        <View style={styles.meggageContainer}>
          <Text
            children={
              'By verifying your account, you will earn a badge that will show your account is authentic or real. Users with a verified badge will also have full feature access'
            }
            textColor={theme.lightColor.darkGray}
            size={10}
            fonts={theme.fontFamily.TinosRegular}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 18,
    marginLeft: 8,
  },
  meggageContainer: {
    backgroundColor: theme.lightColor.white,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: theme.lightColor.headerBg,
    width: '48%',
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 7,
    position: 'absolute',
    bottom: 20,
    left: 130,
  },
});

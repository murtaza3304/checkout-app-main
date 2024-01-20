import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import {Button} from '../button/Button';
import {theme} from '../../../assests/theme/Theme';
import {CommonTextInput} from '../CommonTextInput/CommonTextInput';
import SearchIconSvg from '../../../assests/icons/svg/bottomTabSvgs/SearchIconSvg';
import {Text} from '../text/Text';
import FillterIconSvg from '../../../assests/icons/svg/homeSvgs/FillterIconSvg';

export default function SearchHeader({
  navigation,
  headerText,
  headerTextStyles,
  textSize,
  backIconContainer = false,
  placeHoldertxt,
  inputValue,
  onChangeHandle,
  showInput = true,
}) {
  const goBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.circle}></View>
      <View style={styles.circleTwo}></View>
      {backIconContainer ? (
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
      ) : (
        <Button
          renderIconLeft={() => (
            <BackIconSvg height={14} width={20} color={theme.lightColor.red} />
          )}
          containerStyle={styles.btnStyle}
          onPressHandler={goBackHandler}
        />
      )}
      {showInput && (
        <View
          style={[styles.inputContainer, {top: backIconContainer ? 110 : 100}]}>
          <View style={styles.contentInputContainer}>
            <CommonTextInput
              Value={inputValue}
              inputStyle={styles.textInputStyle}
              onChangeHandler={newText => onChangeHandle(newText)}
              placeHoldertext={placeHoldertxt ? placeHoldertxt : ''}
              placeholderColor={theme.lightColor.postInputPlaceholder}
            />
            {/* <Button
                        renderIconRight={() => <SearchIconSvg
                            height={'18px'}
                            width={'18px'}
                            color={theme.lightColor.white}
                        />}
                        containerStyle={styles.searchBtnStyle}
                        disabled={true}
                    // onPressHandler={goBackHandler}
                    /> */}
          </View>
          <View>
            <Button
              // renderIconRight={() => <FillterIconSvg />}
              containerStyle={styles.fillterBtnStyle}
              // onPressHandler={goBackHandler}
            />
          </View>
        </View>
      )}
      <View style={headerTextStyles}>
        <Text
          children={headerText}
          fonts={theme.fontFamily.TinosBold}
          textColor={theme.lightColor.darkGray}
          size={textSize}
          weight={theme.fontWeight.bold}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.26,
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
    position: 'absolute',
    top: 50,
    left: 30,
    height: 39,
    width: 39,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyleContainer: {
    position: 'absolute',
    top: 50,
    left: 30,
    height: 39,
    width: 39,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentInputContainer: {
    borderColor: theme.lightColor.postInputBg,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    width: '70%',
  },
  textInputStyle: {
    height: 42,
    width: 250,
    paddingHorizontal: 12,
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
  },
  searchBtnStyle: {
    height: 44,
    width: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.lightColor.headerBg,
    position: 'absolute',
    right: -1.6,
    top: -1,
  },
  fillterBtnStyle: {
    marginLeft: 10,
  },
});

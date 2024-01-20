import {View, StyleSheet} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import {Button} from '../button/Button';
import {theme} from '../../../assests/theme/Theme';
import {CommonTextInput} from '../CommonTextInput/CommonTextInput';
import SearchIconSvg from '../../../assests/icons/svg/bottomTabSvgs/SearchIconSvg';
import FillterIconSvg from '../../../assests/icons/svg/homeSvgs/FillterIconSvg';
import SettingIconSvg from '../../../assests/icons/svg/homeSvgs/SettingIconSvg';

export default function CTypeSearchHeader({
  navigation,
  inputValue,
  onChangeHandle,
  setModalVisible,
}) {
  const goBackHandler = () => {
    navigation.goBack();
  };
  const onGoSettingScreen = () => {
    navigation.navigate('Setting');
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.circle}></View>
      <View style={styles.circleTwo}></View>
      <View style={styles.headerBtnContainer}>
        <Button
          renderIconLeft={() => (
            <BackIconSvg
              height={14}
              width={20}
              color={theme.lightColor.darkGray}
            />
          )}
          containerStyle={styles.btnStyle}
          onPressHandler={goBackHandler}
        />
        <Button
          // renderIconLeft={() => <SettingIconSvg
          //     height={16}
          //     width={20}
          //     color={theme.lightColor.red}
          // />}
          containerStyle={styles.btnStyle}
          // onPressHandler={onGoSettingScreen}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.contentInputContainer}>
          <CommonTextInput
            Value={inputValue}
            inputStyle={styles.textInputStyle}
            onChangeHandler={newText => onChangeHandle(newText)}
            placeHoldertext={'Search'}
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
            renderIconRight={() => <FillterIconSvg />}
            containerStyle={styles.fillterBtnStyle}
            onPressHandler={() => setModalVisible(true)}
          />
        </View>
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
  headerBtnContainer: {
    position: 'absolute',
    top: 50,
    left: 26,
    height: 39,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnStyle: {
    height: 39,
    width: 39,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'absolute',
    top: 100,
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
    width: '62%',
    paddingHorizontal: 14,
  },
  textInputStyle: {
    height: 42,
    minWidth: 195,
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

import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {theme} from '../../../assests/theme/Theme';
import PasswordHideIconSvg from '../../../assests/icons/svg/homeSvgs/PasswordHideIconSvg';
import PasswordShowIconSvg from '../../../assests/icons/svg/homeSvgs/PasswordShowIconSvg';

/** TODO: This component is currently unused. Please keep it until there will decide about search for reassign and tags */

export function CommonTextInput({
  inputStyle,
  placeHoldertext,
  placeholderColor,
  Value,
  passwordIcon,
  keyboardTypeHandle,
  maxCharacter,
  editable = true,
  selectTextOnFocus = true,
  passwordHideShowHandle = () => false,
  onFocusHandler = () => false,
  inputType = false,
  multilineText = false,
  onChangeHandler = () => false,
  onSubmitHandler = () => false,
  onBlurHandler = () => false,
}) {
  // console.log(placeHoldertext, 'placeHoldertext');
  return (
    <View>
      <TextInput
        placeholder={placeHoldertext ? placeHoldertext : ''}
        value={Value}
        onChangeText={txt => onChangeHandler(txt)}
        style={inputStyle}
        secureTextEntry={inputType}
        placeholderTextColor={
          placeholderColor ? placeholderColor : theme.lightColor.black
        }
        multiline={multilineText}
        onFocus={() => onFocusHandler()}
        onSubmitEditing={() => onSubmitHandler()}
        onBlur={() => onBlurHandler()}
        keyboardType={keyboardTypeHandle}
        maxLength={maxCharacter}
        editable={editable}
        selectTextOnFocus={selectTextOnFocus}
        returnKeyType="done"
      />
      {passwordIcon ? (
        <>
          <TouchableOpacity
            style={styles.placeHolderIcon}
            onPress={() => passwordHideShowHandle()}>
            {inputType ? <PasswordHideIconSvg /> : <PasswordShowIconSvg />}
          </TouchableOpacity>
        </>
      ) : (
        false
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    alignItems: 'center',
    flex: 1,
    padding: 0,
    fontSize: 16,
    lineHeight: 20,
    minHeight: 36,
  },
  placeHolderIcon: {
    position: 'absolute',
    top: 14,
    right: 16,
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {View} from 'react-native';
import React, {useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DropDownIconSvg from '../../../assests/icons/svg/homeSvgs/DropDownIconSvg';
import {theme} from '../../../assests/theme/Theme';

export default function CreatePostDropDown({
  privacyStatus,
  privacyStatusValue,
}) {
  const countries = ['public', 'private'];
  return (
    <View>
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          // console.log(selectedItem, index)
          privacyStatus(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonStyle={{
          backgroundColor: theme.lightColor.newBodyColor,
          width: '42%',
        }}
        buttonTextStyle={{
          color: theme.lightColor.dropDownColor,
          fontSize: 14,
          fontFamily: theme.fontFamily.TinosRegular,
          fontWeight: theme.fontWeight.normal,
          textAlign: 'left',
        }}
        renderDropdownIcon={() => <DropDownIconSvg />}
        statusBarTranslucent={true}
        dropdownStyle={{
          backgroundColor: theme.lightColor.white,
          borderRadius: 8,
          borderTopWidth: 1.2,
          borderWidth: 1.2,
          borderColor: theme.lightColor.headerBg,
          borderTopColor: theme.lightColor.headerBg,
          width: '25%',
        }}
        dropdownOverlayColor={'transparent'}
        rowStyle={{borderBottomWidth: 0, height: 38}}
        rowTextStyle={{
          fontSize: 15,
          textAlign: 'left',
          color: theme.lightColor.headerBg,
          fontWeight: theme.fontWeight.bold,
          fontFamily: theme.fontFamily.TinosBold,
        }}
        defaultButtonText={'Select'}
        showsVerticalScrollIndicator={false}
        selectedRowStyle={{backgroundColor: theme.lightColor.lightBlue}}
        selectedRowTextStyle={{color: theme.lightColor.white}}
        defaultValue={privacyStatusValue}
      />
    </View>
  );
}

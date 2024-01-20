import {View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DropDownIconSvg from '../../../assests/icons/svg/homeSvgs/DropDownIconSvg';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../text/Text';

export default function SelectAccountTypeDropDown({setType, setMessage}) {
  const countries = ['Seller', 'VA or Consultant', 'Supplier'];
  return (
    <View style={{width: '35%'}}>
      <Text
        children={'Account Type'}
        fonts={theme.fontFamily.TinosRegular}
        textColor={theme.lightColor.gray}
        size={14}
        style={{marginBottom: 5}}
        onPressHandler={() => setMessage(false)}
      />
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          // console.log(selectedItem, index)
          setType(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          if (index === 0) {
            setMessage(false);
          }
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonStyle={{
          backgroundColor: theme.lightColor.white,
          borderRadius: 8,
          width: '100%',
          height: 40,
        }}
        buttonTextStyle={{
          color: theme.lightColor.dropDownColor,
          fontSize: 14,
          fontFamily: theme.fontFamily.TinosRegular,
          fontWeight: theme.fontWeight.normal,
          textAlign: 'left',
        }}
        renderDropdownIcon={() => <DropDownIconSvg />}
        dropdownIconPosition="right"
        statusBarTranslucent={true}
        dropdownStyle={{
          backgroundColor: theme.lightColor.white,
          borderRadius: 8,
          borderTopWidth: 1.2,
          borderWidth: 1.2,
          borderColor: theme.lightColor.headerBg,
          borderTopColor: theme.lightColor.headerBg,
          width: '42%',
          marginTop: -20,
          marginLeft: 92,
        }}
        dropdownOverlayColor={'transparent'}
        rowStyle={{borderBottomWidth: 0, height: 38, paddingLeft: 8}}
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
      />
    </View>
  );
}

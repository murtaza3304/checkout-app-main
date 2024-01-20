import { View } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import DropDownIconSvg from '../../../assests/icons/svg/homeSvgs/DropDownIconSvg'
import { theme } from '../../../assests/theme/Theme'

export default function ECommercePlatformDropDown({ setType }) {
    const countries = ["Alibaba", "Aliexpress", "Amazon", "eBay", "Facebook", "Shopify", "BigCommerce", "WooCommerce", "Target", "Walma"]
    return (
        <View>
            <SelectDropdown
                data={countries}
                onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index)
                    setType(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                buttonStyle={{
                    backgroundColor: theme.lightColor.postInputBorder,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: theme.lightColor.postInputBg,
                    backgroundColor: theme.lightColor.postInputBorder,
                    borderRadius: 8,
                    width: '100%',
                }}
                buttonTextStyle={{ color: theme.lightColor.dropDownColor,textAlign: 'left', fontSize: 14, fontFamily: theme.fontFamily.TinosRegular, fontWeight: theme.fontWeight.normal, }}
                renderDropdownIcon={() => <DropDownIconSvg />}
                statusBarTranslucent={true}
                dropdownStyle={{ backgroundColor: theme.lightColor.white, borderRadius: 8, borderTopWidth: 1.2, borderWidth: 1.2, borderColor: theme.lightColor.headerBg, borderTopColor: theme.lightColor.headerBg, width: '86%', }}
                dropdownOverlayColor={'transparent'}
                rowStyle={{ borderBottomWidth: 0, }}
                defaultButtonText={'Select'}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

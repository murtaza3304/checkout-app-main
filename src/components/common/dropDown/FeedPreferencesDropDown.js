import { View } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import DropDownIconSvg from '../../../assests/icons/svg/homeSvgs/DropDownIconSvg'
import { theme } from '../../../assests/theme/Theme'

export default function FeedPreferencesDropDown() {
    const countries = ["#Hashtag1", "#Hashtag2", "#Hashtag3", "#Hashtag4"]
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <SelectDropdown
                data={countries}
                onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index)
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
                    backgroundColor: '#69C3F91A',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#69C3F966',
                    borderRadius: 8,
                    width: '70%',
                }}
                buttonTextStyle={{ color: theme.lightColor.dropDownColor, fontSize: 14, fontFamily: theme.fontFamily.TinosRegular, fontWeight: theme.fontWeight.normal, marginRight: 120 }}
                renderDropdownIcon={() => <DropDownIconSvg />}
                statusBarTranslucent={true}
                dropdownStyle={{ backgroundColor: theme.lightColor.white, borderRadius: 8, borderTopWidth: 1.2, borderWidth: 1.2, borderColor: theme.lightColor.headerBg, borderTopColor: theme.lightColor.headerBg, width: '60%', }}
                dropdownOverlayColor={'transparent'}
                rowStyle={{ borderBottomWidth: 0, }}
                defaultButtonText={'#Hashtag'}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

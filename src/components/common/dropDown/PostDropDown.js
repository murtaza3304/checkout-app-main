import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { theme } from '../../../assests/theme/Theme'
import { windowHeight } from '../../../utils/Dimentions'
import NewMenuIcon from '../../../assests/icons/svg/homeSvgs/NewMenuIcon'
import { Text } from '../text/Text'
import ShareLeftIconSvg from '../../../assests/icons/svg/homeSvgs/ShareLeftIconSvg'
import ReportLeftIconSvg from '../../../assests/icons/svg/homeSvgs/ReportLeftIconSvg'

export default function PostDropDown() {
    const countries = ["Share", "Report"]
    return (
        <View>
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
                buttonStyle={{ backgroundColor: theme.lightColor.white, height: 40, width: 40, }}
                statusBarTranslucent={true}
                dropdownStyle={{
                    backgroundColor: theme.lightColor.white,
                    borderRadius: 8,
                    borderTopWidth: 1.2,
                    borderWidth: 1.2,
                    borderColor: theme.lightColor.headerBg,
                    borderTopColor: theme.lightColor.headerBg,
                    marginTop: windowHeight * -0.17,
                    marginLeft: windowHeight * -0.124,
                    width: '35%',
                }}
                rowStyle={{ borderBottomWidth: 0, }}
                renderDropdownIcon={() => <NewMenuIcon width={17} />}
                showsVerticalScrollIndicator={false}
                renderCustomizedRowChild={(items, index) => (
                    <>
                        {
                            index == 0 ?
                                <View style={styles.btnContainer}>
                                    <ShareLeftIconSvg
                                        height={20}
                                    />
                                    <Text
                                        children={'Share'}
                                        textColor={theme.lightColor.black}
                                        fonts={theme.fontFamily.TinosBold}
                                        size={16}
                                        style={{ marginLeft: 5 }}
                                    />
                                </View>
                                :
                                <TouchableOpacity style={styles.btnContainer}>
                                    <ReportLeftIconSvg
                                        height={20}
                                    />
                                    <Text
                                        children={'Report'}
                                        textColor={theme.lightColor.black}
                                        fonts={theme.fontFamily.TinosBold}
                                        size={16}
                                        style={{ marginLeft: 3 }}
                                    />
                                    {/* <BottomSheet sheetId={'bottomTabs'} /> */}
                                </TouchableOpacity>
                        }
                    </>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
    },
})
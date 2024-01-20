import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../../../assests/theme/Theme'
import SuggestionIconSvg from '../../../assests/icons/svg/homeSvgs/SuggestionIconSvg'

export default function CustomDropDown({
    onPressHandler = () => false,
    openMessage,
}) {
    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => onPressHandler()}>
                <SuggestionIconSvg />
            </TouchableOpacity>
            {
                openMessage ?
                    <View style={styles.meggageContainer}>
                        <Text
                            style={{
                                color: theme.lightColor.black,
                                fontSize: 11,
                                fontFamily: theme.fontFamily.TinosBold,
                                fontWeight: theme.fontWeight.bold,
                                marginBottom: 4
                            }}
                        >
                            Seller - <Text
                                style={{
                                    color: theme.lightColor.darkGray,
                                    fontSize: 10,
                                    fontFamily: theme.fontFamily.TinosRegular,
                                    marginBottom: 4,
                                    textAlign: 'justify'
                                }}
                            >
                                If you are selling or will sell products online.
                            </Text>
                        </Text>
                        <Text
                            style={{
                                color: theme.lightColor.black,
                                fontSize: 11,
                                fontFamily: theme.fontFamily.TinosBold,
                                fontWeight: theme.fontWeight.bold,
                                marginBottom: 4
                            }}
                        >
                            Virtual Assistant (VA)/Consultant - <Text
                                style={{
                                    color: theme.lightColor.darkGray,
                                    fontSize: 10,
                                    fontFamily: theme.fontFamily.TinosRegular,
                                    marginBottom: 4,
                                    textAlign: 'justify'
                                }}
                            >
                                If you are providing service and support to online sellers.
                            </Text>
                        </Text>
                        <Text
                            style={{
                                color: theme.lightColor.black,
                                fontSize: 11,
                                fontFamily: theme.fontFamily.TinosBold,
                                fontWeight: theme.fontWeight.bold,
                                marginBottom: 4
                            }}
                        >
                            Supplier - <Text
                                style={{
                                    color: theme.lightColor.darkGray,
                                    fontSize: 10,
                                    fontFamily: theme.fontFamily.TinosRegular,
                                    marginBottom: 4,
                                    textAlign: 'justify'
                                }}
                            >
                                If you are a distributor, wholesaler, or manufacturer of products or tools.
                            </Text>
                        </Text>


                    </View>
                    :
                    <></>
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 18,
        marginLeft: 8,
        marginTop: 24
    },
    meggageContainer: {
        backgroundColor: theme.lightColor.white,
        borderRadius: 8,
        borderWidth: 1.2,
        borderColor: theme.lightColor.headerBg,
        width: '50%',
        paddingHorizontal: 10,
        paddingTop: 6,
        paddingBottom: 8,
        position: 'absolute',
        top: 53.5,
        left: 120,
        zIndex: 1
    }
})
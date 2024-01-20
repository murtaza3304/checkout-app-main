import { View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../../../assests/theme/Theme'
import { Button } from '../button/Button'
import { Text } from '../text/Text'
import TrueIconSvg from '../../../assests/icons/svg/homeSvgs/TrueIconSvg'

export default function CommonReCaptcha({
    captchaIconShowHandler,
    isFocusedReCaptcha,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.btnTextContainer}>
                {
                    isFocusedReCaptcha ?
                        <Button
                            containerStyle={styles.btnContainer}
                            renderIconLeft={() => <TrueIconSvg
                                color={theme.lightColor.headerBg}
                            />}
                            onPressHandler={captchaIconShowHandler}
                        />
                        :
                        <Button
                            containerStyle={styles.btnContainer}
                            onPressHandler={captchaIconShowHandler}
                        />
                }
                <Text
                    children={`I'am not a robot`}
                    textColor={theme.lightColor.black}
                    size={14}
                    fonts={theme.fontFamily.TinosRegular}
                    weight={theme.fontWeight.normal}
                    style={styles.textBox}
                    onPressHandler={captchaIconShowHandler}
                />
            </View>
            <View>
                <Image
                    source={require('../../../assests/images/reCaptcha.png')}
                    style={styles.img}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: theme.lightColor.headerBg,
        // paddingHorizontal: 10,
        // paddingVertical: 6,
        // backgroundColor: theme.lightColor.skyActionBlue,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderRadius: 5
    },
    btnContainer: {
        backgroundColor: theme.lightColor.skyActionBlue,
        borderWidth: 1,
        borderColor: theme.lightColor.headerBg,
        height: 22,
        width: 22,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBox: {
        marginLeft: 14
    },
    img: {
        height: 32,
        width: 32,
    }
})
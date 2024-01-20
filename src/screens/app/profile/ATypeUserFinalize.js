import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar'
import ProfileHeader from '../../../components/common/profileHeader/ProfileHeader'
import { theme } from '../../../assests/theme/Theme'
import { Text } from '../../../components/common/text/Text'
import RadioButton from '../../../components/common/radioButton/RadioButton'
import { Button } from '../../../components/common/button/Button'
import UseProfileAUserHooks from "../../../components/customHooks/UseProfileAUserHooks";

export default function ATypeUserFinalize({ navigation }) {
    const onGoHomeScreen = () => {
        navigation.navigate('Home')
    }

    // states
    const {
        isFocusedOne,
        isFocusedOneHandler,
        isFocusedTwo,
        isFocusedTwoHandler,
        isFocusedThree,
        isFocusedThreeHandler,
    } = UseProfileAUserHooks();
    return (
        <View style={styles.screen}>
            <FocusAwareStatusBar
                barStyle={'light-content'}
                translucent={true}
                backgroundColor={'transparent'}
            />
            <ProfileHeader
                navigation={navigation}
                chatRenderIcon={true}
                profileHeadingTxt={'jeniva Moana'}
                profileSecondHeadingTxt={'Consultant'}
                desContainer={true}
            />
            <View style={styles.mainContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View style={styles.headingMainContainer}>
                        <Text
                            children={'Business names'}
                            fonts={theme.fontFamily.TinosBold}
                            textColor={theme.lightColor.darkGray}
                            size={17}
                            style={{ marginBottom: 5 }}
                        />
                        <View style={styles.desContainer}>
                            <RadioButton onPressHandler={isFocusedOneHandler} isFocusedColor={isFocusedOne} />
                            <Text
                                children={'Agency ABC or None'}
                                fonts={theme.fontFamily.TinosRegular}
                                textColor={theme.lightColor.gray}
                                size={15.8}
                                style={{ marginLeft: 10, }}
                                onPressHandler={isFocusedOneHandler}
                            />
                        </View>
                        <Text
                            children={'Business websites'}
                            fonts={theme.fontFamily.TinosBold}
                            textColor={theme.lightColor.darkGray}
                            size={17}
                            style={{ marginBottom: 5 }}
                        />
                        <View style={styles.desContainer}>
                            <RadioButton onPressHandler={isFocusedTwoHandler} isFocusedColor={isFocusedTwo} />
                            <Text
                                children={'www.abc.com'}
                                fonts={theme.fontFamily.TinosRegular}
                                textColor={theme.lightColor.gray}
                                size={15.8}
                                style={{ marginLeft: 10 }}
                                onPressHandler={isFocusedTwoHandler}
                            />
                        </View>
                        <Text
                            children={'E-Commerce Platform'}
                            fonts={theme.fontFamily.TinosBold}
                            textColor={theme.lightColor.darkGray}
                            size={17}
                            style={{ marginBottom: 5 }}
                        />
                        <View style={styles.desContainer}>
                            <RadioButton onPressHandler={isFocusedThreeHandler} isFocusedColor={isFocusedThree} />
                            <Text
                                children={'SaaS ecommerce platform'}
                                fonts={theme.fontFamily.TinosRegular}
                                textColor={theme.lightColor.gray}
                                size={15.8}
                                style={{ marginLeft: 10 }}
                                onPressHandler={isFocusedThreeHandler}
                            />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <Button
                            title={'Save'}
                            onPressHandler={onGoHomeScreen}
                            titleStyles={styles.titleStyles}
                            containerStyle={styles.containerStyle}
                            linearGradient={true}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.lightColor.bodyColor,
    },
    mainContainer: {
        flex: 1,
        marginTop: '33%',
    },
    headingMainContainer: {
        paddingHorizontal: 60,
    },
    desContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    titleStyles: {
        color: theme.lightColor.white,
        fontSize: 16,
        fontFamily: theme.fontFamily.TinosRegular,
        fontWeight: theme.fontWeight.normal
    },
    containerStyle: {
        backgroundColor: theme?.lightColor?.linearRed,
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        width: '100%',
        borderRadius: 8
    },
    btnContainer: {
        paddingHorizontal: 25,
        marginTop: 60
    }
})
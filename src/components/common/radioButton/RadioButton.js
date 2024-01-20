import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

export default function RadioButton({
    onPressHandler = () => false,
    isFocusedColor,

}) {
    
    return (
        <Pressable onPress={() => onPressHandler()}>
            <LinearGradient colors={['#E3E5E7', '#B1B8BD']} style={styles.mainContainer}>
                {
                    isFocusedColor ?
                        <LinearGradient colors={['#69C3F9', '#0570B0']} style={styles.fillColorContainer}></LinearGradient>
                        :
                        false
                }
            </LinearGradient>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 50,
        height: 14,
        width: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fillColorContainer: {
        borderRadius: 50,
        height: 8.5,
        width: 8.5
    }
})
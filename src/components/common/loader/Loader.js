import React from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';


export function Loader({ size, style, color }) {
    return (
        <ActivityIndicator style={style} size={size} color={color ? color : '#a7b5c4'} />
    );
}
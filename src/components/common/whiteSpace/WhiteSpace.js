import React from 'react';
import { View } from 'react-native';


export function WhiteSpace({ height, width = 'auto', style }) {
    return <View style={[{ width: width, height: height }, style]} />;
}
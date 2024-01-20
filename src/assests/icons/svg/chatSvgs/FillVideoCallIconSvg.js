import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const FillVideoCallIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "24px";
    const defaultHeight = height ? height : "18px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4373 3.41394L20.072 6.29273V3.41394C20.072 1.82403 18.647 0.535156 16.8893 0.535156H4.15862C2.40088 0.535156 0.975952 1.82403 0.975952 3.41394V14.9291C0.975952 16.519 2.40088 17.8079 4.15862 17.8079H16.8893C18.647 17.8079 20.072 16.519 20.072 14.9291V12.0503L26.4373 14.9291V3.41394Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default FillVideoCallIconSvg;
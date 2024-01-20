import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const AnalyticsIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 4.5H4.5V1.5H5.5M5.5 6.5H4.5V5.5H5.5M9 0H1C0.45 0 0 0.45 0 1V10L2 8H9C9.55 8 10 7.55 10 7V1C10 0.45 9.55 0 9 0Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default AnalyticsIconSvg;
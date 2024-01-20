import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const PrivacyIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 6H8C7.735 8.24182 6.36 10.2436 4.5 10.8655V6H1V2.89091L4.5 1.19455M4.5 0L0 2.18182V5.45455C0 8.48182 1.92 11.3073 4.5 12C7.08 11.3073 9 8.48182 9 5.45455V2.18182L4.5 0Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default PrivacyIconSvg;
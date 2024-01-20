import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const SettingReportIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "11px";
    const defaultHeight = height ? height : "11px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.11111 6.11111H4.88889V2.44444H6.11111M4.88889 7.33333H6.11111V8.55556H4.88889M7.77944 0H3.22056L0 3.22056V7.77944L3.22056 11H7.77944L11 7.77944V3.22056L7.77944 0Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default SettingReportIconSvg;
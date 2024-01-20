import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const HomeIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : 'red';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.8 19V12.2941H13.2V19H18.7V10.0588H22L11 0L0 10.0588H3.3V19H8.8Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default HomeIconSvg;
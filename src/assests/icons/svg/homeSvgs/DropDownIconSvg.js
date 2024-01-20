import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const DropDownIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "8px";
    const defaultHeight = height ? height : "4px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#4FA9E3';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L4 4L8 0H0Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default DropDownIconSvg;
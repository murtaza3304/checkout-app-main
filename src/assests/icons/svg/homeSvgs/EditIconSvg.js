import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const EditIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "8px";
    const defaultHeight = height ? height : "4px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#4FA9E3';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0001 3.90244L16.0977 0L13.3936 2.70407L17.296 6.60651L20.0001 3.90244Z" fill="${defaultColor}"/>
                <path d="M4 16L8.2927 15.6098L15.6797 8.22279L11.7772 4.32031L4.39024 11.7073L4 16Z" fill="${defaultColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 20H0V18H13V20Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default EditIconSvg;
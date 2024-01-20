import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const ArrowSplash = ({ height, width, color }) => {
    const defaultWidth = width ? width : "20px";
    const defaultHeight = height ? height : "20px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#F32700';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.6012e-07 6.73684L5.88953e-07 5.26316L19.1789 5.26316L15.0849 1.05263L16.117 4.39364e-07L22 6L16.117 12L15.0849 10.9474L19.1789 6.73684L4.6012e-07 6.73684Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default ArrowSplash;
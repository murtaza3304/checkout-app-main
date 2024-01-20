import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const ShareLeftIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.02734 2.68659V0.148926L12.8215 4.58984L8.02734 9.03075V6.42964C4.60294 6.42964 2.20585 7.44471 0.493652 9.66516C1.17853 6.49308 3.23317 3.321 8.02734 2.68659ZM12.1366 2.05217V0.148926L16.9308 4.58984L12.1366 9.03075V7.1275L14.8761 4.58984L12.1366 2.05217Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default ShareLeftIconSvg;
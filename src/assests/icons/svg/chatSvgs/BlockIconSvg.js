import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const BlockIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "13px";
    const defaultHeight = height ? height : "13px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#FFFFFF';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 0C10.075 0 13 2.925 13 6.5C13 10.075 10.075 13 6.5 13C2.925 13 0 10.075 0 6.5C0 2.925 2.925 0 6.5 0ZM6.5 1.3C5.265 1.3 4.16 1.69 3.315 2.405L10.595 9.685C11.245 8.775 11.7 7.67 11.7 6.5C11.7 3.64 9.36 1.3 6.5 1.3ZM9.685 10.595L2.405 3.315C1.69 4.16 1.3 5.265 1.3 6.5C1.3 9.36 3.64 11.7 6.5 11.7C7.735 11.7 8.84 11.31 9.685 10.595Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default BlockIconSvg;
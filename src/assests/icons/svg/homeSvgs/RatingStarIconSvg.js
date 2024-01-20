import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const RatingStarIconSvg = ({ height, width, color, iconStyle }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#F0BF0F';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.54093 8.77465L8.9146 10.918L8.01932 6.87836L10.9999 4.16035L7.07491 3.80407L5.54093 0L4.00694 3.80407L0.0819092 4.16035L3.05707 6.87836L2.16725 10.918L5.54093 8.77465Z" fill="${defaultColor}"/>
            </svg>
            `}
            style={iconStyle}
        />
    );
};

export default RatingStarIconSvg;
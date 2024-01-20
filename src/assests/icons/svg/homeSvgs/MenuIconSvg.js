import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const MenuIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#81848C';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 19C2 20.1 2.9 21 4 21C5.1 21 6 20.1 6 19C6 17.9 5.1 17 4 17C2.9 17 2 17.9 2 19Z" fill="${defaultColor}"/>
                <path d="M2 5C2 6.1 2.9 7 4 7C5.1 7 6 6.1 6 5C6 3.9 5.1 3 4 3C2.9 3 2 3.9 2 5Z" fill="${defaultColor}"/>
                <path d="M2 12C2 13.1 2.9 14 4 14C5.1 14 6 13.1 6 12C6 10.9 5.1 10 4 10C2.9 10 2 10.9 2 12Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default MenuIconSvg;
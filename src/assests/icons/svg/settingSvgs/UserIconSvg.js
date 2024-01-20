import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const UserIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0C6.22935 0 6.92882 0.289731 7.44454 0.805456C7.96027 1.32118 8.25 2.02065 8.25 2.75C8.25 3.47935 7.96027 4.17882 7.44454 4.69454C6.92882 5.21027 6.22935 5.5 5.5 5.5C4.77065 5.5 4.07118 5.21027 3.55546 4.69454C3.03973 4.17882 2.75 3.47935 2.75 2.75C2.75 2.02065 3.03973 1.32118 3.55546 0.805456C4.07118 0.289731 4.77065 0 5.5 0ZM5.5 6.875C8.53875 6.875 11 8.10563 11 9.625V11H0V9.625C0 8.10563 2.46125 6.875 5.5 6.875Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default UserIconSvg;
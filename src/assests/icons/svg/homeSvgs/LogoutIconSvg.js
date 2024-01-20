import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const LogoutIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#EA3A18';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1111 12V9.6H4.66667V6.4H10.1111V4L14 8L10.1111 12ZM8.55556 0C8.96811 0 9.36378 0.168571 9.6555 0.468629C9.94722 0.768687 10.1111 1.17565 10.1111 1.6V3.2H8.55556V1.6H1.55556V14.4H8.55556V12.8H10.1111V14.4C10.1111 14.8243 9.94722 15.2313 9.6555 15.5314C9.36378 15.8314 8.96811 16 8.55556 16H1.55556C1.143 16 0.747335 15.8314 0.455612 15.5314C0.163888 15.2313 0 14.8243 0 14.4V1.6C0 1.17565 0.163888 0.768687 0.455612 0.468629C0.747335 0.168571 1.143 0 1.55556 0H8.55556Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default LogoutIconSvg;
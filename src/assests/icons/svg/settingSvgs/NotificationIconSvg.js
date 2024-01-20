import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const NotificationIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8.90476V9.42857H0V8.90476L1.11111 7.85714V4.71429C1.11111 3.09048 2.23889 1.66048 3.88889 1.19952C3.88889 1.14714 3.88889 1.1 3.88889 1.04762C3.88889 0.769773 4.00595 0.503307 4.21433 0.30684C4.4227 0.110374 4.70532 0 5 0C5.29469 0 5.5773 0.110374 5.78567 0.30684C5.99405 0.503307 6.11111 0.769773 6.11111 1.04762C6.11111 1.1 6.11111 1.14714 6.11111 1.19952C7.76111 1.66048 8.88889 3.09048 8.88889 4.71429V7.85714L10 8.90476ZM6.11111 9.95238C6.11111 10.2302 5.99405 10.4967 5.78567 10.6932C5.5773 10.8896 5.29469 11 5 11C4.70532 11 4.4227 10.8896 4.21433 10.6932C4.00595 10.4967 3.88889 10.2302 3.88889 9.95238" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default NotificationIconSvg;
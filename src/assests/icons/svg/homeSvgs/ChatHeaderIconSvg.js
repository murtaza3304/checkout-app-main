import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const ChatHeaderIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#fff';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3 0C15.7509 0 16.1833 0.179107 16.5021 0.497918C16.8209 0.81673 17 1.24913 17 1.7V11.9C17 12.3509 16.8209 12.7833 16.5021 13.1021C16.1833 13.4209 15.7509 13.6 15.3 13.6H3.4L0 17V1.7C0 0.7565 0.765 0 1.7 0H15.3ZM1.7 1.7V12.8945L2.6945 11.9H15.3V1.7H1.7ZM3.4 4.25H13.6V5.95H3.4V4.25ZM3.4 7.65H11.05V9.35H3.4V7.65Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default ChatHeaderIconSvg;
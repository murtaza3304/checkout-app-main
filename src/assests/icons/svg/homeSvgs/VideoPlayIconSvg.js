import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const VideoPlayIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#000000';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26" cy="26" r="26" fill="white"/>
                <path d="M39.4199 25.5809L20.1296 39.4196L20.1296 11.7422L39.4199 25.5809Z" fill="${defaultColor}"/>
            </svg>

            `}
        />
    );
};

export default VideoPlayIconSvg;
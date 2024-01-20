import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { theme } from '../../../theme/Theme';
// import { lightThemeColors } from '../../../../themes';

const VideoIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "18px";
    const defaultHeight = height ? height : "12px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : theme.lightColor.darkGray;
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4.5V1C14 0.734784 13.8946 0.48043 13.7071 0.292893C13.5196 0.105357 13.2652 0 13 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H13C13.2652 12 13.5196 11.8946 13.7071 11.7071C13.8946 11.5196 14 11.2652 14 11V7.5L18 11.5V0.5L14 4.5Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default VideoIconSvg;
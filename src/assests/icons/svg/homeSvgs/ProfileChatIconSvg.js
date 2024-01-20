import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const ProfileChatIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#4E4D4D';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7 0C12.0448 0 12.3754 0.136964 12.6192 0.380761C12.863 0.624558 13 0.955218 13 1.3V9.1C13 9.44478 12.863 9.77544 12.6192 10.0192C12.3754 10.263 12.0448 10.4 11.7 10.4H2.6L0 13V1.3C0 0.5785 0.585 0 1.3 0H11.7ZM1.3 1.3V9.8605L2.0605 9.1H11.7V1.3H1.3ZM2.6 3.25H10.4V4.55H2.6V3.25ZM2.6 5.85H8.45V7.15H2.6V5.85Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default ProfileChatIconSvg;
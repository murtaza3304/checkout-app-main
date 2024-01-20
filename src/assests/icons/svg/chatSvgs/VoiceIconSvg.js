import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const VoiceIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "27px";
    const defaultHeight = height ? height : "27px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#C1C0C8';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.575 11.4375C19.575 14.8406 16.8413 17.625 13.5 17.625C10.1588 17.625 7.425 14.8406 7.425 11.4375V7.3125C7.425 3.90937 10.1588 1.125 13.5 1.125C16.8413 1.125 19.575 3.90937 19.575 7.3125V11.4375ZM22.6125 10.4062C23.22 10.4062 23.625 10.8188 23.625 11.4375C23.625 16.8 19.575 21.1313 14.5125 21.6469V23.8125H18.5625C19.17 23.8125 19.575 24.225 19.575 24.8438C19.575 25.4625 19.17 25.875 18.5625 25.875H8.4375C7.83 25.875 7.425 25.4625 7.425 24.8438C7.425 24.225 7.83 23.8125 8.4375 23.8125H12.4875V21.6469C7.425 21.1313 3.375 16.8 3.375 11.4375C3.375 10.8188 3.78 10.4062 4.3875 10.4062C4.995 10.4062 5.4 10.8188 5.4 11.4375C5.4 15.975 9.045 19.6875 13.5 19.6875C17.955 19.6875 21.6 15.975 21.6 11.4375C21.6 10.8188 22.005 10.4062 22.6125 10.4062Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default VoiceIconSvg;
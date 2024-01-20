import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const TrueIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "16px";
    const defaultHeight = height ? height : "16px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.625 5.54203L7.12501 15.042L2.77084 10.6879L3.88709 9.57161L7.12501 12.8016L15.5088 4.42578L16.625 5.54203Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default TrueIconSvg;
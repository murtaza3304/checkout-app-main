import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { theme } from '../../../theme/Theme';
// import { lightThemeColors } from '../../../../themes';

const PhotosIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "16px";
    const defaultHeight = height ? height : "16px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : theme.lightColor.darkGray;
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.88889 9.33333L7.11111 12L10.2222 8L14.2222 13.3333H1.77778M16 14.2222V1.77778C16 0.791111 15.2 0 14.2222 0H1.77778C1.30628 0 0.854097 0.187301 0.520699 0.520699C0.187301 0.854097 0 1.30628 0 1.77778V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default PhotosIconSvg;
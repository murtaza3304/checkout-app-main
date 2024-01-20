import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const BlankLikeIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#81848C';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.45455 7.2V18H0V7.2H3.45455ZM6.90909 18C6.45099 18 6.01165 17.8104 5.68772 17.4728C5.3638 17.1352 5.18182 16.6774 5.18182 16.2V7.2C5.18182 6.705 5.37182 6.255 5.69136 5.931L11.3741 0L12.2895 0.954C12.5227 1.197 12.6695 1.53 12.6695 1.899L12.6436 2.187L11.8232 6.3H17.2727C18.2314 6.3 19 7.11 19 8.1V9.9C19 10.134 18.9568 10.35 18.8791 10.557L16.2709 16.902C16.0118 17.55 15.3986 18 14.6818 18H6.90909ZM6.90909 16.2H14.7077L17.2727 9.9V8.1H9.68136L10.6573 3.312L6.90909 7.227V16.2Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default BlankLikeIconSvg;
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const SendMessageIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "29px";
    const defaultHeight = height ? height : "27px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6228 24.9276C17.1633 24.9274 16.7433 24.6849 16.5372 24.3008L12.9391 17.5665C12.7414 17.1957 12.7747 16.7538 13.0259 16.4126L18.8357 9.05149L10.9658 14.4835C10.6014 14.7185 10.1292 14.7496 9.73324 14.5647L2.53116 11.1992C2.10053 10.9962 1.83938 10.5739 1.86599 10.1235C1.8926 9.67315 2.20192 9.28031 2.65384 9.12293L25.6906 1.18162C26.1343 1.02825 26.6329 1.13044 26.9674 1.44332C27.3019 1.7562 27.4111 2.22255 27.2472 2.6376L18.7581 24.1861C18.5911 24.6103 18.1702 24.901 17.6876 24.9254L17.6228 24.9276Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default SendMessageIconSvg;
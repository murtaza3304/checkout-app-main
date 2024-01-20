import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const FillCallIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "22px";
    const defaultHeight = height ? height : "26px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2216 15.3707L14.8128 17.657L8.66273 11.7334L11.0365 9.41326C11.3301 9.12558 11.4141 8.69553 11.2491 8.32476L8.77729 2.76793C8.57533 2.31502 8.0593 2.07306 7.56462 2.19933L3.02354 3.35443C2.55623 3.47089 2.23514 3.8838 2.25053 4.3485C2.53934 9.43203 4.73381 14.2419 8.42639 17.8847C12.2097 21.4418 17.2049 23.5552 22.4841 23.8322C22.9666 23.847 23.3952 23.5377 23.5162 23.0876L24.7154 18.7137C24.8465 18.2373 24.5953 17.7402 24.1251 17.5457L18.3559 15.1649C17.9696 15.0044 17.5208 15.0859 17.2216 15.3707Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default FillCallIconSvg;
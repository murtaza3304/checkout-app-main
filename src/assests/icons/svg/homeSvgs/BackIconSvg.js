import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const BackIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#4E4D4D';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8947 7.89474C19.5052 7.89474 20 8.38958 20 9C20 9.61042 19.5052 10.1053 18.8947 10.1053H4.32845L9.82083 15.6276C10.2568 16.066 10.2553 16.7746 9.81752 17.2112C9.38022 17.6472 8.67257 17.6472 8.23527 17.2112L0 9L8.23527 0.788812C8.67257 0.35279 9.38022 0.352791 9.81752 0.788814C10.2553 1.22535 10.2568 1.93402 9.82083 2.37239L4.32845 7.89474H18.8947Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default BackIconSvg;
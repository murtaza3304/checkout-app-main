import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const FillLikeIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 7.2C18 6.312 17.2636 5.6 16.3636 5.6H11.1927L11.9782 1.944C11.9945 1.864 12.0027 1.776 12.0027 1.688C12.0027 1.36 11.8636 1.056 11.6427 0.84L10.7755 0L5.39182 5.264C5.08909 5.56 4.90909 5.96 4.90909 6.4V14.4C4.90909 14.8243 5.08149 15.2313 5.38837 15.5314C5.69525 15.8314 6.11146 16 6.54545 16H13.9091C14.5882 16 15.1691 15.6 15.4145 15.024L17.8855 9.384C17.9591 9.2 18 9.008 18 8.8V7.2ZM0 16H3.27273V6.4H0V16Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default FillLikeIconSvg;
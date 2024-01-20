import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const SuggestionIconSvg = ({ height, width, color, iconStyle }) => {
    const defaultWidth = width ? width : "17px";
    const defaultHeight = height ? height : "17px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.65 13.6H9.35V11.9H7.65V13.6ZM8.5 0C7.38376 0 6.27846 0.219859 5.24719 0.647024C4.21592 1.07419 3.27889 1.70029 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0ZM8.5 15.3C4.7515 15.3 1.7 12.2485 1.7 8.5C1.7 4.7515 4.7515 1.7 8.5 1.7C12.2485 1.7 15.3 4.7515 15.3 8.5C15.3 12.2485 12.2485 15.3 8.5 15.3ZM8.5 3.4C7.59826 3.4 6.73346 3.75821 6.09584 4.39584C5.45821 5.03346 5.1 5.89826 5.1 6.8H6.8C6.8 6.34913 6.97911 5.91673 7.29792 5.59792C7.61673 5.27911 8.04913 5.1 8.5 5.1C8.95087 5.1 9.38327 5.27911 9.70208 5.59792C10.0209 5.91673 10.2 6.34913 10.2 6.8C10.2 8.5 7.65 8.2875 7.65 11.05H9.35C9.35 9.1375 11.9 8.925 11.9 6.8C11.9 5.89826 11.5418 5.03346 10.9042 4.39584C10.2665 3.75821 9.40174 3.4 8.5 3.4Z" fill="${defaultColor}"/>
            </svg>
            `}
            style={iconStyle}
        />
    );
};

export default SuggestionIconSvg;
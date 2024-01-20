import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const PostShareIconSvg = ({ height, width, color, iconStyle }) => {
    const defaultWidth = width ? width : "17px";
    const defaultHeight = height ? height : "17px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#81848C';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1146 12.0221C13.439 12.0221 12.8346 12.2783 12.3724 12.6796L6.03458 9.13611C6.07903 8.93973 6.11458 8.74335 6.11458 8.53842C6.11458 8.3335 6.07903 8.13712 6.03458 7.94073L12.3013 4.43144C12.7812 4.85836 13.4124 5.12305 14.1146 5.12305C14.8218 5.12305 15.5001 4.85318 16.0002 4.3728C16.5003 3.89242 16.7812 3.24089 16.7812 2.56153C16.7812 1.88217 16.5003 1.23063 16.0002 0.750254C15.5001 0.269874 14.8218 0 14.1146 0C13.4073 0 12.7291 0.269874 12.229 0.750254C11.7289 1.23063 11.4479 1.88217 11.4479 2.56153C11.4479 2.76645 11.4835 2.96283 11.5279 3.15922L5.26125 6.66851C4.78125 6.24159 4.15014 5.9769 3.44792 5.9769C2.74067 5.9769 2.0624 6.24677 1.5623 6.72715C1.0622 7.20753 0.78125 7.85906 0.78125 8.53842C0.78125 9.21778 1.0622 9.86932 1.5623 10.3497C2.0624 10.8301 2.74067 11.0999 3.44792 11.0999C4.15014 11.0999 4.78125 10.8353 5.26125 10.4083L11.5901 13.9518C11.5457 14.1311 11.519 14.3189 11.519 14.5153C11.519 15.89 12.6835 17 14.1146 17C15.5457 17 16.7101 15.89 16.7101 14.5153C16.7101 13.8541 16.4367 13.2199 15.9499 12.7523C15.4632 12.2848 14.803 12.0221 14.1146 12.0221Z" fill="${defaultColor}"/>
            </svg>
            `}
            style={iconStyle}
        />
    );
};

export default PostShareIconSvg;
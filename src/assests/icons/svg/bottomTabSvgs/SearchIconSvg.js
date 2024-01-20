import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const SearchIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : 'red';
    return (
        <SvgXml
            xml={`
                <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.65714 0C12.2184 0 14.6747 1.01745 16.4858 2.82851C18.2968 4.63958 19.3143 7.09591 19.3143 9.65714C19.3143 12.0491 18.4377 14.248 16.9966 15.9417L17.3977 16.3429H18.5714L26 23.7714L23.7714 26L16.3429 18.5714V17.3977L15.9417 16.9966C14.248 18.4377 12.0491 19.3143 9.65714 19.3143C7.09591 19.3143 4.63958 18.2968 2.82851 16.4858C1.01745 14.6747 0 12.2184 0 9.65714C0 7.09591 1.01745 4.63958 2.82851 2.82851C4.63958 1.01745 7.09591 0 9.65714 0ZM9.65714 2.97143C5.94286 2.97143 2.97143 5.94286 2.97143 9.65714C2.97143 13.3714 5.94286 16.3429 9.65714 16.3429C13.3714 16.3429 16.3429 13.3714 16.3429 9.65714C16.3429 5.94286 13.3714 2.97143 9.65714 2.97143Z" fill="${defaultColor}"/>
                </svg>
            `}
        />
    );
};

export default SearchIconSvg;
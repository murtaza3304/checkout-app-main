import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const BellIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : 'red';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 21.8571V23.1429H0V21.8571L2.55556 19.2857V11.5714C2.55556 7.58571 5.14944 4.07571 8.94444 2.94429C8.94444 2.81571 8.94444 2.7 8.94444 2.57143C8.94444 1.88944 9.21369 1.23539 9.69295 0.753154C10.1722 0.270917 10.8222 0 11.5 0C12.1778 0 12.8278 0.270917 13.3071 0.753154C13.7863 1.23539 14.0556 1.88944 14.0556 2.57143C14.0556 2.7 14.0556 2.81571 14.0556 2.94429C17.8506 4.07571 20.4444 7.58571 20.4444 11.5714V19.2857L23 21.8571ZM14.0556 24.4286C14.0556 25.1106 13.7863 25.7646 13.3071 26.2468C12.8278 26.7291 12.1778 27 11.5 27C10.8222 27 10.1722 26.7291 9.69295 26.2468C9.21369 25.7646 8.94444 25.1106 8.94444 24.4286" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default BellIconSvg;
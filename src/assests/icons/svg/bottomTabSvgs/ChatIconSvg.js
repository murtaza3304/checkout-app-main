import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const ChatIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : 'red';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 7.95455V18.1818C23 19.4318 21.965 20.4545 20.7 20.4545H4.6L0 25V4.54545C0 3.29545 1.035 2.27273 2.3 2.27273H13.915C13.8 2.61364 13.8 3.06818 13.8 3.40909C13.8 6.59091 16.33 9.09091 19.55 9.09091C20.815 9.09091 22.08 8.63636 23 7.95455ZM16.1 3.40909C16.1 5.34091 17.595 6.81818 19.55 6.81818C21.505 6.81818 23 5.34091 23 3.40909C23 1.47727 21.505 0 19.55 0C17.595 0 16.1 1.47727 16.1 3.40909Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default ChatIconSvg;
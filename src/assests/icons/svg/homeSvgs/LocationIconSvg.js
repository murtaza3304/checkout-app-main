import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const LocationIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "7px";
    const defaultHeight = height ? height : "10px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 4.75C3.16848 4.75 2.85054 4.6183 2.61612 4.38388C2.3817 4.14946 2.25 3.83152 2.25 3.5C2.25 3.16848 2.3817 2.85054 2.61612 2.61612C2.85054 2.3817 3.16848 2.25 3.5 2.25C3.83152 2.25 4.14946 2.3817 4.38388 2.61612C4.6183 2.85054 4.75 3.16848 4.75 3.5C4.75 3.66415 4.71767 3.8267 4.65485 3.97835C4.59203 4.13001 4.49996 4.26781 4.38388 4.38388C4.26781 4.49996 4.13001 4.59203 3.97835 4.65485C3.8267 4.71767 3.66415 4.75 3.5 4.75ZM3.5 0C2.57174 0 1.6815 0.368749 1.02513 1.02513C0.368749 1.6815 0 2.57174 0 3.5C0 6.125 3.5 10 3.5 10C3.5 10 7 6.125 7 3.5C7 2.57174 6.63125 1.6815 5.97487 1.02513C5.3185 0.368749 4.42826 0 3.5 0Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default LocationIconSvg;
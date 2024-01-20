import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const VideoCallIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "23px";
    const defaultHeight = height ? height : "18px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#C1C0C8';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.9593 3.25367L20.3559 6.37647V3.25367C20.3559 1.52899 18.8776 0.130859 17.0542 0.130859H3.84726C2.02376 0.130859 0.545532 1.52899 0.545532 3.25367V15.7449C0.545532 17.4696 2.02376 18.8677 3.84726 18.8677H17.0542C18.8776 18.8677 20.3559 17.4696 20.3559 15.7449V12.6221L26.9593 15.7449V3.25367Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default VideoCallIconSvg;
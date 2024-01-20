import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const CameraIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "27px";
    const defaultHeight = height ? height : "22px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#C1C0C8';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2467 3.58278H19.0031L16.8813 0.644531H10.516L8.39424 3.58278H4.15068C2.39295 3.58278 0.968018 4.89828 0.968018 6.52103V18.274C0.968018 19.8968 2.39295 21.2123 4.15068 21.2123H23.2467C25.0044 21.2123 26.4293 19.8968 26.4293 18.274V6.52103C26.4293 4.89828 25.0044 3.58278 23.2467 3.58278ZM13.6987 17.2946C10.7691 17.2946 8.39424 15.1021 8.39424 12.3975C8.39424 9.69294 10.7691 7.50044 13.6987 7.50044C16.6282 7.50044 19.0031 9.69294 19.0031 12.3975C19.0031 15.1021 16.6282 17.2946 13.6987 17.2946V17.2946Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default CameraIconSvg;
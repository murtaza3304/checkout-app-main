import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const ReportLeftIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.41264 6.51786H5.22884V2.96647H6.41264M5.22884 7.70166H6.41264V8.88546H5.22884M8.02852 0.598877H3.61296L0.493652 3.71818V8.13375L3.61296 11.2531H8.02852L11.1478 8.13375V3.71818L8.02852 0.598877Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default ReportLeftIconSvg;
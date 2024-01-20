import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const ApprovalIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#69C3F9';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 8.9957L16.8927 6.60487L17.1864 3.44004L14.0686 2.73483L12.4364 0L9.5 1.25561L6.56364 0L4.93136 2.73483L1.81364 3.43144L2.10727 6.59627L0 8.9957L2.10727 11.3865L1.81364 14.56L4.93136 15.2652L6.56364 18L9.5 16.7358L12.4364 17.9914L14.0686 15.2566L17.1864 14.5514L16.8927 11.3865L19 8.9957ZM7.77273 13.2957L4.31818 9.85571L5.53591 8.6431L7.77273 10.8619L13.4641 5.19446L14.6818 6.41567L7.77273 13.2957Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default ApprovalIconSvg;
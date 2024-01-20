import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const HeartIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '';
    return (
        defaultColor ?
            <SvgXml
                xml={`
                <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6986 20.2853C11.3834 20.3965 10.8644 20.3965 10.5492 20.2853C7.86107 19.3676 1.85449 15.5393 1.85449 9.05074C1.85449 6.18649 4.16257 3.86914 7.00828 3.86914C8.69531 3.86914 10.1877 4.68485 11.1239 5.94549C12.0601 4.68485 13.5618 3.86914 15.2395 3.86914C18.0852 3.86914 20.3933 6.18649 20.3933 9.05074C20.3933 15.5393 14.3867 19.3676 11.6986 20.2853Z" stroke="#81848C" stroke-width="1.19178" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.2385 3.87109C13.5608 3.87109 12.0591 4.6868 11.1229 5.93817C10.1867 4.6868 8.68507 3.87109 7.00731 3.87109C4.1616 3.87109 1.85352 6.18845 1.85352 9.05269C1.85352 10.1558 2.02963 11.1754 2.33552 12.1209C3.80009 16.7556 8.31429 19.5271 10.5482 20.2872C10.8634 20.3984 11.3825 20.3984 11.6976 20.2872C13.9316 19.5271 18.4458 16.7556 19.9103 12.1209C20.2162 11.1754 20.3923 10.1558 20.3923 9.05269C20.3923 6.18845 18.0842 3.87109 15.2385 3.87109Z" fill="${defaultColor}"/>
                </svg>
            `}
            />
            :
            <SvgXml
                xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6986 20.2853C11.3834 20.3965 10.8644 20.3965 10.5492 20.2853C7.86107 19.3676 1.85449 15.5393 1.85449 9.05074C1.85449 6.18649 4.16257 3.86914 7.00828 3.86914C8.69531 3.86914 10.1877 4.68485 11.1239 5.94549C12.0601 4.68485 13.5618 3.86914 15.2395 3.86914C18.0852 3.86914 20.3933 6.18649 20.3933 9.05074C20.3933 15.5393 14.3867 19.3676 11.6986 20.2853Z" stroke="#81848C" stroke-width="1.19178" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `}
            />
    );
};

export default HeartIconSvg;
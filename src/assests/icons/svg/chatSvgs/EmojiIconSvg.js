import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const EmojiIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "29px";
    const defaultHeight = height ? height : "27px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#C1C0C8';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4053 1.47852C7.3744 1.47852 1.67468 6.80975 1.67468 13.3862C1.67468 19.9626 7.3744 25.2938 14.4053 25.2938C21.4363 25.2938 27.136 19.9626 27.136 13.3862C27.136 10.2281 25.7948 7.1993 23.4073 4.96618C21.0198 2.73307 17.7817 1.47852 14.4053 1.47852ZM8.04002 11.8977C8.04002 11.0756 8.75248 10.4092 9.63135 10.4092C10.5102 10.4092 11.2227 11.0756 11.2227 11.8977C11.2227 12.7197 10.5102 13.3862 9.63135 13.3862C8.75248 13.3862 8.04002 12.7197 8.04002 11.8977ZM14.4053 20.3323C12.0617 20.3323 10.1618 18.5552 10.1618 16.3631H18.6489C18.6489 18.5552 16.749 20.3323 14.4053 20.3323ZM19.1793 13.3862C18.3005 13.3862 17.588 12.7197 17.588 11.8977C17.588 11.0756 18.3005 10.4092 19.1793 10.4092C20.0582 10.4092 20.7707 11.0756 20.7707 11.8977C20.7707 12.7197 20.0582 13.3862 19.1793 13.3862Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default EmojiIconSvg;
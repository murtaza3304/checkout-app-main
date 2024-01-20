import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const UploadIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '23px';
  const defaultHeight = height ? height : '18px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M83.6 0.5H12.4C5.8 0.5 0.5 5.8 0.5 12.4V83.6C0.5 90.2 5.8 95.5 12.4 95.5H83.6C90.2 95.5 95.5 90.2 95.5 83.6V12.4C95.5 5.8 90.2 0.5 83.6 0.5ZM64.6 39.3H55.4V60.7C55.4 62.3 54.1 63.5 52.6 63.5H43.4C41.8 63.5 40.6 62.2 40.6 60.7V39.3H31.4C28.9 39.3 27.6 36.3 29.4 34.5L46 17.3C47.1 16.1 49 16.1 50.1 17.3L66.7 34.5C68.4 36.3 67.1 39.3 64.6 39.3ZM80.2 77.8C80.2 78.8 79.4 79.6 78.4 79.6H17.6C16.6 79.6 15.8 78.8 15.8 77.8V61.7C15.8 60.7 16.6 59.9 17.6 59.9H22.8C23.8 59.9 24.6 60.7 24.6 61.7V70.8H71.3V61.7C71.3 60.7 72.1 59.9 73.1 59.9H78.3C79.3 59.9 80.1 60.7 80.1 61.7V77.8H80.2Z" fill="${defaultColor}"/>
            </svg>
            
            `}
    />
  );
};

export default UploadIconSvg;

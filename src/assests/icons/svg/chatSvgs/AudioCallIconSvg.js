import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';
const AudioCallIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '23px';
  const defaultHeight = height ? height : '21.5px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#C1C0C8';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3542 17.0629L16.7834 19.5344L10.2199 13.1311L12.7532 10.6231C13.0666 10.3122 13.1562 9.84728 12.9801 9.44649L10.3422 3.43972C10.1266 2.95014 9.57592 2.68858 9.04798 2.82507L4.20164 4.07371C3.70291 4.1996 3.36024 4.64593 3.37666 5.14826C3.68489 10.6434 6.02688 15.8427 9.96769 19.7805C14.0053 23.6257 19.3364 25.9102 24.9704 26.2096C25.4853 26.2256 25.9428 25.8913 26.0718 25.4047L27.3517 20.6767C27.4916 20.1616 27.2235 19.6243 26.7217 19.4141L20.5646 16.8405C20.1524 16.667 19.6735 16.755 19.3542 17.0629Z" fill="${defaultColor}"/>
            </svg>
            `}
    />
  );
};

export default AudioCallIconSvg;

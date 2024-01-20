import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const BoostIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '8px';
  const defaultHeight = height ? height : '4px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#4FA9E3';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.209 27.3071C2.303 27.9931 0.045 28.0001 0 28.0001C0 27.9551 0.00700009 25.6971 0.693 22.7911C1.359 19.9711 4.896 19.0061 6.945 21.0551C8.994 23.1041 8.03 26.6411 5.209 27.3071Z" fill="${defaultColor}"/>
<path d="M27.925 0.983017C27.876 0.503017 27.497 0.124017 27.018 0.0760165C23.959 -0.235983 12.789 -0.266985 6.02002 14.512C9.74702 18.239 9.76102 18.253 13.488 21.98C28.267 15.211 28.236 4.04102 27.925 0.983017ZM20.747 11.184C19.662 12.269 17.902 12.269 16.816 11.184C15.73 10.099 15.731 8.33902 16.816 7.25302C17.901 6.16702 19.661 6.16802 20.747 7.25302C21.833 8.33802 21.832 10.098 20.747 11.184Z" fill="${defaultColor}"/>
<path d="M14.353 23.562L16.14 26.8C16.47 27.4 17.28 27.52 17.77 27.03L20.31 24.49C20.89 23.91 21.22 23.12 21.22 22.3V19.394C19.353 20.882 17.095 22.296 14.353 23.562Z" fill="${defaultColor}"/>
<path d="M8.62599 6.78003H5.70999C4.88999 6.78003 4.09999 7.10003 3.51999 7.68003L0.969991 10.23C0.479991 10.72 0.599991 11.53 1.19999 11.86L4.43799 13.647C5.70599 10.902 7.12799 8.64403 8.62599 6.78003Z" fill="${defaultColor}"/>
</svg>
            `}
    />
  );
};

export default BoostIconSvg;

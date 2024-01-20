import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const LockIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '7px';
  const defaultHeight = height ? height : '10px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_828_10)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.6569 13 12 13C10.3431 13 9 14.3431 9 16C9 17.6569 10.3431 19 12 19ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="${defaultColor}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V9C19.6569 9 21 10.3431 21 12V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V12C3 10.3431 4.34315 9 6 9ZM8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V9H8V7ZM6 11C5.44772 11 5 11.4477 5 12V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V12C19 11.4477 18.5523 11 18 11H6Z" fill="${defaultColor}"/>
</g>
<defs>
<clipPath id="clip0_828_10">
<rect width="24" height="30" fill="${defaultColor}"/>
</clipPath>
</defs>
</svg>
            `}
    />
  );
};

export default LockIconSvg;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const GraphIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '19px';
  const defaultHeight = height ? height : '19px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
      <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 9.5C1 5.4931 1 3.48965 2.2444 2.2444C3.4905 1 5.4931 1 9.5 1C13.5069 1 15.5104 1 16.7548 2.2444C18 3.4905 18 5.4931 18 9.5C18 13.5069 18 15.5104 16.7548 16.7548C15.5112 18 13.5069 18 9.5 18C5.4931 18 3.48965 18 2.2444 16.7548C1 15.5112 1 13.5069 1 9.5Z" stroke="#69C3F9" stroke-width="1.275"/>
<line x1="5.6375" y1="9.8625" x2="12.3625" y2="9.8625" stroke="#69C3F9" stroke-width="1.275" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 7L13 10L10 13" stroke="#69C3F9" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            `}
    />
  );
};

export default GraphIconSvg;

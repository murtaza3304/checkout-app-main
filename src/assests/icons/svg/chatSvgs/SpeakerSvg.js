import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const SpeakerSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '23px';
  const defaultHeight = height ? height : '21.5px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#FF0000';
  return (
    <SvgXml
      xml={`
      <svg width="23" height="23" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3205 1.29647L8.87277 7.25482C8.68439 7.40546 8.44994 7.48753 8.20858 7.48753H2.07188C1.48421 7.48753 1.00806 7.96369 1.00806 8.55101V17.7843C1.00806 18.3716 1.48421 18.8478 2.07188 18.8478H8.20858C8.44994 18.8478 8.68439 18.9298 8.87277 19.0808L16.3205 25.0388C17.0169 25.596 18.0482 25.1001 18.0482 24.2084V2.12688C18.0482 1.23517 17.0169 0.739623 16.3205 1.29647Z" stroke="#908F9D" stroke-width="1.38518" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26.644 6.46484C30.3397 10.1615 30.3397 16.1538 26.644 19.8509" stroke="#908F9D" stroke-width="1.38518" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
            
            `}
    />
  );
};

export default SpeakerSvg;

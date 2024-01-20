import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const MicSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '23px';
  const defaultHeight = height ? height : '21.5px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;

  return (
    <SvgXml
      xml={`
      <svg width="23" height="24" viewBox="0 0 23 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3485 1.27344C8.92305 1.27344 6.95679 3.2397 6.95679 5.66481V17.3755C6.95679 19.8009 8.92305 21.7672 11.3485 21.7672C13.774 21.7672 15.7402 19.8009 15.7402 17.3755V5.66481C15.7402 3.2397 13.774 1.27344 11.3485 1.27344Z" stroke="#908F9D" stroke-width="1.38518" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.5953 14.4482V17.3758C21.5953 23.035 17.0076 27.6227 11.3484 27.6227C5.68928 27.6227 1.10156 23.035 1.10156 17.3758V14.4482" stroke="#908F9D" stroke-width="1.38518" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.3484 27.6221V33.4776" stroke="#908F9D" stroke-width="1.38518" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.50171 33.5518H17.212" stroke="#908F9D" stroke-width="1.38518" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      
            
            `}
    />
  );
};

export default MicSvg;

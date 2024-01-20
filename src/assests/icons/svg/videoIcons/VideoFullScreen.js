import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const VideoFullScreen = ({height, width, color}) => {
  const defaultWidth = width ? width : '25px';
  const defaultHeight = height ? height : '25px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 8.5C20.4 8.5 20 8.1 20 7.5V4H16.5C15.9 4 15.5 3.6 15.5 3C15.5 2.4 15.9 2 16.5 2H21C21.6 2 22 2.4 22 3V7.5C22 8.1 21.6 8.5 21 8.5ZM21 22H16.5C15.9 22 15.5 21.6 15.5 21C15.5 20.4 15.9 20 16.5 20H20V16.5C20 15.9 20.4 15.5 21 15.5C21.6 15.5 22 15.9 22 16.5V21C22 21.6 21.6 22 21 22ZM7.5 22H3C2.4 22 2 21.6 2 21V16.5C2 15.9 2.4 15.5 3 15.5C3.6 15.5 4 15.9 4 16.5V20H7.5C8.1 20 8.5 20.4 8.5 21C8.5 21.6 8.1 22 7.5 22ZM3 8.5C2.4 8.5 2 8.1 2 7.5V3C2 2.4 2.4 2 3 2H7.5C8.1 2 8.5 2.4 8.5 3C8.5 3.6 8.1 4 7.5 4H4V7.5C4 8.1 3.6 8.5 3 8.5Z" fill="#fff"/>
      </svg>      
            `}
    />
  );
};

export default VideoFullScreen;

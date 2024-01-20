import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const VideoPause = ({height, width, color}) => {
  const defaultWidth = width ? width : '25px';
  const defaultHeight = height ? height : '25px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_36_14772)">
<path d="M42.6737 7.32623C32.906 -2.44143 17.0953 -2.44289 7.32629 7.32623C-2.44136 17.0939 -2.44283 32.9046 7.32629 42.6736C17.094 52.4413 32.9047 52.4427 42.6737 42.6736C52.4412 32.9061 52.4427 17.0954 42.6737 7.32623ZM24.9999 45.8883C13.4821 45.8883 4.1115 36.5178 4.1115 24.9999C4.1115 13.482 13.4821 4.11154 24.9999 4.11154C36.5178 4.11154 45.8883 13.4821 45.8883 25C45.8883 36.5179 36.5178 45.8883 24.9999 45.8883Z" fill="#fff"/>
<path d="M29.1726 15.6474C28.0388 15.6474 27.1196 16.5666 27.1196 17.7004V32.2994C27.1196 33.4333 28.0388 34.3524 29.1726 34.3524C30.3065 34.3524 31.2256 33.4333 31.2256 32.2994V17.7004C31.2256 16.5666 30.3066 15.6474 29.1726 15.6474ZM20.8303 15.6474C19.6965 15.6474 18.7773 16.5666 18.7773 17.7004V32.2994C18.7773 33.4333 19.6965 34.3524 20.8303 34.3524C21.9642 34.3524 22.8833 33.4333 22.8833 32.2994V17.7004C22.8833 16.5666 21.9643 15.6474 20.8303 15.6474Z" fill="#fff"/>
</g>
<defs>
<clipPath id="clip0_36_14772">
<rect width="50" height="50" fill="#fff"/>
</clipPath>
</defs>
</svg>
            `}
    />
  );
};

export default VideoPause;

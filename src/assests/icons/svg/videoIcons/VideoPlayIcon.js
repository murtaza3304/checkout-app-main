import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const VideoPlayIcon = ({height, width, color}) => {
  const defaultWidth = width ? width : '25px';
  const defaultHeight = height ? height : '25px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_36_14776)">
<path d="M33.2456 24.0226L22.8633 16.4754C22.6768 16.3394 22.4563 16.2577 22.2262 16.2392C21.9961 16.2208 21.7654 16.2664 21.5596 16.3709C21.3538 16.4754 21.1809 16.6349 21.0601 16.8315C20.9393 17.0282 20.8752 17.2545 20.875 17.4853V32.5747C20.8743 32.8059 20.9378 33.0327 21.0585 33.2299C21.1792 33.4271 21.3523 33.5869 21.5585 33.6914C21.7647 33.796 21.9959 33.8412 22.2263 33.8221C22.4567 33.8029 22.6772 33.7201 22.8633 33.583L33.2456 26.0425C33.4061 25.9274 33.5368 25.7758 33.6269 25.6001C33.7171 25.4245 33.7641 25.2299 33.7641 25.0325C33.7641 24.8351 33.7171 24.6405 33.6269 24.4649C33.5368 24.2892 33.4061 24.1376 33.2456 24.0226Z" fill="#fff"/>
<path d="M25.0008 0.00335693C11.191 0.00335693 0 11.1943 0 25.0042C0 38.8091 11.191 49.9967 25.0008 49.9967C38.8074 49.9967 50 38.8074 50 25.0042C50.0017 11.1943 38.8074 0.00335693 25.0008 0.00335693ZM25.0008 45.8255C13.5004 45.8255 4.17623 36.5063 4.17623 25.0042C4.17623 13.5071 13.5004 4.17626 25.0008 4.17626C36.4996 4.17626 45.8221 13.5054 45.8221 25.0042C45.8238 36.5063 36.4996 45.8255 25.0008 45.8255Z" fill="#fff"/>
</g>
<defs>
<clipPath id="clip0_36_14776">
<rect width="50" height="50" fill="#fff"/>
</clipPath>
</defs>
</svg>
            `}
    />
  );
};

export default VideoPlayIcon;

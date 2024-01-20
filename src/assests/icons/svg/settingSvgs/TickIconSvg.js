import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const TickIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '16px';
  const defaultHeight = height ? height : '16px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 65 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M63.8999 1.00003C63.3391 0.450346 62.5852 0.142456 61.7999 0.142456C61.0146 0.142456 60.2607 0.450346 59.6999 1.00003L24.0999 36.6L6.2999 18.8C6.04201 18.4562 5.71325 18.1718 5.33587 17.966C4.95849 17.7603 4.5413 17.638 4.11257 17.6076C3.68384 17.5771 3.25356 17.6391 2.85088 17.7894C2.44819 17.9397 2.08251 18.1748 1.77858 18.4787C1.47466 18.7826 1.23959 19.1483 1.08929 19.551C0.938995 19.9537 0.876981 20.384 0.90745 20.8127C0.937919 21.2414 1.06016 21.6586 1.26589 22.036C1.47163 22.4134 1.75605 22.7421 2.0999 23L21.9999 43C22.5607 43.5497 23.3146 43.8576 24.0999 43.8576C24.8852 43.8576 25.6391 43.5497 26.1999 43L63.8999 5.30003C64.1872 5.02047 64.4155 4.68619 64.5714 4.31691C64.7273 3.94764 64.8077 3.55087 64.8077 3.15003C64.8077 2.74919 64.7273 2.35241 64.5714 1.98314C64.4155 1.61386 64.1872 1.27958 63.8999 1.00003Z" fill="${defaultColor}"/>
            </svg>
            `}
    />
  );
};

export default TickIconSvg;

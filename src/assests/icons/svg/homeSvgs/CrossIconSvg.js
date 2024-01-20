import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {theme} from '../../../theme/Theme';
// import { lightThemeColors } from '../../../../themes';

const CrossIconSvg = ({height, width, color, styles}) => {
  const defaultWidth = width ? width : '14px';
  const defaultHeight = height ? height : '14px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : theme.lightColor.headerBg;
  return (
    <SvgXml
      xml={`
<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0711 1.07107L1.92893 15.2132M1.92893 1.07107L16.0711 15.2132" stroke="${defaultColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            `}
      style={styles}
    />
  );
};

export default CrossIconSvg;

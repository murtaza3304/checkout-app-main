import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {theme} from '../../../theme/Theme';
// import { lightThemeColors } from '../../../../themes';
const NewAudioCallIconSvg = ({height, width, color, color1, opacity}) => {
  const defaultWidth = width ? width : 70;
  const defaultHeight = height ? height : 70;
  const defaultColor1 = color1 ? color1 : '#FF0000';
  const defaultColor = color ? color : '#FF0000';
  const deafaultOpacity = opacity ? opacity : '0.15';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultHeight}" height="${defaultWidth}" viewBox="0 0 81 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="${deafaultOpacity}" fill-rule="evenodd" clip-rule="evenodd" d="M40.3865 81.2635C18.1557 81.2635 0.133789 63.2416 0.133789 41.0108C0.133789 18.7797 18.1557 0.757812 40.3865 0.757812C62.6176 0.757812 80.6395 18.7797 80.6395 41.0108C80.6395 63.2416 62.6176 81.2635 40.3865 81.2635Z" fill="${defaultColor1}"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9989 38.5348C23.9327 35.3562 28.5605 33.1487 33.5063 32.0918C38.0526 31.0786 42.7665 31.0783 47.3127 32.0921C52.2382 33.1423 56.8489 35.3332 60.7741 38.4885C60.8527 38.5544 60.9279 38.6237 60.9996 38.6959C62.2653 39.9719 62.257 42.0327 60.9812 43.2982L57.5296 46.7499C56.3905 47.9468 54.5351 48.1003 53.215 47.1064C51.9645 46.1477 50.6099 45.3328 49.1764 44.6785C48.0197 44.154 47.2738 43.0041 47.2667 41.7335L47.2667 38.8113C42.7484 37.5683 37.9786 37.5681 33.4603 38.811L33.4603 41.7333C33.453 43.0036 32.7076 44.154 31.5503 44.6785C30.1169 45.3333 28.762 46.1475 27.512 47.1066C26.2063 48.0886 24.3757 47.951 23.2319 46.7846L19.78 43.3327C19.7117 43.2644 19.6466 43.1929 19.5846 43.1182C18.4972 41.8153 18.602 39.9127 19.7795 38.7351C19.8488 38.6658 19.9223 38.5987 19.9989 38.5348Z" fill="${defaultColor}"/>
            </svg>
            
            `}
    />
  );
};

export default NewAudioCallIconSvg;

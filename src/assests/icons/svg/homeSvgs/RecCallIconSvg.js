import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const RecCallIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '23px';
  const defaultHeight = height ? height : '21.5px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#FF0000';
  return (
    <SvgXml
      xml={`
      <svg width="70" height="70" viewBox="0 0 81 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.15" fill-rule="evenodd" clip-rule="evenodd" d="M40.3865 81.2635C18.1557 81.2635 0.133789 63.2416 0.133789 41.0108C0.133789 18.7797 18.1557 0.757812 40.3865 0.757812C62.6176 0.757812 80.6395 18.7797 80.6395 41.0108C80.6395 63.2416 62.6176 81.2635 40.3865 81.2635Z" fill="#42FF00" fill-opacity="0.75"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M48.4358 59.9055C43.7161 58.088 39.4905 55.184 36.1023 51.4292C32.9517 47.9987 30.5945 43.9164 29.1993 39.4724C27.6461 34.6816 27.2381 29.5933 28.0081 24.6163C28.0259 24.5153 28.0483 24.4155 28.075 24.3173C28.5472 22.5831 30.336 21.5599 32.0699 22.032L36.7849 23.2954C38.391 23.6835 39.4517 25.2135 39.251 26.8537C39.046 28.416 39.0176 29.9966 39.1677 31.5652C39.2918 32.8292 38.6689 34.0501 37.5721 34.6915L35.0413 36.1527C36.224 40.6871 38.6087 44.818 41.9443 48.1095L44.475 46.6483C45.5789 46.0195 46.9478 46.0898 47.9807 46.8298C49.2645 47.7438 50.647 48.51 52.1027 49.1131C53.6059 49.7528 54.402 51.407 53.9639 52.9807L52.7004 57.6961C52.6754 57.7894 52.646 57.8815 52.6123 57.9725C52.0277 59.5658 50.3275 60.4263 48.7189 59.9953C48.6243 59.9699 48.5294 59.9399 48.4358 59.9055Z" fill="#42FF00"/>
      </svg>
      
            
            `}
    />
  );
};

export default RecCallIconSvg;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const PhotosIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '26px';
  const defaultHeight = height ? height : '21px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#C1C0C8';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6619 0.644531H1.3223C0.73639 0.644531 0.261414 1.08072 0.261414 1.61879V19.1555C0.261414 19.6936 0.73639 20.1298 1.3223 20.1298H24.6619C25.2478 20.1298 25.7227 19.6936 25.7227 19.1555V1.61879C25.7227 1.08072 25.2478 0.644531 24.6619 0.644531ZM23.601 2.59305V12.6279L19.1017 7.80535C18.9016 7.59048 18.6097 7.46604 18.3018 7.46436C17.9903 7.44493 17.6888 7.57001 17.4987 7.79756L10.8151 14.8074L7.3768 11.6469C7.16724 11.4518 6.87706 11.3479 6.57901 11.3614C6.28134 11.3736 6.00298 11.5002 5.81198 11.7102L2.38319 15.4903V2.59305H23.601ZM9.80941 8.43862C10.9812 8.43862 11.9312 7.56624 11.9312 6.4901C11.9312 5.41396 10.9812 4.54158 9.80941 4.54158C8.63759 4.54158 7.68764 5.41396 7.68764 6.4901C7.68764 7.56624 8.63759 8.43862 9.80941 8.43862Z" fill="${defaultColor}"/>
            </svg>
            `}
    />
  );
};

export default PhotosIconSvg;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const RightArrowIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '25px';
  const defaultHeight = height ? height : '25px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.268735 18.3137C0.182893 18.4092 0.115784 18.5214 0.0712397 18.6441C0.026695 18.7667 0.00558655 18.8974 0.00912074 19.0286C0.0126549 19.1598 0.0407622 19.289 0.0918372 19.4089C0.142912 19.5287 0.215955 19.6367 0.306795 19.7269C0.397635 19.8171 0.504494 19.8876 0.62127 19.9344C0.738046 19.9811 0.862451 20.0033 0.987385 19.9996C1.11232 19.9959 1.23533 19.9664 1.3494 19.9127C1.46347 19.8591 1.56637 19.7824 1.65221 19.6869L9.73992 10.6922C9.90694 10.5067 10 10.261 10 10.0056C10 9.75026 9.90694 9.50458 9.73991 9.31902L1.65221 0.3233C1.56693 0.225796 1.46406 0.14706 1.34957 0.091668C1.23508 0.0362759 1.11125 0.00533135 0.98528 0.000630292C0.859308 -0.00407077 0.733701 0.017567 0.615757 0.0642851C0.497813 0.111003 0.389881 0.18187 0.298233 0.272771C0.206584 0.363673 0.133045 0.472796 0.0818867 0.593801C0.0307284 0.714807 0.00297103 0.845284 0.000226479 0.977653C-0.00251807 1.11002 0.0198047 1.24164 0.065899 1.36488C0.111993 1.48811 0.18094 1.60049 0.268734 1.69549L7.73987 10.0056L0.268735 18.3137Z" fill="black"/>
            </svg>

            `}
    />
  );
};

export default RightArrowIconSvg;

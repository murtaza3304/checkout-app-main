import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const BackForwordPlay = ({height, width, color}) => {
  const defaultWidth = width ? width : '25px';
  const defaultHeight = height ? height : '25px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_36_14780)">
<path d="M20.4452 6.57437C20.3081 6.40531 20.1099 6.29708 19.8936 6.27312C19.6772 6.24917 19.4601 6.31142 19.2893 6.44639C19.1186 6.58136 19.0078 6.77818 18.9812 6.99422C18.9545 7.21025 19.014 7.4281 19.1468 7.60058C20.4216 9.20364 21.1121 11.1933 21.1044 13.2414C21.1057 18.13 17.2454 22.1466 12.3606 22.3399C7.47573 22.5327 3.31049 18.8334 2.92608 13.9598C2.54125 9.08651 6.07422 4.77892 10.9288 4.20334L9.80787 5.16458C9.64757 5.30907 9.55005 5.51046 9.5361 5.72581C9.52215 5.94117 9.59287 6.15346 9.73319 6.31742C9.87351 6.48138 10.0723 6.58404 10.2873 6.60352C10.5022 6.623 10.7162 6.55775 10.8837 6.42168L13.7803 3.93892C13.871 3.86123 13.9438 3.76482 13.9937 3.65633C14.0437 3.54783 14.0695 3.42981 14.0695 3.31037C14.0695 3.19094 14.0437 3.07292 13.9937 2.96442C13.9438 2.85592 13.871 2.75951 13.7803 2.68182L10.8837 0.199062C10.8017 0.125101 10.7056 0.0683173 10.6013 0.0320575C10.4969 -0.00420233 10.3864 -0.019204 10.2762 -0.012063C10.1659 -0.00492204 10.0582 0.024217 9.95942 0.0736362C9.86063 0.123055 9.77272 0.191755 9.70089 0.275684C9.62906 0.359613 9.57476 0.457073 9.5412 0.562319C9.50763 0.667565 9.49547 0.778466 9.50544 0.888484C9.51541 0.998503 9.54731 1.10541 9.59925 1.20291C9.65119 1.30041 9.72212 1.38652 9.80787 1.45617L11.0571 2.52665C5.25987 3.03727 0.920008 8.06485 1.26097 13.8741C1.60194 19.6833 6.50042 24.1693 12.3175 23.9975C18.1346 23.8266 22.7608 19.061 22.7596 13.2414C22.7684 10.8206 21.9521 8.46902 20.4452 6.57437Z" fill="#fff"/>
<path d="M15.5621 6.54529C15.4651 6.49608 15.3788 6.42826 15.3081 6.34568C15.1655 6.17895 15.095 5.96242 15.1119 5.74368C15.1289 5.52495 15.2321 5.32191 15.3987 5.1792L17.5616 3.32499L15.3996 1.46996C15.3138 1.40031 15.2429 1.3142 15.1909 1.2167C15.139 1.11921 15.1071 1.0123 15.0971 0.902278C15.0872 0.79226 15.0993 0.681359 15.1329 0.576113C15.1664 0.470867 15.2207 0.373407 15.2926 0.289478C15.3644 0.205549 15.4523 0.136849 15.5511 0.0874302C15.6499 0.0380109 15.7576 0.0088719 15.8678 0.00173094C15.9781 -0.00541002 16.0886 0.00959161 16.193 0.0458514C16.2973 0.0821113 16.3934 0.138895 16.4754 0.212856L19.372 2.69561C19.4627 2.77331 19.5355 2.86971 19.5854 2.97821C19.6354 3.08671 19.6612 3.20473 19.6612 3.32417C19.6612 3.4436 19.6354 3.56162 19.5854 3.67012C19.5355 3.77862 19.4627 3.87503 19.372 3.95272L16.4754 6.43548C16.3929 6.50626 16.2972 6.56009 16.1939 6.59389C16.0905 6.62768 15.9816 6.64079 15.8732 6.63245C15.7648 6.62411 15.6591 6.59449 15.5621 6.54529Z" fill="#fff"/>
<path d="M7.44868 16.5518C7.22919 16.5518 7.01869 16.639 6.86349 16.7942C6.70829 16.9494 6.62109 17.1599 6.62109 17.3794C6.62109 17.5988 6.70829 17.8093 6.86349 17.9645C7.01869 18.1197 7.22919 18.2069 7.44868 18.2069H9.93144C10.1509 18.2069 10.3614 18.1197 10.5166 17.9645C10.6718 17.8093 10.759 17.5988 10.759 17.3794C10.759 17.1599 10.6718 16.9494 10.5166 16.7942C10.3614 16.639 10.1509 16.5518 9.93144 16.5518H9.51765V9.51728C9.51762 9.36752 9.47695 9.22057 9.39998 9.0921C9.32301 8.96363 9.21262 8.85846 9.08058 8.78778C8.94854 8.71711 8.7998 8.6836 8.65021 8.69081C8.50062 8.69802 8.35579 8.74569 8.23116 8.82873L6.98978 9.65632C6.81159 9.77575 6.68674 9.9597 6.64154 10.1694C6.59634 10.3791 6.63433 10.5982 6.7475 10.7804C6.86067 10.9626 7.04018 11.0938 7.24818 11.1462C7.45618 11.1987 7.67642 11.1683 7.86247 11.0616V16.5518H7.44868ZM14.0694 8.6897C13.5206 8.6897 12.9944 8.90768 12.6064 9.29568C12.2184 9.68369 12.0004 10.2099 12.0004 10.7587V16.138C12.0004 16.6867 12.2184 17.2129 12.6064 17.601C12.9944 17.989 13.5206 18.2069 14.0694 18.2069H15.3107C15.8595 18.2069 16.3857 17.989 16.7737 17.601C17.1617 17.2129 17.3797 16.6867 17.3797 16.138V10.7587C17.3797 10.2099 17.1617 9.68369 16.7737 9.29568C16.3857 8.90768 15.8595 8.6897 15.3107 8.6897H14.0694ZM15.7245 10.7587V16.138C15.7245 16.2477 15.6809 16.353 15.6033 16.4306C15.5257 16.5082 15.4205 16.5518 15.3107 16.5518H14.0694C13.9596 16.5518 13.8544 16.5082 13.7768 16.4306C13.6992 16.353 13.6556 16.2477 13.6556 16.138V10.7587C13.6556 10.6489 13.6992 10.5437 13.7768 10.4661C13.8544 10.3885 13.9596 10.3449 14.0694 10.3449H15.3107C15.4205 10.3449 15.5257 10.3885 15.6033 10.4661C15.6809 10.5437 15.7245 10.6489 15.7245 10.7587Z" fill="#fff"/>
</g>
<defs>
<clipPath id="clip0_36_14780">
<rect width="24" height="24" fill="#fff"/>
</clipPath>
</defs>
</svg>
            `}
    />
  );
};

export default BackForwordPlay;
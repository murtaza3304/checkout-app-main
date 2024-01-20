import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const CallReceviedIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "17px";
    const defaultHeight = height ? height : "17px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#5AE33D';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1055 10.4319L9.39169 12.0796L5.01604 7.81073L6.70491 6.13873C6.91381 5.93141 6.97357 5.6215 6.85618 5.3543L5.09754 1.34979C4.95386 1.0234 4.5867 0.849029 4.23475 0.940022L1.00385 1.77244C0.671365 1.85637 0.442919 2.15393 0.453868 2.48882C0.659352 6.15226 2.22068 9.61845 4.84788 12.2436C7.53961 14.8071 11.0937 16.3301 14.8497 16.5297C15.193 16.5404 15.498 16.3175 15.584 15.9931L16.4372 12.8411C16.5305 12.4977 16.3518 12.1395 16.0172 11.9994L11.9125 10.2836C11.6377 10.168 11.3184 10.2267 11.1055 10.4319Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default CallReceviedIconSvg;
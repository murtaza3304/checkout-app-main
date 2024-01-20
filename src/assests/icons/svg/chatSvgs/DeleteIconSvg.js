import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const DeleteIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "11px";
    const defaultHeight = height ? height : "12px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#FFFFFF';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4968 1.90831H7.92915V0.976617C7.92915 0.462056 7.54596 0.0449219 7.07328 0.0449219H4.50566C4.03297 0.0449219 3.64979 0.462056 3.64979 0.976617V1.90831H1.08217C0.845829 1.90831 0.654236 2.11688 0.654236 2.37416C0.654236 2.63144 0.845829 2.84001 1.08217 2.84001H10.4968C10.7331 2.84001 10.9247 2.63144 10.9247 2.37416C10.9247 2.11688 10.7331 1.90831 10.4968 1.90831ZM4.38895 0.976617H7.18999V1.90831H4.38895V0.976617ZM3.67475 11.2253C3.02784 11.2229 2.49143 10.6576 2.44329 9.92741L2.05475 3.7717H9.52418L9.13565 9.92741C9.08751 10.6576 8.5511 11.2229 7.90419 11.2253H3.67475Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default DeleteIconSvg;
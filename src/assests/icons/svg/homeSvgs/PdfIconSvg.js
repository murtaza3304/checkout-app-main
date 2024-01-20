import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { theme } from '../../../theme/Theme';
// import { lightThemeColors } from '../../../../themes';

const PdfIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "19px";
    const defaultHeight = height ? height : "17px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : theme.lightColor.darkGray;
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5455 0L11.2273 3.825V13.175L15.5455 9.35V0ZM4.75 2.55C3.06591 2.55 1.25227 2.89 0 3.825V16.286C0 16.4985 0.215909 16.711 0.431818 16.711C0.518182 16.711 0.561364 16.6515 0.647727 16.6515C1.81364 16.099 3.49773 15.725 4.75 15.725C6.43409 15.725 8.24773 16.065 9.5 17C10.6659 16.2775 12.7818 15.725 14.25 15.725C15.675 15.725 17.1432 15.9885 18.3523 16.626C18.4386 16.6685 18.4818 16.6515 18.5682 16.6515C18.7841 16.6515 19 16.439 19 16.2265V3.825C18.4818 3.4425 17.9205 3.1875 17.2727 2.975V14.45C16.3227 14.1525 15.2864 14.025 14.25 14.025C12.7818 14.025 10.6659 14.5775 9.5 15.3V3.825C8.24773 2.89 6.43409 2.55 4.75 2.55Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default PdfIconSvg;
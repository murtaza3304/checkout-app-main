import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const CommitIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "25px";
    const defaultHeight = height ? height : "25px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#4E4D4D';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.09933 18.6076H7.63586C3.9281 18.6076 2.07422 17.6807 2.07422 13.046V8.41125C2.07422 4.70349 3.9281 2.84961 7.63586 2.84961H15.0514C18.7592 2.84961 20.613 4.70349 20.613 8.41125V13.046C20.613 16.7537 18.7592 18.6076 15.0514 18.6076H14.5879C14.3006 18.6076 14.0225 18.7466 13.8464 18.9784L12.456 20.8323C11.8442 21.648 10.8431 21.648 10.2313 20.8323L8.84089 18.9784C8.69258 18.7744 8.34961 18.6076 8.09933 18.6076Z" stroke="#81848C" stroke-width="1.19178" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.70728 8.41211H15.9767" stroke="#81848C" stroke-width="1.19178" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.70703 13.0449H12.2687" stroke="#81848C" stroke-width="1.19178" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `}
        />
    );
};

export default CommitIconSvg;
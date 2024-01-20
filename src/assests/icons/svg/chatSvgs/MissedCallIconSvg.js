import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const MissedCallIconSvg = ({ height, width, color }) => {
    const defaultWidth = width ? width : "21px";
    const defaultHeight = height ? height : "9px";
    //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
    const defaultColor = color ? color : '#F62E63';
    return (
        <SvgXml
            xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 21 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7419 3.72709C14.2396 -1.19028 6.67551 -1.19028 1.17315 3.72709C0.863624 4.00359 0.764243 4.5044 0.937036 4.91692L2.27127 8.09806C2.44654 8.51616 2.85007 8.72135 3.22452 8.58277L7.09594 7.15154C7.47272 7.01262 7.70845 6.56719 7.65141 6.10198L7.37848 3.85495H13.5366L13.2669 6.10484C13.2098 6.57006 13.4455 7.01548 13.8223 7.1544L17.6905 8.58563C18.0647 8.72368 18.4678 8.51857 18.643 8.10092L19.9772 4.91978C20.1515 4.50676 20.0524 4.00418 19.7419 3.72709Z" fill="${defaultColor}"/>
            </svg>
            `}
        />
    );
};

export default MissedCallIconSvg;
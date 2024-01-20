import React from 'react';
import { Text as NativeText } from 'react-native';
import { theme } from '../../../assests/theme/Theme';

export function Text({
    style,
    textColor = theme.lightColor.black,
    size = 14,
    children,
    weight,
    fonts,
    lines,
    textPaddingHorizontal,
    onPressHandler = () => false,
    alignText,
    ...rest
}) {
    const textClr = textColor ? textColor : theme.lightColor.gray;
    const fontweight = weight ? weight : theme.fontWeight.normal;
    const fontFamily = fonts ? fonts : theme.fontFamily.TinosRegular;
    const alignmentText = alignText ? alignText : 'left';
    const textPaddingHorizon = textPaddingHorizontal ? textPaddingHorizontal : 0;
    return (
        <NativeText
            {...rest}
            style={[
                {
                    fontSize: size,
                    color: textClr,
                    fontWeight: fontweight,
                    fontFamily: fontFamily,
                    textAlign: alignmentText,
                    paddingHorizontal: textPaddingHorizon,
                },
                style,
            ]}
            onPress={() => onPressHandler()}
            numberOfLines={lines ? lines : 0}
        >
            {children}
        </NativeText>
    );
}
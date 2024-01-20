import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableNativeFeedbackProps, TouchableOpacityProps } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';


/** TODO: Add native effect for android */
export function Touchable({ children, activeOpacity = 0.6, ...params }) {
    return (
        // @ts-expect-error - package not properly typed.
        <TouchableOpacity activeOpacity={activeOpacity} {...params}>
            {children}
        </TouchableOpacity>
    );
}
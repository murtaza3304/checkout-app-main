import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { theme, useTheme } from '../../../assests/theme/Theme';
import { Loader } from '../loader/Loader';
import { Text } from '../text/Text';
import { WhiteSpace } from '../whiteSpace/WhiteSpace';
import LinearGradient from 'react-native-linear-gradient';

export function Button({
    type,
    linearGradient = false,
    loading,
    title,
    disabled,
    containerStyle,
    titleStyles,
    onPressHandler = () => false,
    renderIconRight = () => false,
    renderIconLeft = () => false,
    ...forwardedProps
}) {
    const theme = useTheme();
    const dynamicStyles = getStyles(theme, type, disabled);
    return (
        <>
            {
                linearGradient ?
                    <LinearGradient colors={['#FF7D64', '#EB3A18']} style={containerStyle}>
                        <TouchableOpacity disabled={disabled} {...forwardedProps} onPress={() => onPressHandler()} style={containerStyle}>
                            {loading ? (
                                <>
                                    <WhiteSpace height={4} width={4} />
                                    <Loader size={22} color={theme.lightColor.white} />
                                </>
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {renderIconLeft ? renderIconLeft() : false}
                                    {title ?
                                        <Text
                                            textColor={[dynamicStyles.text]}
                                            onPressHandler={() => onPressHandler()}
                                            style={[titleStyles, { marginLeft: renderIconLeft ? 5 : false, marginRight: renderIconRight ? 5 : false, }]}
                                            children={title}
                                        />
                                        : false}
                                    {renderIconLeft ? renderIconRight() : false}

                                </View>
                            )}
                        </TouchableOpacity>
                    </LinearGradient>
                    :
                    <TouchableOpacity style={containerStyle} disabled={disabled} {...forwardedProps} onPress={() => onPressHandler()}>
                        {loading ? (
                            <>
                                <WhiteSpace height={4} width={4} />
                                <Loader size={22} color={theme.lightColor.white} />
                            </>
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {renderIconLeft ? renderIconLeft() : false}
                                {title ?
                                    <Text
                                        textColor={[dynamicStyles.text]}
                                        onPressHandler={() => onPressHandler()}
                                        style={[titleStyles, { marginLeft: renderIconLeft ? 5 : false, marginRight: renderIconRight ? 5 : false }]}
                                        children={title}
                                    />
                                    : false}
                                {renderIconLeft ? renderIconRight() : false}

                            </View>
                        )}
                    </TouchableOpacity>
            }
        </>
    );
}

function getStyles(
    { colors },
    type = 'primary',
    disabled = false,
) {
    switch (type) {
        case 'dangerOutline':
            return {
                background: 'transparent',
                containerStyles: { borderWidth: 2 },
                text: 'white',
                loader: 'buttonOutlineLoader',
            };
        default:
            return {
                background: disabled ? theme.lightColor.gray : theme.lightColor.black,
                text: 'white',
                loader: 'buttonLoader',
            };
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 3,
        justifyContent: 'center',
        padding: 14,
    },
    loader: {
        maxWidth: 16,
        paddingLeft: 16,
        alignSelf: 'center',
    },
});
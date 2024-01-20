import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {theme} from '../../../assests/theme/Theme';
import {CommonTextInput} from '../../../components/common/CommonTextInput/CommonTextInput';
import SpamHook from '../../../customHooks/reportHooks/SpamHook';
import {Text} from '../../../components/common/text/Text';
import {Button} from '../../../components/common/button/Button';

export default function SpamScreen({navigation, route}) {
  // console.log(route?.params?.postCardData, "navigation post data");

  const {
    postInput,
    postInputError,
    validatePostText,
    onSpamHandlerError,
    loading,
    onSpamHandler,
  } = SpamHook({navigation, route});

  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <CommonEllipseHeader
        bgColor={theme.lightColor.newBodyColor}
        navigation={navigation}
      />
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{width: '100%', paddingHorizontal: 25}}>
          <Text
            children={'Reason'}
            fonts={theme.fontFamily.PoppinsBold}
            textColor={theme.lightColor.darkGray}
            size={26}
            style={{marginBottom: 25}}
          />
          <View style={styles.contentInputContainer}>
            <CommonTextInput
              Value={postInput}
              inputStyle={[
                styles.HeaderTextInputStyle,
                {paddingBottom: postInput ? 0 : 100},
              ]}
              onChangeHandler={e => validatePostText(e)}
              placeHoldertext={`Please add details.`}
              placeholderColor={theme.lightColor.postInputPlaceholder}
              multilineText={true}
            />
          </View>
          {postInputError ? (
            <Text
              children={postInputError ? postInputError : false}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.red}
              size={10}
              style={{marginTop: 10}}
            />
          ) : (
            false
          )}
          <View style={{marginTop: 65}}>
            {onSpamHandlerError ? (
              <Text
                children={onSpamHandlerError ? onSpamHandlerError : false}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
                style={{marginBottom: 8}}
                alignText={'center'}
              />
            ) : (
              false
            )}
            <Button
              title={'Submit'}
              onPressHandler={onSpamHandler}
              titleStyles={styles.titleStyles}
              containerStyle={styles.containerStyle}
              linearGradient={true}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  HeaderTextInputStyle: {
    width: '100%',
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    paddingHorizontal: 20,
  },
  contentInputContainer: {
    borderColor: theme.lightColor.headerBg,
    borderRadius: 6,
    borderWidth: 1,
    height: 150,
    width: '100%',
    backgroundColor: theme.lightColor.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  titleStyles: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.normal,
  },
  containerStyle: {
    backgroundColor: theme?.lightColor?.linearRed,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: '100%',
    borderRadius: 8,
  },
});

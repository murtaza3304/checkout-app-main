import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '../../../components/common/text/Text';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import {theme} from '../../../assests/theme/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {termsAndConditions} from '../../../redux/actions/Actions';
import {Loader} from '../../../components/common/loader/Loader';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import RenderHtml from 'react-native-render-html';

export default function TermsAndCondition({navigation}) {
  // hook
  const dispatch = useDispatch();

  // states
  const [loading, setLoading] = useState(false);
  const [termsAndConditionsHandlerError, setTermsAndConditionsHandlerError] =
    useState('');

  useEffect(() => {
    dispatch(termsAndConditions(setLoading, setTermsAndConditionsHandlerError));
  }, []);

  const currentTermsData = useSelector(
    store => store?.Reducers?.isGetTermsAndPrivacy,
  );
  // console.log(currentTermsData?.terms, "currentTermsData");
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
          <View>
            {loading ? (
              <View
                style={{
                  height: windowHeight * 0.69,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Loader color={theme.lightColor.headerBg} size={40} />
              </View>
            ) : currentTermsData?.terms ? (
              <>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: theme.lightColor.newBodyColor,
                  }}>
                  <RenderHtml
                    contentWidth={windowWidth}
                    source={{
                      html: currentTermsData?.terms?.replaceAll(
                        'background-color:',
                        '',
                      ),
                    }}
                    baseStyle={{
                      color: theme.lightColor.black,
                      backgroundColor: theme.lightColor.newBodyColor,
                    }}
                  />
                </View>
              </>
            ) : termsAndConditionsHandlerError ? (
              <View
                style={{
                  height: windowHeight * 0.69,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  children={
                    termsAndConditionsHandlerError
                      ? termsAndConditionsHandlerError
                      : false
                  }
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.red}
                  size={16}
                  alignText={'center'}
                />
              </View>
            ) : (
              <View
                style={{
                  height: windowHeight * 0.69,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  children={'The admin will add the content.'}
                  fonts={theme.fontFamily.TinosRegular}
                  textColor={theme.lightColor.darkGray}
                  weight={theme.fontWeight.bold}
                  size={16}
                  alignText={'center'}
                />
              </View>
            )}
          </View>
          <View style={{height: 40}}></View>
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
});

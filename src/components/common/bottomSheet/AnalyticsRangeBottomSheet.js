import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Text} from '../text/Text';
import {theme} from '../../../assests/theme/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button} from '../button/Button';
import {buttonData} from '../../../utils/ConstantData';

export default function AnalyticsRangeBottomSheet({
  duration,
  refRBSheet,
  setDays,
  getPerformance,
  setContentWidth,
}) {
  const [btnFocused, setBtnFocused] = useState(0);
  const btnFocusedHandler = index => {
    setBtnFocused(index);
    if (index == 1) {
      setDays('7');
      setContentWidth(0.8);
    } else if (index == 2) {
      setDays('15');
      setContentWidth(1.6);
    } else if (index == 3) {
      setDays('30');
      setContentWidth(2.8);
    } else {
      setDays('3');
      setContentWidth(0.8);
    }
  };
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: theme.lightColor.underLine,
          width: 80,
        },
      }}
      height={285}>
      <View style={styles.container}>
        <Text
          children={'Data Range'}
          fonts={theme.fontFamily.TinosBold}
          textColor={theme.lightColor.darkGray}
          size={18}
          alignText={'center'}
          weight={theme.fontWeight.bold}
        />
        <View style={styles.underLine} />
        <View style={styles.mainContainer}>
          {buttonData.map((items, index) => (
            <Button
              key={index}
              title={items.title}
              containerStyle={
                btnFocused === index ? styles.btnContainer : styles.simpleBtn
              }
              titleStyles={
                btnFocused === index ? styles.btnStyles : styles.simpleBtnTitle
              }
              onPressHandler={
                items?.duration <= duration
                  ? () => btnFocusedHandler(index)
                  : () => null
              }
            />
          ))}
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 30}}>
          <Button
            title={'Show Result'}
            onPressHandler={() => {
              getPerformance();
              refRBSheet.current.close();
            }}
            titleStyles={styles.footerTitleStyle}
            containerStyle={styles.footerBtnStyle}
            linearGradient={true}
          />
        </View>
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  underLine: {
    height: 1.5,
    width: '100%',
    backgroundColor: theme.lightColor.underLine,
    marginTop: 8,
    marginBottom: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 25,
  },
  btnContainer: {
    backgroundColor: theme.lightColor.headerBg,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 6,
    marginBottom: 20,
  },
  btnStyles: {
    color: theme.lightColor.white,
    fontSize: 15,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.bold,
  },
  simpleBtn: {
    borderColor: '#69C3F980',
    backgroundColor: '#69C3F91A',
    borderWidth: 1,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 6,
    marginBottom: 20,
  },
  simpleBtnTitle: {
    color: theme.lightColor.headerBg,
    fontSize: 15,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.bold,
  },
  footerTitleStyle: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.normal,
  },
  footerBtnStyle: {
    backgroundColor: theme?.lightColor?.linearRed,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: '100%',
    borderRadius: 8,
  },
});

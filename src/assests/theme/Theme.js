import {createTheming} from '@callstack/react-theme-provider';
import {Platform} from 'react-native';

const palette = {
  brandColorsVoxoMobileBlack: 'rgba(161, 218, 253, 0.2)',
  brandColorsVoxoMobileRed:
    'linear-gradient(180deg, #EB3A18 54.69%, #FF7D64 100%)',
  bottomTabBg: 'linear-gradient(180deg, #69C3F9 0%, #0570B0 100%)',
  commitBg: '#69C3F926',
  commitCardBg: 'rgba(105, 195, 249, 0.15)',
  settingInputBg: 'rgba(105, 195, 249, 0.1)',
  notiCardBg: 'rgba(105, 195, 249, 0.12)',
  postMenuBg: 'rgba(105, 195, 249, 0.6)',
  // uiColorsUiDisabled: '#bcc7d3',
  // uiColorsText: '#001520',
  postBorder: 'rgba(105, 195, 249, 0.5)',
};

export const theme = {
  lightColor: {
    newBodyColor: '#f7f7f2',
    bodyColor: '#E6E6E6',
    chatTimeColor: '#C1C0C8',
    chatTitleColor: '#02010E',
    chatBackground: '#F5F6FA',
    yellowColor: '#F0BF0F',
    onLineCircle: '#5AE33D',
    likeColor: '#D20001',
    onLineTitleColor: '#91909A',
    postBorder: palette.postBorder,
    iconFillColor: '#F4F4F4',
    iconFillBorderColor: '#69C3F980',
    gray: '#81848C',
    settingBg: '#69C3F91A',
    blue: '#0B7BC3',
    termsBackground: '#EA3A181A',
    termsBorder: '#EA3A18',
    trueIconRed: '#F24E1E',
    underLine: '#D9D9D9',
    forgotSBg: '#FAFAFA',
    lightBlue: '#84D0FF',
    dropDownColor: '#333333',
    placeholderColor: '#C5C6C8',
    skyActionBlue: palette.brandColorsVoxoMobileBlack,
    linearRed: palette.brandColorsVoxoMobileRed,
    red: '#EA3A18',
    bottomTabBg: palette.bottomTabBg,
    darkGray: '#4E4D4D',
    white: '#FFFFFF',
    black: '#000000',
    splashColor: '#EDF8FF',
    inputBg: '#E7E3E3',
    headerBg: '#69C3F9',
    searchIconBg: '#EA3A18',
    commitBg: palette.commitBg,
    commitTextColor: '#180A29',
    linkColor: '#0E66CC',
    settingInputBg: palette.settingInputBg,
    notificationBg: '#F9F9F9',
    notiCardBg: palette.notiCardBg,
    postInputBg: '#C1C1C1',
    postInputBorder: '#E9E9E9',
    postInputPlaceholder: '#939292',
    postMenuBg: palette.postMenuBg,
    commitCardBg: palette.commitCardBg,
    postTimeColor: '#929292',
    postSecHeading: '#505050',
    postTagColor: '#242323',
    createPostCardBg: '#69C3F999',
    switchBtn: '#F4ECEC',
    ratingStarFillColor: '#D2D0CA',
    cencelBtnColor: '#E1DDDC',
    cencelBtnTitleColor: '#646464',
    greenColor: '#44B700',
    offLineColor: '#FFD35C',
    orangeColor: '#ff7a29'
  },
  // darkColor: {},
  fontWeight: {
    normal: '400',
    regular: '500',
    medium: '600',
    semiBold: '700',
    bold: '800',
  },
  fontFamily: {
    PoppinsItalic:
      Platform.OS === 'android' ? `PoppinsItalic` : `Poppins-Italic`,
    PoppinsBold: Platform.OS === 'android' ? `PoppinsBold` : `Poppins-Bold`,
    PoppinsExtraBold:
      Platform.OS === 'android' ? `PoppinsExtraBold` : `Poppins-ExtraBold`,
    PoppinsExtraLight:
      Platform.OS === 'android' ? `PoppinsExtraLight` : `Poppins-ExtraLight`,
    PoppinsLight: Platform.OS === 'android' ? `PoppinsLight` : `Poppins-Light`,
    PoppinsMedium:
      Platform.OS === 'android' ? `PoppinsMedium` : `Poppins-Medium`,
    PoppinsRegular:
      Platform.OS === 'android' ? `PoppinsRegular` : `Poppins-Regular`,
    PoppinsSemiBold:
      Platform.OS === 'android' ? `PoppinsSemiBold` : `Poppins-SemiBold`,
    PoppinsThin: Platform.OS === 'android' ? `PoppinsThin` : `Poppins-Thin`,
    TinosBold: Platform.OS === 'android' ? `HelveticaBold` : `Helvetica Bold`,
    TinosBoldItalic:
      Platform.OS === 'android' ? `TinosBoldItalic` : `Tinos-BoldItalic`,
    TinosItalic: Platform.OS === 'android' ? `TinosItalic` : `Tinos-Italic`,
    TinosRegular: Platform.OS === 'android' ? `Helvetica` : `Helvetica`,
    times: Platform.OS === 'android' ? `HelveticaBold` : `Helvetica Bold`,
  },
  animation: {
    scale: 1.0,
  },
};

const {ThemeProvider, withTheme, useTheme} = createTheming(theme);

export {ThemeProvider, withTheme, useTheme};

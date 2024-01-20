import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import UserIconSvg from '../../../assests/icons/svg/settingSvgs/UserIconSvg';
import FeedBackIconSvg from '../../../assests/icons/svg/settingSvgs/FeedBackIconSvg';
import NotificationIconSvg from '../../../assests/icons/svg/settingSvgs/NotificationIconSvg';
import PrivacyIconSvg from '../../../assests/icons/svg/settingSvgs/PrivacyIconSvg';
import SettingReportIconSvg from '../../../assests/icons/svg/settingSvgs/SettingReportIconSvg';
import {Button} from '../../../components/common/button/Button';
import LogoutIconSvg from '../../../assests/icons/svg/homeSvgs/LogoutIconSvg';
import UseLogoutHook from '../../../customHooks/authHooks/UseLogoutHook';

export default function Setting({navigation}) {
  const {onLogoutHandler, loading, logoutHanldeError, currentLoginUserData} =
    UseLogoutHook();

  // console.log(currentLoginUserData?.accountType,"user Data");
  const onGoFeedPreferencesScreen = () => {
    navigation.navigate('FeedPreferences');
  };
  const onGoSettingNotificationScreen = () => {
    navigation.navigate('SettingNotification');
  };
  const onGoPrivacyAndSecurityScreen = () => {
    navigation.navigate('PrivacyAndSecurity');
  };
  const onGoContentPerformanceScreen = () => {
    navigation.navigate('ContentPerformance');
  };
  const onGoProfileBUserScreen = () => {
    if (currentLoginUserData?.accountType?.toLowerCase() === 'supplier') {
      navigation.navigate('ProfileCUser');
    } else if (currentLoginUserData?.accountType?.toLowerCase() === 'seller') {
      navigation.navigate('AtypeUserProfile');
    } else if (
      currentLoginUserData?.accountType?.toLowerCase() === 'consultant'
    ) {
      navigation.navigate('ProfileBUser');
    } else {
      navigation.navigate('Setting');
    }
  };
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
            children={'Setting'}
            size={20}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosBold}
            style={{marginBottom: 30}}
          />
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={onGoProfileBUserScreen}>
            <View style={styles.iconContainer}>
              <UserIconSvg height={13} width={13} />
            </View>
            <Text
              children={'Profile'}
              textColor={theme.lightColor.gray}
              size={15}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginLeft: 10}}
              onPressHandler={onGoProfileBUserScreen}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={onGoFeedPreferencesScreen}>
            <View style={styles.iconContainer}>
              <FeedBackIconSvg height={13} width={13} />
            </View>
            <Text
              children={'Feed Preferences'}
              textColor={theme.lightColor.gray}
              size={15}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginLeft: 10}}
              onPressHandler={onGoFeedPreferencesScreen}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={onGoSettingNotificationScreen}>
            <View style={styles.iconContainer}>
              <NotificationIconSvg height={13} width={13} />
            </View>
            <Text
              children={'Notification'}
              textColor={theme.lightColor.gray}
              size={15}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginLeft: 10}}
              onPressHandler={onGoSettingNotificationScreen}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={onGoPrivacyAndSecurityScreen}>
            <View style={styles.iconContainer}>
              <PrivacyIconSvg height={13} width={13} />
            </View>
            <Text
              children={'Privacy & Security'}
              textColor={theme.lightColor.gray}
              size={15}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginLeft: 10}}
              onPressHandler={onGoPrivacyAndSecurityScreen}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={onGoContentPerformanceScreen}>
            <View style={styles.iconContainer}>
              <SettingReportIconSvg height={13} width={13} />
            </View>
            <Text
              children={'Content Performance'}
              textColor={theme.lightColor.gray}
              size={15}
              fonts={theme.fontFamily.TinosRegular}
              style={{marginLeft: 10}}
              onPressHandler={onGoContentPerformanceScreen}
            />
          </TouchableOpacity>
          {logoutHanldeError ? (
            <Text
              children={logoutHanldeError ? logoutHanldeError : false}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.red}
              size={10}
              style={{marginBottom: 4, marginTop: 6}}
              alignText={'center'}
            />
          ) : (
            false
          )}
          <Button
            title={'Logout'}
            titleStyles={styles.btnTitleStyle}
            containerStyle={styles.btnContainerStyles}
            loading={loading}
            onPressHandler={onLogoutHandler}
            renderIconLeft={() => <LogoutIconSvg height={20} width={20} />}
          />
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
  cardContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#69C3F91A',
    borderColor: '#69C3F966',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: theme.lightColor.white,
    borderColor: 'rgba(105, 195, 249, 0.4)',
    borderWidth: 1,
    height: 26,
    width: 26,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitleStyle: {
    color: theme.lightColor.red,
    fontFamily: theme.fontFamily.TinosBold,
    fontSize: 18,
  },
  btnContainerStyles: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 6,
  },
});

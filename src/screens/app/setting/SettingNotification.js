import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import CommonEllipseHeader from '../../../components/common/commonEllipseHeader/CommonEllipseHeader';
import {Text} from '../../../components/common/text/Text';
import {theme} from '../../../assests/theme/Theme';
import ToggleSwitch from 'toggle-switch-react-native';
import {Button} from '../../../components/common/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../../components/common/loader/Loader';
import {
  getNotificationSetting,
  notificationSetting,
} from '../../../redux/actions/NotificationAction';

export default function SettingNotification({navigation}) {
  const dispatch = useDispatch();

  // store data
  const settingData = useSelector(
    store => store?.NotificationReducers?.isNotificationSetting,
  );

  // states
  const [switchOne, setSwitchOne] = useState(false);
  const [switchTwo, setSwitchTwo] = useState(false);
  const [switchThree, setSwitchThree] = useState(false);
  const [switchFour, setSwitchFour] = useState(false);
  const [notificationType, setNotificationType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getNotificationSetting(setIsLoading));
  }, []);

  useEffect(() => {
    if (settingData) {
      setNotificationType(settingData);
    }
  }, [settingData]);

  useEffect(() => {
    if (notificationType?.includes('message')) {
      setSwitchOne(false);
    } else {
      setSwitchOne(true);
    }
    if (notificationType?.includes('like')) {
      setSwitchTwo(false);
    } else {
      setSwitchTwo(true);
    }
    if (notificationType?.includes('comment')) {
      setSwitchThree(false);
    } else {
      setSwitchThree(true);
    }
    if (notificationType?.includes('sharedPost')) {
      setSwitchFour(false);
    } else {
      setSwitchFour(true);
    }
  }, [notificationType]);

  const notificationTypeHandler = data => {
    const notificationTypeSelected = notificationType.includes(data);
    if (notificationTypeSelected) {
      setNotificationType(
        notificationType.filter(selectedItem => selectedItem !== data),
      );
    } else {
      setNotificationType([...notificationType, data]);
    }
  };

  // on save handler
  const onSaveHandler = () => {
    let newData = {
      settingTypes: notificationType,
    };
    dispatch(notificationSetting(newData, setLoading));
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
        {isLoading ? (
          <View
            style={{
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{width: '100%', paddingHorizontal: 25}}>
            <Text
              children={'Notification Settings'}
              size={20}
              textColor={theme.lightColor.darkGray}
              weight={theme.fontWeight.bold}
              fonts={theme.fontFamily.TinosBold}
              style={{marginBottom: 6}}
            />
            {/* switch container */}
            <View style={styles.mainSwitchContainer}>
              <View style={styles.switchContainer}>
                <Text
                  children={'Message'}
                  size={15}
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  style={{marginBottom: 6}}
                />
                <ToggleSwitch
                  isOn={switchOne}
                  onColor={theme.lightColor.headerBg}
                  offColor={theme.lightColor.switchBtn}
                  size="small"
                  onToggle={() => {
                    setSwitchOne(!switchOne);
                    notificationTypeHandler('message');
                  }}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text
                  children={'Likes'}
                  size={15}
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  style={{marginBottom: 6, width: '80%'}}
                />
                <ToggleSwitch
                  isOn={switchTwo}
                  onColor={theme.lightColor.headerBg}
                  offColor={theme.lightColor.switchBtn}
                  size="small"
                  onToggle={() => {
                    setSwitchTwo(!switchTwo);
                    notificationTypeHandler('like');
                  }}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text
                  children={'Comments and replies'}
                  size={15}
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  style={{marginBottom: 6}}
                />
                <ToggleSwitch
                  isOn={switchThree}
                  onColor={theme.lightColor.headerBg}
                  offColor={theme.lightColor.switchBtn}
                  size="small"
                  onToggle={() => {
                    setSwitchThree(!switchThree);
                    notificationTypeHandler('comment');
                  }}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text
                  children={'Share'}
                  size={15}
                  textColor={theme.lightColor.gray}
                  fonts={theme.fontFamily.TinosRegular}
                  style={{marginBottom: 6}}
                />
                <ToggleSwitch
                  isOn={switchFour}
                  onColor={theme.lightColor.headerBg}
                  offColor={theme.lightColor.switchBtn}
                  size="small"
                  onToggle={() => {
                    setSwitchFour(!switchFour);
                    notificationTypeHandler('sharedPost');
                  }}
                />
              </View>
            </View>
            {/* button */}
            <View style={{marginTop: 30}}>
              <Button
                title={'Save'}
                onPressHandler={onSaveHandler}
                titleStyles={styles.titleStyles}
                containerStyle={styles.containerStyle}
                linearGradient={true}
                loading={loading}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  mainSwitchContainer: {
    marginVertical: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
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

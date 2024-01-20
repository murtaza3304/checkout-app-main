import {View, StyleSheet, Pressable, Keyboard, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../assests/theme/Theme';
import BellIconSvg from '../../assests/icons/svg/bottomTabSvgs/BellIconSvg';
import ProfileIconSvg from '../../assests/icons/svg/bottomTabSvgs/ProfileIconSvg';
import HomeIconSvg from '../../assests/icons/svg/bottomTabSvgs/HomeIconSvg';
import ChatIconSvg from '../../assests/icons/svg/bottomTabSvgs/ChatIconSvg';
import NotificationActiveIconSvg from '../../assests/icons/svg/homeSvgs/NotificationActiveIconSvg';
import LinearGradient from 'react-native-linear-gradient';
import ProfileSettingSvg from '../../assests/icons/svg/bottomTabSvgs/ProfileSettingSvg';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
function CustomBottomTabBar({state}) {
  const navigation = useNavigation();

  // store data
  const notificationList = useSelector(
    state => state?.NotificationReducers?.isNotification,
  );

  // state
  const [visible, setVisible] = useState(true);

  // device back handler
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    visible && (
      <LinearGradient colors={['#69C3F9', '#0570B0']} style={styles.wrapper}>
        <View style={styles.bottomTabSContainer}>
          <Pressable
            style={[styles.iconBox]}
            onPress={() => navigation.navigate('Chats')}>
            {state.index == 4 ? (
              <LinearGradient
                colors={['#61C4FF', '#1371AA', '#62BAF0']}
                style={styles.shadow}>
                <ChatIconSvg
                  height={'23px'}
                  width={'23px'}
                  color={theme.lightColor.white}
                />
              </LinearGradient>
            ) : (
              <ChatIconSvg
                height={'23px'}
                width={'23px'}
                color={theme.lightColor.white}
              />
            )}
          </Pressable>
          <Pressable
            style={styles.iconBox}
            onPress={() => navigation.navigate('ProfileBUserSearch')}>
            {state.index == 1 ? (
              <LinearGradient
                colors={['#61C4FF', '#1371AA', '#62BAF0']}
                style={styles.shadow}>
                <ProfileIconSvg
                  height={'23px'}
                  width={'23px'}
                  color={theme.lightColor.white}
                />
              </LinearGradient>
            ) : (
              <ProfileIconSvg
                height={'23px'}
                width={'23px'}
                color={theme.lightColor.white}
              />
            )}
          </Pressable>
          <Pressable
            style={styles.iconBox}
            onPress={() => navigation.navigate('Home')}>
            {state.index == 0 ? (
              <LinearGradient
                colors={['#61C4FF', '#1371AA', '#62BAF0']}
                style={styles.shadow}>
                <HomeIconSvg
                  height={'23px'}
                  width={'25px'}
                  color={theme.lightColor.white}
                />
              </LinearGradient>
            ) : (
              <HomeIconSvg
                height={'23px'}
                width={'25px'}
                color={theme.lightColor.white}
              />
            )}
          </Pressable>
          <Pressable
            style={[styles.iconBox]}
            onPress={() => navigation.navigate('ProfileCUserSearch')}>
            {state.index == 2 ? (
              <LinearGradient
                colors={['#61C4FF', '#1371AA', '#62BAF0']}
                style={styles.shadow}>
                <ProfileSettingSvg
                  height={'23px'}
                  width={'23px'}
                  color={theme.lightColor.white}
                />
              </LinearGradient>
            ) : (
              <ProfileSettingSvg
                height={'23px'}
                width={'23px'}
                color={theme.lightColor.white}
              />
            )}
          </Pressable>
          <Pressable
            style={[styles.iconBox]}
            onPress={() => navigation.navigate('Notification')}>
            {state.index == 3 ? (
              <LinearGradient
                colors={['#61C4FF', '#1371AA', '#62BAF0']}
                style={styles.shadow}>
                {notificationList?.some(item => item?.seen == false) ? (
                  <NotificationActiveIconSvg height={'23px'} width={'23px'} />
                ) : notificationList?.some(item => item?.seen == true) ? (
                  <BellIconSvg
                    height={'23px'}
                    width={'23px'}
                    color={theme.lightColor.white}
                  />
                ) : (
                  <BellIconSvg
                    height={'23px'}
                    width={'23px'}
                    color={theme.lightColor.white}
                  />
                )}
              </LinearGradient>
            ) : notificationList?.some(item => item?.seen == false) ? (
              <NotificationActiveIconSvg height={'23px'} width={'23px'} />
            ) : notificationList?.some(item => item?.seen == true) ? (
              <BellIconSvg
                height={'23px'}
                width={'23px'}
                color={theme.lightColor.white}
              />
            ) : (
              <BellIconSvg
                height={'23px'}
                width={'23px'}
                color={theme.lightColor.white}
              />
            )}
          </Pressable>
        </View>
      </LinearGradient>
    )
  );
}

export default CustomBottomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    height: Platform.OS === 'android' ? 65 : 90,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  bottomTabSContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
});

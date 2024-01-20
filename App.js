// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Store from './src/config/store/Store';
import {ThemeProvider, theme} from './src/assests/theme/Theme';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PermissionsAndroid, Platform} from 'react-native';
import {BASE_URL, STRIPE_PUBLIC_KEY, socket} from './config';
import {StripeProvider} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {GET_OUTSIDE_APP_NOTIFICATION} from './src/redux/types/ActionsTypes';
import axios from 'axios';
import Orientation from 'react-native-orientation-locker';
export const navigationRef = createNavigationContainerRef();
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function clearAndNavigate(name, params) {
  navigationRef.current?.reset({
    index: -1,
    routes: [
      {
        name,
      },
    ],
    params: params,
  });
}
export function navigateToNestedRoute(stackName, screen, params) {
  navigationRef.current?.navigate(stackName, {screen, params});
}

// globel variable
global.currentPage = 1;
global.userBcurrentPage = 1;
global.userCcurrentPage = 1;
global.currentUserPosts = 1;
global.currentSavePostPage = 1;
global.searchPostsPage = 1;
global.chatUserPage = 1;
global.callUserPage = 1;
global.boostPostPage = 1;
global.allPostLikesPage = 1;
global.notificationPages = 1;
global.isNotificationPage = false;
global.isFocusedChatScreen = '';

// get post handler
const getPostHandler = async (data, notificationObj) => {
  try {
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/notification/getNotificationPost`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log(response?.data, 'response in App.js to find post');

    if (response?.data?.success) {
      let newData = {
        ...notificationObj,
        post: response?.data?.post,
      };
      Store.dispatch({
        type: GET_OUTSIDE_APP_NOTIFICATION,
        payload: newData,
      });
    }
  } catch (error) {
    console.log(error, 'get userPost  error');
  }
};

// get user handler
const getUserHandler = async (data, notificationObj) => {
  try {
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/notification/getNotificationUser`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log(response?.data, 'response in App.js to find user');

    if (response?.data?.success) {
      let newData = {
        ...notificationObj,
        user: response?.data?.user,
      };
      Store.dispatch({
        type: GET_OUTSIDE_APP_NOTIFICATION,
        payload: newData,
      });
    }
  } catch (error) {
    console.log(error, 'get user error');
  }
};

// notification functions
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      // console.log(
      //   'Notification caused app to open from quit state:  fired from "getInitialNotification"',
      //   remoteMessage.data,
      // );
      isNotificationPage = true;
      // get data from server
      let notificationObj = JSON.parse(remoteMessage?.data?.type);
      if (notificationObj?.type?.toLowerCase() == 'post') {
        let data = {
          postID: notificationObj?.notificationId,
        };
        getPostHandler(data, notificationObj);
      } else if (notificationObj?.type?.toLowerCase() == 'message') {
        let data = {
          userID: notificationObj?.notificationId,
        };
        getUserHandler(data, notificationObj);
      }
    }
  });
messaging().onMessage(async remoteMessage => {
  // console.log(
  //   'A new fcm  message arrived! for foreground: fired from "onMessage"',
  //   JSON.stringify(remoteMessage),
  // );
  let notificationObj = JSON.parse(remoteMessage?.data?.type);
  if (
    isFocusedChatScreen != notificationObj?.sender?._id ||
    notificationObj?.type?.toLowerCase() != 'message'
  ) {
    PushNotification.channelExists('channel-id', function (exists) {
      // console.log(exists); // true/false
      if (!exists) {
        PushNotification.createChannel({
          channelId: 'channel-id', // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        });
      }
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        playSound: true,
        soundName: 'default',
        vibrate: true,
        vibration: 300,
        priority: 'high',
        importance: 'high',
        visibility: 'public',
        ignoreInForeground: false,
        onlyAlertOnce: false,
        invokeApp: true,
      });
    });
  }
  // get data from server
  if (notificationObj?.type?.toLowerCase() == 'post') {
    let data = {
      postID: notificationObj?.notificationId,
    };
    getPostHandler(data, notificationObj);
  } else if (notificationObj?.type?.toLowerCase() == 'message') {
    let data = {
      userID: notificationObj?.notificationId,
    };
    getUserHandler(data, notificationObj);
  }
});
PushNotification.configure({
  // Handle notifications when the app is in the background or closed
  onNotification: notification => {
    navigateToNestedRoute('BottomTabs', 'Notification');
  },
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log(
  //   'Message handled in the background!:  fired from "setBackgroundMessageHandler"',
  //   remoteMessage,
  // );
  // get data from server
  let notificationObj = JSON.parse(remoteMessage?.data?.type);
  if (notificationObj?.type?.toLowerCase() == 'post') {
    let data = {
      postID: notificationObj?.notificationId,
    };
    getPostHandler(data, notificationObj);
  } else if (notificationObj?.type?.toLowerCase() == 'message') {
    let data = {
      userID: notificationObj?.notificationId,
    };
    getUserHandler(data, notificationObj);
  }
});

messaging().onNotificationOpenedApp(remoteMessage => {
  // console.log(
  //   'Notification caused app to open from background state: fired from "onNotificationOpenedApp" ',
  //   remoteMessage,
  // );
  // get data from server
  let notificationObj = JSON.parse(remoteMessage?.data?.type);
  if (notificationObj?.type?.toLowerCase() == 'post') {
    let data = {
      postID: notificationObj?.notificationId,
    };
    getPostHandler(data, notificationObj);
  } else if (notificationObj?.type?.toLowerCase() == 'message') {
    let data = {
      userID: notificationObj?.notificationId,
    };
    getUserHandler(data, notificationObj);
  }
  navigateToNestedRoute('BottomTabs', 'Notification');
});

// get fcm token
export const getFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  try {
    if (!fcmToken) {
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
      }
    }
  } catch (error) {
    console.log('Failed No token received', error);
  }
};

export default function App() {
  // call socket
  useEffect(() => {
    socket.on('callUser', data => {
      console.log('data recieved: ', data);
      if (data.callType == 'Audio') {
        navigationRef.navigate('AudioCallScreen', {
          user: data,
          type: 'recieved',
        });
      } else {
        navigationRef.navigate('VideoCallScreen', {
          user: data,
          type: 'recieved',
        });
      }
    });
  }, []);

  // get permission
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ]);
    }
  };
  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <Provider store={Store}>
          <ThemeProvider theme={theme}>
            <GestureHandlerRootView style={{flex: 1}}>
              <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
                <NavigationContainer
                  onReady={() => SplashScreen.hide()}
                  ref={navigationRef}>
                  <MainNavigation />
                  <Toast />
                </NavigationContainer>
              </StripeProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </>
  );
}

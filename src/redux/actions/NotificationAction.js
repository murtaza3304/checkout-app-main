import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonToast from '../../components/common/toasts/CommonToast';
import {
  GET_NOTIFICATION_SETTING,
  DELETE_NOTIFIACTION,
  GET_NOTIFIACTION,
  SEEN_NOTIFICATION,
} from '../types/ActionsTypes';
import {BASE_URL} from '../../../config';
const {showToast} = CommonToast();

//get user notifications  action
export const getNotifications =
  (currentPage, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(currentPage, setLoading, setHasReachesEnd, 'data in action');
      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/notification/getAllNotifications?page=${currentPage}&limit=10`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log(
      //   'response in get user Notifications  action',
      //   response?.data?.notifications?.length,
      // );

      if (response?.data?.status == 'success') {
        if (response?.data?.notifications?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: GET_NOTIFIACTION,
          payload: {
            data: response?.data?.notifications,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get userNotification  error');
    } finally {
      setLoading(false);
    }
  };

// notifications seen  action
export const notificationSeen = data => async dispatch => {
  try {
    // console.log(data, 'data in action');

    dispatch({
      type: SEEN_NOTIFICATION,
      payload: data?.notificationId,
    });

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/notification/seenNotification`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in  action', response?.data);
  } catch (error) {
    console.log(error, 'Notification seen error');
  }
};

// delete notification handler
export const notificationDelete = data => async dispatch => {
  try {
    // console.log(data, 'data in action');

    dispatch({
      type: DELETE_NOTIFIACTION,
      payload: data?.notificationId,
    });

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/notification/deleteNotification`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);

    if (response?.data?.status?.toLowerCase() == 'success') {
      showToast({
        title1: 'Deleted success!',
        title2: 'Your notification are successfully deleted.',
        type: 'success',
      });
    }
  } catch (error) {
    console.log(error, 'Notification delete error');
  }
};

// notification setting handler
export const notificationSetting = (data, setLoading) => async dispatch => {
  try {
    // console.log(data, 'data in action');
    setLoading(true);
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/notification/NotificationsSettings`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);

    if (response?.data?.success) {
      showToast({
        title1: 'Updated!',
        title2: 'You have successfully updated your notification setting.',
        type: 'success',
      });
    }
  } catch (error) {
    console.log(error, 'Notification setting error');
  } finally {
    setLoading(false);
  }
};

// get notification setting handler
export const getNotificationSetting = setLoading => async dispatch => {
  try {
    setLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.get(
      `${BASE_URL}/api/notification/getNotificationSettings`,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);

    if (response?.data?.success) {
      dispatch({
        type: GET_NOTIFICATION_SETTING,
        payload: response?.data?.data?.notificationsShown,
      });
    }
  } catch (error) {
    console.log(error, 'Notification setting error');
  } finally {
    setLoading(false);
  }
};

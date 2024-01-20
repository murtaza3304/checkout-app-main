import axios from 'axios';
import {
  CHAT_USERS_GET,
  GET_ALL_MESSAGES,
  GET_CALL_USERS,
  GET_SEND_MESSAGE,
  DELETE_CHAT_USER,
  BLOCK_CHAT_USER,
  CHATS_USERS_GET,
  DELETE_CALL_USER,
} from '../types/ActionsTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../config';
import CommonToast from '../../components/common/toasts/CommonToast';
const {showToast} = CommonToast();

// GET CHAT USER
export const chatUserGet =
  (currentPage, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(currentPage, 'data in action');
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/user/chatAllUsers?page=${currentPage}&limit=10`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data?.response);
      if (response?.data?.status == 'success') {
        if (response?.data?.response?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: CHAT_USERS_GET,
          payload: {
            data: response?.data?.response,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get chat user error');
    } finally {
      setLoading(false);
    }
  };

// get connect user
export const getConnectUser = data => async dispatch => {
  try {
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/user/connectUser`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);
  } catch (error) {
    console.log(error?.response?.data, 'get chat user error');
  }
};

// GET CHAT USERS
export const getChatsUsers = data => async dispatch => {
  try {
    // console.log(data,"data in action");
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
    // console.log('response in action', response?.data);
    if (response?.data?.success) {
      dispatch({
        type: CHATS_USERS_GET,
        payload: response?.data?.user,
      });
    }
  } catch (error) {
    console.log(error, 'get chat user error');
  }
};

//GET CALL USER
export const getCallUser =
  (currentPage, setLoading, setHasReachesCallEnd) => async dispatch => {
    try {
      // console.log(currentPage, 'currentPage in action');
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/user/callAllUsers?page=${currentPage}&limit=10`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log(response?.data?.response, 'response in action');

      if (response?.data?.status == 'success') {
        if (response?.data?.response?.length <= 0) {
          setHasReachesCallEnd(true);
        }
        dispatch({
          type: GET_CALL_USERS,
          payload: {
            data: response?.data.response,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error?.response?.data, 'get chat user error');
    } finally {
      setLoading(false);
    }
  };

// chat send message
export const messageSend = (data, setLoading) => async dispatch => {
  try {
    // console.log(data, 'data--->');
    setLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(`${BASE_URL}/api/message`, data, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);
    if (response?.data?.success) {
      dispatch({
        type: GET_SEND_MESSAGE,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log(error?.response?.data);
  } finally {
    setLoading(false);
  }
};

// get all chat messages
export const getChatMessages = (data, setIsLoading) => async dispatch => {
  try {
    // console.log(data,"data in action get data api");
    setIsLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.get(`${BASE_URL}/api/message/${data}`, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);

    if (response?.data?.success) {
      dispatch({
        type: GET_ALL_MESSAGES,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log(error?.response?.data, 'error in getChatMessages');
  } finally {
    setIsLoading(false);
  }
};

// message seen and unseen
export const messageSeenUnSeen = data => async dispatch => {
  try {
    // console.log(data, 'data in action');
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/seenMessage`,
      {fdId: data},
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);
  } catch (error) {
    console.log(error?.response?.data, 'error in messageSeenUnSeen');
  }
};

// delete chat user
export const deleteChatUser = (data, setIsLoading) => async dispatch => {
  try {
    // console.log(data, 'data in action');
    setIsLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(`${BASE_URL}/api/deleteMessage`, data, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);
    if (response?.data?.success) {
      dispatch({
        type: DELETE_CHAT_USER,
        payload: response?.data,
      });
      showToast({
        title1: 'Deleted success!',
        title2: 'Your chat are successfully deleted.',
        type: 'success',
      });
    }
  } catch (error) {
    console.log(error?.response?.data, 'error in delete user chat');
  } finally {
    setIsLoading(false);
  }
};

// delete call user
export const deleteCallUser = (data, setIsloading) => async dispatch => {
  try {
    // console.log(data, 'data in action');
    setIsloading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/deleteCallHistory`,
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
      dispatch({
        type: DELETE_CALL_USER,
        payload: response?.data,
      });
      showToast({
        title1: 'Deleted success!',
        title2: 'Your call history are successfully deleted.',
        type: 'success',
      });
    }
  } catch (error) {
    console.log(error, 'error in delete user call');
  } finally {
    setIsloading(false);
  }
};

// block user
export const blockUser = (data, setBlockLoading) => async dispatch => {
  try {
    // console.log(data, 'data in action');
    setBlockLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(`${BASE_URL}/api/blockedUser`, data, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);

    if (response?.data?.status) {
      dispatch({
        type: BLOCK_CHAT_USER,
        payload: response?.data,
      });
      showToast({
        title1: 'Successfully!',
        title2: `${response?.data?.message}`,
        type: 'success',
      });
    }
  } catch (error) {
    console.log(error?.response?.data, 'error in block user chat');
  } finally {
    setBlockLoading(false);
  }
};

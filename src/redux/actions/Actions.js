import axios from 'axios';
import {
  TERMS_AND_CONDITIONS,
  PRIVACY_POLICY,
  SEARCH_USER,
  SEARCH_B_USER,
  USER_RATING,
  USER_FEEDBACK,
  GET_USER_FEEDBACK,
  GET_ALL_BOOST_POSTS,
  GET_CONTENT_PERFORMANCE,
} from '../types/ActionsTypes';
import {BASE_URL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonToast from '../../components/common/toasts/CommonToast';
const {showToast} = CommonToast();

// terms and conditions action
export const termsAndConditions =
  (setLoading, setTermsAndConditionsHandlerError) => async dispatch => {
    try {
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(`${BASE_URL}/api/termsConditions`, {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      });
      // console.log('response in action', response?.data);

      // if user get succesfully data then save data in redux
      if (response?.data?.status == 'success') {
        dispatch({
          type: TERMS_AND_CONDITIONS,
          payload: response?.data?.data,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "get terms and conditions error")
      if (error?.response?.data) {
        setTermsAndConditionsHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setTermsAndConditionsHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// privacy policy action
export const privacyPolicy =
  (setLoading, setPrivacyPolicyHandlerError) => async dispatch => {
    try {
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(`${BASE_URL}/api/privacyPolicy`, {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      });
      // console.log('response in action', response?.data);

      // if user get succesfully data then save data in redux
      if (response?.data?.status == 'success') {
        dispatch({
          type: PRIVACY_POLICY,
          payload: response?.data?.data,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "get privacy error")
      if (error?.response?.data) {
        setPrivacyPolicyHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setPrivacyPolicyHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// user search action
export const userSearch =
  (currentPage, data, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(data, "data in action");
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/user/search?page=${currentPage}&limit=5`,
        {...data},
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data?.data);

      // if user get succesfully data then save data in redux
      if (response?.data?.status == 'success') {
        if (response?.data?.data?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: SEARCH_USER,
          payload: {
            data: response?.data?.data,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get user search error');
    } finally {
      setLoading(false);
    }
  };

// user search action
export const userBSearch =
  (currentPage, data, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(data, 'data in action');
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/user/search?page=${currentPage}&limit=8`,
        {...data},
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data?.data);

      // if user get succesfully data then save data in redux
      if (response?.data?.status == 'success') {
        if (response?.data?.data?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: SEARCH_B_USER,
          payload: {
            data: response?.data?.data,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get user search error');
    } finally {
      setLoading(false);
    }
  };

// user rating action
export const userRating = data => async dispatch => {
  try {
    // console.log(data, "data in action");

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(`${BASE_URL}/api/user/addRating`, data, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);

    // if user get succesfully data then save data in redux
    if (response?.data?.status == 'success') {
      dispatch({
        type: USER_RATING,
        payload: response?.data,
      });
    }
  } catch (error) {
    // console.log(error?.response?.data, "get user rating error")
  }
};

// user feedback action
export const userFeedback =
  (data, setLoading, setFeedbackHandlerError) => async dispatch => {
    try {
      // console.log(data, "data in action");
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/feedback`, data, {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      });
      // console.log('response in action', response?.data);

      // if user get succesfully data then save data in redux
      if (response?.data?.status == 'success') {
        dispatch({
          type: USER_FEEDBACK,
          payload: response?.data,
        });
        showToast({
          title1: 'Feedback!',
          title2: 'Your feedback were successfully collected.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "get user feedback error")
      if (error?.response?.data) {
        setFeedbackHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setFeedbackHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// get user feedback action
export const getUserFeedback = (data, setIsLoading) => async dispatch => {
  try {
    // console.log(data,"data in action");
    setIsLoading(true);
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.get(
      `${BASE_URL}/api/feedback/${data}?page=1&limit=10`,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data?.response);
    if (response?.data?.status) {
      dispatch({
        type: GET_USER_FEEDBACK,
        payload: response?.data?.response,
      });
    }
  } catch (error) {
    console.log(error?.response?.data, 'get user feedback error');
  } finally {
    setIsLoading(false);
  }
};

// get all boost posts
export const getAllboostPosts =
  (currentPage, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(currentPage, 'currentPage in action');
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/boost/allActiveBoostPosts?page=${currentPage}&limit=5`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data?.popularPosts);
      if (response?.data?.success) {
        if (response?.data?.popularPosts?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: GET_ALL_BOOST_POSTS,
          payload: {
            data: response?.data?.popularPosts,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error?.response?.data, 'get all boost posts error');
    } finally {
      setLoading(false);
    }
  };

// get content performance
export const getContentPerformance = (data, setLoading) => async dispatch => {
  try {
    setLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/boost/impressionChart`,
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
        type: GET_CONTENT_PERFORMANCE,
        payload: response?.data,
      });
    }
  } catch (error) {
    console.log(error?.response?.data, 'get content performance error');
  } finally {
    setLoading(false);
  }
};

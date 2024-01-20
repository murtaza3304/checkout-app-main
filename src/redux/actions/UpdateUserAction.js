import axios from 'axios';
import {
  UPDATE_VA_USER,
  UPDATE_CONSULTANT_USER,
  UPDATE_SUPPLIER_USER,
  GET_ALL_C_USER,
  GET_ALL_B_USER,
  GET_CURRENT_SINGLE_USER,
} from '../types/AuthActionsTypes';
import {BASE_URL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonToast from '../../components/common/toasts/CommonToast';
const {showToast} = CommonToast();

// update VA user action
export const updateCUser =
  (data, setLoading, setonUpdateUserProfileHandlerError) => async dispatch => {
    try {
      // console.log(data, "my data in action");
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      const token = user?.token;

      const response = await axios.put(
        `${BASE_URL}/api/user/updateProfile`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully SignUp then navigate to Setting

      // if user are succesfully SignUp then save data in redux
      if (response?.data?.success) {
        let storeUserData = {
          user: response?.data?.user,
          token: token,
          success: true,
          message: 'Login Successfully!',
        };
        AsyncStorage.setItem('userDetails', JSON.stringify(storeUserData));
        dispatch({
          type: UPDATE_VA_USER,
          payload: response?.data,
        });
        showToast({
          title1: 'Profile updated!',
          title2: 'Your profile was successfully updated.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "updateCUser response error");
      if (error?.response?.data) {
        setonUpdateUserProfileHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setonUpdateUserProfileHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// update Consultant user action
export const updateAUser =
  (data, setLoading, setonUpdateUserProfileHandlerError) => async dispatch => {
    try {
      // console.log(data, "my data in action");
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      const token = user?.token;

      const response = await axios.put(
        `${BASE_URL}/api/user/updateProfile`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully SignUp then navigate to Setting

      // // if user are succesfully SignUp then save data in redux
      if (response?.data?.success) {
        let storeUserData = {
          user: response?.data?.user,
          token: token,
          success: true,
          message: 'Login Successfully!',
        };
        AsyncStorage.setItem('userDetails', JSON.stringify(storeUserData));
        dispatch({
          type: UPDATE_CONSULTANT_USER,
          payload: response?.data,
        });
        showToast({
          title1: 'Profile updated!',
          title2: 'Your profile was successfully updated.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "updateCUser response error");
      if (error?.response?.data) {
        setonUpdateUserProfileHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setonUpdateUserProfileHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// update supplier user action
export const updateBUser =
  (data, setLoading, setonUpdateUserProfileHandlerError) => async dispatch => {
    try {
      // console.log(data, "my data in action");
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      const token = user?.token;

      const response = await axios.put(
        `${BASE_URL}/api/user/updateProfile`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully SignUp then navigate to Setting

      // // if user are succesfully SignUp then save data in redux
      if (response?.data?.success) {
        let storeUserData = {
          user: response?.data?.user,
          token: token,
          success: true,
          message: 'Login Successfully!',
        };
        AsyncStorage.setItem('userDetails', JSON.stringify(storeUserData));
        dispatch({
          type: UPDATE_SUPPLIER_USER,
          payload: response?.data,
        });
        showToast({
          title1: 'Profile updated!',
          title2: 'Your profile was successfully updated.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "updateCUser response error");
      if (error?.response?.data) {
        setonUpdateUserProfileHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setonUpdateUserProfileHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// update seller user action
export const allCUserSearch =
  (setLoading, setGetCUsersHandlerError) => async dispatch => {
    try {
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/user/userRolesData/supplier`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // // if user are succesfully SignUp then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: GET_ALL_C_USER,
          payload: response?.data?.user,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "updateCUser response error");
      if (error?.response?.data) {
        setGetCUsersHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setGetCUsersHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// update supplier user action
export const allBUserSearch =
  (setLoading, setGetBUsersHandlerError) => async dispatch => {
    try {
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/user/userRolesData/consultant`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // // // if user are succesfully SignUp then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: GET_ALL_B_USER,
          payload: response?.data?.user,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "updateBUser response error");
      if (error?.response?.data) {
        setGetBUsersHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setGetBUsersHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// verifyIdentification
export const verifyIdentification =
  (data, setLoading, navigation, setOnVerifyIdentificationHandlerError) =>
  async dispatch => {
    try {
      // console.log(data, "data in action");
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/user/identify-docs`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully SignUp then save data in redux
      if (response?.data?.status) {
        navigation.navigate('ProfileCompleted');
        showToast({
          title1: 'Request submitted!',
          title2: 'Your Request Send to Admin',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "updateBUser response error");
      if (error?.response?.data) {
        setOnVerifyIdentificationHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setOnVerifyIdentificationHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// get single user
export const getSingleUserHandler =
  (data, setGetDataLoading) => async dispatch => {
    try {
      // console.log(data, 'data in action');
      setGetDataLoading(true);

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
      // console.log(response?.data, 'response in action to find user');

      if (response?.data?.success) {
        dispatch({
          type: GET_CURRENT_SINGLE_USER,
          payload: response?.data?.user,
        });
      }
    } catch (error) {
      console.log(error, 'get user error');
    } finally {
      setGetDataLoading(false);
    }
  };

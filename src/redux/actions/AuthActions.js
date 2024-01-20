import axios from 'axios';
import {
  SIGN_UP_USER,
  LOG_IN_USER,
  CHECK_ALREADY_SIGN_UP_USER,
  USER_FORGOT_PASSWORD,
  USER_OTP_CODE,
  NEW_PASSWORD_CHANGE,
  LOGOUT_USER,
  EMAIL_VERIFICATION_USER,
  RECAPTCHA_CHECK,
  APP_CHANGE_PASSWORD,
  RE_SEND_CODE,
  SAVE_EMAIL,
  NEW_EMAIL_OTP,
  CODE_SIGNUP_RESEND,
} from '../types/AuthActionsTypes';
import {BASE_URL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearAndNavigate} from '../../../App';
import CommonToast from '../../components/common/toasts/CommonToast';
const {showToast} = CommonToast();

// signUp action
export const signUpUser =
  (data, setLoading, navigation, setUserSignUpError) => async dispatch => {
    try {
      // console.log(data, "my data in action");
      setLoading(true);
      dispatch({
        type: SAVE_EMAIL,
        payload: data?.email,
      });

      const response = await axios.post(`${BASE_URL}/api/auth/register`, data);
      // console.log('response in action', response?.data);

      // if user are succesfully SignUp then navigate to home
      if (response?.data?.success) {
        navigation.navigate('EmailVerification');
      }

      // if user are succesfully SignUp then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: SIGN_UP_USER,
          payload: response?.data?.success,
        });
        dispatch({
          type: RE_SEND_CODE,
          payload: true,
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        setUserSignUpError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setUserSignUpError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// email verification
export const emailVerifyUser =
  (data, setLoading, navigation, setOtpCodeHandlerError) => async dispatch => {
    try {
      // console.log(data, "my data in action");
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/auth/otpVerification-signup`,
        data,
      );
      // console.log('response in action', response?.data);
      // if user are succesfully SignUp then navigate to home
      if (response?.data?.success) {
        navigation.navigate('WelComeScreen');
      }

      // if user are succesfully Login then save data in async storage
      if (response?.data?.success) {
        let storeLoginUserData = response?.data;
        AsyncStorage.setItem('userDetails', JSON.stringify(storeLoginUserData));
      }

      // if user are succesfully SignUp then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: EMAIL_VERIFICATION_USER,
          payload: response?.data,
        });
        dispatch({
          type: RE_SEND_CODE,
          payload: false,
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        // console.log(error.response.data, "err---->")
        setOtpCodeHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setOtpCodeHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// logIn action
export const logInUser =
  (data, setLoading, navigation, setUserLoginError) => async dispatch => {
    try {
      // console.log(data, "my login data in action");
      setLoading(true);
      dispatch({
        type: SAVE_EMAIL,
        payload: data?.email,
      });

      const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
      // console.log('response login in action', response?.data);

      // if user are succesfully Login then navigate to home
      if (response?.data?.user?.isVerified) {
        navigation.navigate('AppStack', {
          isNotificationPage: false,
        });
      } else {
        navigation.navigate('EmailVerification');
        dispatch({
          type: RE_SEND_CODE,
          payload: true,
        });
      }

      // if user are succesfully Login then save data in async storage
      if (response?.data?.success) {
        let storeLoginUserData = response?.data;
        AsyncStorage.setItem('userDetails', JSON.stringify(storeLoginUserData));
      }

      // if user are succesfully Login then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: LOG_IN_USER,
          payload: response?.data,
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        setUserLoginError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setUserLoginError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// check user already signup action
export const checkUserAlreadySignUp = (data, navigation) => async dispatch => {
  try {
    // console.log(data, "my checkUserAlreadySignUp data in action");
    const response = await axios.get(`${BASE_URL}/api/auth/getUser`, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: data,
      },
    });
    // console.log('response check user already signup action', response?.data);

    // if user are succesfully checkAlready Signup then navigate to home
    // console.log(response.data)
    if (response?.data?.success) {
      dispatch({
        type: CHECK_ALREADY_SIGN_UP_USER,
        payload: response?.data,
      });
      if (isNotificationPage) {
        navigation.replace('AppStack', {
          isNotificationPage: true,
        });
      } else {
        navigation.replace('AppStack', {
          isNotificationPage: false,
        });
      }
    } else {
      navigation.replace('AuthStack');
    }
  } catch (error) {
    // console.log(error?.response?.data, "checkUserAlreadySignUp error");
  }
};

// forgot password action
export const userPasswordForgot =
  (data, setLoading, navigation, setForgotPasswordError) => async dispatch => {
    try {
      // console.log(data, "my forgot password data in action");
      setLoading(true);

      dispatch({
        type: SAVE_EMAIL,
        payload: data?.email,
      });

      const response = await axios.post(
        `${BASE_URL}/api/auth/forgot-password`,
        data,
      );
      // console.log('response check user forget password action', response?.data);

      // if user are succesfully checkAlready Signup then navigate to home
      if (response?.data?.success) {
        navigation.navigate('OtpCodeScreen');
      }

      // if user are succesfully forgot password then save data in redux
      if (response?.data?.success) {
        showToast({
          title1: 'Success!',
          title2: 'Code was sent successfully!',
          type: 'success',
        });
        dispatch({
          type: USER_FORGOT_PASSWORD,
          payload: response?.data?.timestamp,
        });
        dispatch({
          type: RE_SEND_CODE,
          payload: true,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "checkUserAlreadySignUp error");
      if (error?.response?.data) {
        setForgotPasswordError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setForgotPasswordError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// Re send code action
export const reSendCode = data => async dispatch => {
  try {
    // console.log(data, "my forgot password data in action");
    dispatch({
      type: RE_SEND_CODE,
      payload: true,
    });

    const response = await axios.post(
      `${BASE_URL}/api/auth/forgot-password`,
      data,
    );
    // console.log('response check user forget password action', response?.data);

    // if user are succesfully forgot password then save data in redux
    if (response?.data?.success) {
      dispatch({
        type: CODE_SIGNUP_RESEND,
        payload: response?.data,
      });
      showToast({
        title1: 'Success!',
        title2: 'Code was sent successfully!',
        type: 'success',
      });
      dispatch({
        type: USER_FORGOT_PASSWORD,
        payload: response?.data?.timestamp,
      });
    }
  } catch (error) {
    // console.log(error?.response?.data, "checkUserAlreadySignUp error");
    if (error?.response?.data) {
      console.log(error?.response?.data?.message);
    } else {
      // console.log('error in response', error.toString().slice(12));
      let newError = error.toString().slice(12);
      console.log(newError);
    }
  }
};

// Re send code sign up action
export const reSendCodeSignup = data => async dispatch => {
  try {
    // console.log(data, "my forgot password data in action");
    dispatch({
      type: RE_SEND_CODE,
      payload: true,
    });

    const response = await axios.post(`${BASE_URL}/api/auth/resendOTP`, data);

    // console.log('response check user forget password action', response?.data);

    // if user are succesfully forgot password then save data in redux
    if (response?.data?.success) {
      dispatch({
        type: CODE_SIGNUP_RESEND,
        payload: response?.data,
      });
      showToast({
        title1: 'Success!',
        title2: 'Code was sent successfully!',
        type: 'success',
      });
    }
  } catch (error) {
    // console.log(error?.response?.data, "checkUserAlreadySignUp error");
    if (error?.response?.data) {
      console.log(error?.response?.data?.message);
    } else {
      // console.log('error in response', error.toString().slice(12));
      let newError = error.toString().slice(12);
      console.log(newError);
    }
  }
};

// otp code action
export const userOtpCode =
  (data, setLoading, navigation, setOtpCodeHandlerError) => async dispatch => {
    try {
      // console.log(data, "my otp code data in action");
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/auth/otpVerification`,
        data,
      );
      // console.log('response check user otp code action', response?.data);

      // if user are succesfully checkAlready Signup then navigate to home
      if (response?.data) {
        navigation.navigate('ChangePasswordScreen');
      }

      // if user are succesfully forgot password then save data in redux
      if (response?.data) {
        dispatch({
          type: USER_OTP_CODE,
          payload: response?.data,
        });
        dispatch({
          type: RE_SEND_CODE,
          payload: false,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "checkUserAlreadySignUp error");
      if (error?.response?.data) {
        setOtpCodeHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setOtpCodeHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// change new password
export const changeNewPassword =
  (data, setLoading, navigation, setChangePasswordHandlerError) =>
  async dispatch => {
    try {
      // console.log(data, "my change password data in action");
      setLoading(true);
      let newPasswordData = {
        password: data?.password,
      };

      const response = await axios.post(
        `${BASE_URL}/api/auth/change-password`,
        newPasswordData,
        {
          headers: {
            Authorization: `Bearer ${data?.userToken}`,
            'access-control-allow-origin': '*',
          },
        },
      );
      // console.log('response check user change password action', response?.data);

      // if user are succesfully checkAlready Signup then navigate to home
      if (response?.data) {
        navigation.navigate('SuccessChangePasswordScreen');
      }

      // if user are succesfully forgot password then save data in redux
      if (response?.data) {
        dispatch({
          type: NEW_PASSWORD_CHANGE,
          payload: response?.data,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "checkUserAlreadySignUp error");
      if (error?.response?.data) {
        setChangePasswordHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setChangePasswordHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// App change password
export const appChangeNewPassword =
  (data, setLoading, navigation, setChangePasswordHandlerError) =>
  async dispatch => {
    try {
      // console.log(data, "my change password data in action");
      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/auth/changeAppPassword`,
        data,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response check user change password action', response?.data);

      if (response?.data?.success) {
        navigation?.navigate('Setting');
        dispatch({
          type: APP_CHANGE_PASSWORD,
          payload: response?.data,
        });
        showToast({
          title1: 'Password changed!',
          title2: 'Your password were successfully changed.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "checkUserAlreadySignUp error");
      if (error?.response?.data) {
        setChangePasswordHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setChangePasswordHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// email change handler
export const emailChange =
  (data, setLoading, setEmailChangeHandlerError) => async dispatch => {
    try {
      // console.log(data, "my change email data in action");
      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/auth/changeEmail`,
        data,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response check user change email action', response?.data);

      // if user are succesfully forgot password then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: NEW_EMAIL_OTP,
          payload: response?.data,
        });
        showToast({
          title1: 'OTP send!',
          title2: 'OTP sent to the new email address for verification.',
          type: 'success',
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        setEmailChangeHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setEmailChangeHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// emailChange otp
export const otpEmailChange =
  (data, setLoading, setEmailChangeHandlerError) => async dispatch => {
    try {
      // console.log(data, "my change email data in action");
      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/auth/verifyEmailChange`,
        data,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response check user change email otp action', response?.data);

      // if user are succesfully forgot password then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: NEW_EMAIL_OTP,
          payload: null,
        });
        AsyncStorage.clear();
        clearAndNavigate('AuthStack');
        showToast({
          title1: 'Email changed!',
          title2:
            'The email address has been changed successfully. Please login again using this new email.',
          type: 'success',
        });
      }
    } catch (error) {
      if (error?.response?.data) {
        setEmailChangeHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setEmailChangeHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// logout handler
export const logoutUser =
  (data, setLoading, setLogoutHanldeError) => async dispatch => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/auth/logout`, data);
      // console.log('response check logout action', response?.data);

      // if user are succesfully logout then navigate to auth stack
      if (response?.data?.success) {
        await AsyncStorage.clear();
        clearAndNavigate('AuthStack');
        dispatch({
          type: LOGOUT_USER,
        });
        showToast({
          title1: 'Success!',
          title2: 'Logged out Successfully.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "checkUserAlreadySignUp error");
      if (error?.response?.data) {
        setLogoutHanldeError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setLogoutHanldeError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// check reCaptcha handler
export const checkReCaptcha = data => async dispatch => {
  try {
    // console.log(data, "data in action");
    const response = await axios.post(`${BASE_URL}/verifyRecaptcha`, {
      recaptchaToken: data,
    });
    // console.log('response in action', response?.data);
    if (response?.data?.success) {
      dispatch({
        type: RECAPTCHA_CHECK,
        payload: response?.data,
      });
    }
  } catch (error) {
    console.log(error?.response?.data, 'ReCaptcha error');
  }
};

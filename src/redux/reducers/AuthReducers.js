import {
  LOG_IN_USER,
  SIGN_UP_USER,
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

// initial state
const initialState = {
  isSignUpUser: null,
  isLoginUser: null,
  isUserAlreadySignUp: null,
  isUserForgotPassword: null,
  isUserOtpCodeData: null,
  isUserChangePassword: null,
  isUserLogout: null,
  user: null,
  isUserEmailVerify: null,
  checkReCaptcha: null,
  isUserAppPasswordChange: null,
  isReSendCode: false,
  isSaveEmail: '',
  isNewEmailOtp: null,
  isCode_SignUp_Resend: null,
};

export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    // SignUp User
    case SIGN_UP_USER:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isSignUpUser: action?.payload,
        user: action?.payload?.user,
      };

    // email verification
    case EMAIL_VERIFICATION_USER:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isUserEmailVerify: action?.payload,
        user: action?.payload?.user,
      };

    // Login User
    case LOG_IN_USER:
      // console.log(action?.payload, "my data in login");
      return {
        ...state,
        isLoginUser: action?.payload,
        user: action?.payload?.user,
      };

    // User Already SignUp
    case CHECK_ALREADY_SIGN_UP_USER:
      // console.log(action?.payload, "my data in checkAlready SignUp");
      return {
        ...state,
        isUserAlreadySignUp: action?.payload,
        user: action?.payload?.user,
      };

    // User forgot password
    case USER_FORGOT_PASSWORD:
      // console.log(action?.payload, "my data in forgot password");
      return {
        ...state,
        isUserForgotPassword: action?.payload,
        user: action?.payload?.user,
      };

    // User otp code
    case USER_OTP_CODE:
      // console.log(action?.payload, "my data in otp code");
      return {
        ...state,
        isUserOtpCodeData: action?.payload,
        user: action?.payload?.user,
      };

    // User change password
    case NEW_PASSWORD_CHANGE:
      // console.log(action?.payload, "my data in change password");
      return {
        ...state,
        isUserChangePassword: action?.payload,
        user: action?.payload?.user,
      };

    case APP_CHANGE_PASSWORD:
      // console.log(action?.payload, "my data in change password");
      return {
        ...state,
        isUserAppPasswordChange: action?.payload,
        user: action?.payload?.user,
      };

    // User Logout
    case LOGOUT_USER:
      return initialState;

    // check recaptcha
    case RECAPTCHA_CHECK:
      return {
        ...state,
        checkReCaptcha: action?.payload,
      };

    // resend code
    case RE_SEND_CODE:
      return {
        ...state,
        isReSendCode: action?.payload,
      };

    // save email
    case SAVE_EMAIL:
      return {
        ...state,
        isSaveEmail: action?.payload,
      };

    // new email otp
    case NEW_EMAIL_OTP:
      return {
        ...state,
        isNewEmailOtp: action?.payload,
      };

    // isCode_SignUp_Resend
    case CODE_SIGNUP_RESEND:
      return {
        ...state,
        isCode_SignUp_Resend: action?.payload,
      };

    default:
      return state;
  }
}

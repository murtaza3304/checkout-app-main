import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {reSendCode, userOtpCode} from '../../redux/actions/AuthActions';

export default function UseOtpHook({navigation}) {
  const dispatch = useDispatch();

  // Store Data
  const currentUserLoginData = useSelector(
    store => store?.AuthReducers?.isUserOtpCodeData,
  );
  // console.log(currentUserLoginData, "currentUserLoginData in hook");

  const saveEmail = useSelector(store => store?.AuthReducers?.isSaveEmail);

  // states
  const [optCode, setOtpCode] = useState('');
  const [optCodeError, setOptCodeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpCodeHandlerError, setOtpCodeHandlerError] = useState('');

  // validate otp code
  const validateOtp = e => {
    setOtpCode(e);
    if (e === '') {
      setOptCodeError('*Required!');
    } else {
      if (e.length < 6) {
        setOptCodeError('Enter 6 digits valid code!');
      } else {
        const numberPattern = /^\d+$/;
        const isNumber = numberPattern.test(e);
        if (!isNumber) {
          setOptCodeError('Invalid code!');
        } else {
          setOptCodeError('');
        }
      }
    }
  };

  // otp code handler
  const otpCodeHandler = () => {
    setOtpCodeHandlerError('');
    if (!optCode) {
      setOptCodeError('*Required!');
    } else {
      if (optCode && !optCodeError) {
        let otpCodeData = {
          otp: optCode,
        };
        // console.log(otpCodeData, "otpCodeData");
        dispatch(
          userOtpCode(
            otpCodeData,
            setLoading,
            navigation,
            setOtpCodeHandlerError,
          ),
        );

        setOtpCode('');
      }
    }
  };

  // resend code handler
  const onResendCodeHandler = () => {
    setOtpCodeHandlerError('');
    if (!saveEmail) {
      return;
    } else {
      if (saveEmail) {
        let forgotPasswordData = {
          email: saveEmail?.toLowerCase(),
        };
        // console.log(forgotPasswordData, "forgotPasswordData");
        dispatch(reSendCode(forgotPasswordData));
      }
    }
  };

  return {
    validateOtp,
    otpCodeHandler,
    optCode,
    optCodeError,
    otpCodeHandlerError,
    loading,
    onResendCodeHandler,
  };
}
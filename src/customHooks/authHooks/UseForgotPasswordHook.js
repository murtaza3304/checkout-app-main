import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userPasswordForgot} from '../../redux/actions/AuthActions';

export default function UseForgotPasswordHook({navigation}) {
  const dispatch = useDispatch();

  // Store Data
  const currentUserLoginData = useSelector(
    store => store?.AuthReducers?.isUserForgotPassword,
  );
  // console.log(currentUserLoginData, "currentUserLoginData in hook");

  // states
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  // validate email
  const validateEmail = e => {
    setEmail(e);
    let checkEmail = String(e).match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    );
    if (e === '') {
      setEmailError('*Required!');
    } else if (e.includes(' ')) {
      setEmailError('Space is not allowed!');
    } else if (!checkEmail) {
      setEmailError('Email is not correct!');
    } else {
      setEmailError('');
    }
  };

  // forgot password handler
  const forgotPasswordHandler = () => {
    setForgotPasswordError('');
    if (!email) {
      setEmailError('*Required!');
    } else {
      if (email && !emailError) {
        let forgotPasswordData = {
          email: email?.toLowerCase(),
        };
        // console.log(forgotPasswordData, "forgotPasswordData");
        dispatch(
          userPasswordForgot(
            forgotPasswordData,
            setLoading,
            navigation,
            setForgotPasswordError,
          ),
        );
      }
    }
  };

  return {
    forgotPasswordHandler,
    validateEmail,
    email,
    emailError,
    loading,
    forgotPasswordError,
  };
}

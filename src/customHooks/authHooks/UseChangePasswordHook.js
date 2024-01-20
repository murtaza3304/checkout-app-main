import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeNewPassword,
  appChangeNewPassword,
} from '../../redux/actions/AuthActions';

export default function UseChangePasswordHook({navigation}) {
  const dispatch = useDispatch();

  // Store Data
  const currentUserLoginData = useSelector(
    store => store?.AuthReducers?.isUserOtpCodeData,
  );
  const currentLoginData = useSelector(store => store?.AuthReducers.user);
  const currentUserPasswordData = useSelector(
    store => store?.AuthReducers?.isUserChangePassword,
  );
  const getUserUpdateData = useSelector(
    store => store?.AuthReducers.isUserAlreadySignUp,
  );
  // console.log(currentUserLoginData, "currentUserLoginData in hook");
  // console.log(currentUserPasswordData, "currentUserPasswordData in hook");
  // console.log(getUserUpdateData?.user?.token,"getUserUpdateData");
  // console.log(currentLoginData?.email, "currentLoginData");

  // states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setconfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [changePasswordHandlerError, setChangePasswordHandlerError] =
    useState('');

  // hide show icon one
  const [passwordHideShowOne, setPasswordHideShowOne] = useState(true);
  const passwordHideShowOneHandle = () => {
    setPasswordHideShowOne(!passwordHideShowOne);
  };

  // hide show icon two
  const [passwordHideShowTwo, setPasswordHideShowTwo] = useState(true);
  const passwordHideShowTwoHandle = () => {
    setPasswordHideShowTwo(!passwordHideShowTwo);
  };

  // validate old password
  const validateOldPassword = e => {
    setOldPassword(e);
    if (e === '') {
      setOldPasswordError('*Required!');
    } else {
      let checkPassword = String(e).match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      );
      if (!checkPassword) {
        setOldPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else if (e.length < 8) {
        setOldPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else {
        setOldPasswordError('');
      }
    }
  };

  // validate new password
  const validateNewPassword = e => {
    setNewPassword(e);
    if (e === '') {
      setNewPasswordError('*Required!');
    } else {
      let checkPassword = String(e).match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      );
      if (!checkPassword) {
        setNewPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else if (e.length < 8) {
        setNewPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else {
        setNewPasswordError('');
      }
    }
  };

  // validate confirm password
  const validateConfirmPassword = e => {
    setConfirmPassword(e);
    if (e === '') {
      setconfirmPasswordError('*Required!');
    } else {
      let checkPassword = String(e).match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      );
      if (!checkPassword) {
        setconfirmPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else if (e.length < 8) {
        setconfirmPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else {
        setconfirmPasswordError('');
      }
    }
  };

  // confirm password handler
  const confirmPasswordHandler = () => {
    setChangePasswordHandlerError('');
    if (!newPassword && !confirmPassword) {
      setNewPasswordError('*Required!');
      setconfirmPasswordError('*Required!');
      return;
    } else if (!newPassword) {
      setNewPasswordError('New password is empty!');
    } else if (!confirmPassword) {
      setconfirmPasswordError('Re-enter new password is empty!');
    } else if (confirmPassword !== newPassword) {
      setconfirmPasswordError(
        'The password you entered did not match the new password!',
      );
    } else {
      if (
        newPassword &&
        confirmPassword &&
        !newPasswordError &&
        !confirmPasswordError
      ) {
        let changeUserPasswordData = {
          password: newPassword,
          userToken: currentUserLoginData?.token,
        };
        // console.log(changeUserPasswordData, "changeUserPasswordData");
        dispatch(
          changeNewPassword(
            changeUserPasswordData,
            setLoading,
            navigation,
            setChangePasswordHandlerError,
          ),
        );
        setNewPassword('');
        setConfirmPassword('');
      }
    }
  };

  // app change password
  const appConfirmPasswordHandler = () => {
    setChangePasswordHandlerError('');
    if (!oldPassword && !newPassword && !confirmPassword) {
      setOldPasswordError('*Required!');
      setNewPasswordError('*Required!');
      setconfirmPasswordError('*Required!');
      return;
    } else if (!oldPassword) {
      setOldPasswordError('Old password is empty!');
    } else if (!newPassword) {
      setNewPasswordError('New password is empty!');
    } else if (!confirmPassword) {
      setconfirmPasswordError('Re-enter new password is empty!');
    } else if (confirmPassword !== newPassword) {
      setconfirmPasswordError(
        'The password you entered did not match the new password!',
      );
    } else {
      if (
        oldPassword &&
        newPassword &&
        confirmPassword &&
        !oldPasswordError &&
        !newPasswordError &&
        !confirmPasswordError
      ) {
        let changeUserPasswordData = {
          oldPassword: oldPassword,
          newPassword: confirmPassword,
        };
        // console.log(changeUserPasswordData, "changeUserPasswordData");
        dispatch(
          appChangeNewPassword(
            changeUserPasswordData,
            setLoading,
            navigation,
            setChangePasswordHandlerError,
          ),
        );
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    }
  };

  return {
    validateNewPassword,
    validateConfirmPassword,
    newPasswordError,
    newPassword,
    loading,
    changePasswordHandlerError,
    confirmPassword,
    confirmPasswordError,
    confirmPasswordHandler,
    passwordHideShowOneHandle,
    passwordHideShowOne,
    passwordHideShowTwo,
    passwordHideShowTwoHandle,
    getUserUpdateData,
    currentLoginData,
    appConfirmPasswordHandler,
    validateOldPassword,
    oldPassword,
    oldPasswordError,
  };
}

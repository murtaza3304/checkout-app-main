import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logInUser} from '../../redux/actions/AuthActions';
import axios from 'axios';
import DeviceCountry from 'react-native-device-country';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFcmToken} from '../../../App';

export default function UseLoginHook({navigation}) {
  const dispatch = useDispatch();
  // Store Data
  const currentUserLoginData = useSelector(
    store => store?.AuthReducers?.isLoginUser,
  );
  const [countryGet, setCountryGet] = useState('');
  // console.log(currentUserLoginData, "currentUserLoginData in hook");

  const getCurrentCountries = async () => {
    DeviceCountry?.getCountryCode()
      .then(async res => {
        // console.log('country: ', res);
        try {
          // console.log(getCountry(),"getCountry()")
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${res?.code}`,
          );
          // console.log(response?.data[0]?.name?.common, 'response');
          if (response?.data[0]?.name?.common) {
            setCountryGet(response?.data[0]?.name?.common);
          }
        } catch (error) {
          console.log(error, 'error to find country');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCurrentCountries();
  }, []);

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLoginError, setUserLoginError] = useState('');

  // validate password
  const validatePassword = e => {
    setPassword(e);
    if (e === '') {
      setPasswordError('*Required!');
    } else {
      setPasswordError('');
    }
  };

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

  // login handler
  const onLoginHandler = async () => {
    setUserLoginError('');
    await getFcmToken();
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!email && !password) {
      setEmailError('*Required!');
      setPasswordError('*Required!');
      return;
    } else if (!email) {
      setEmailError('Email is empty!');
    } else if (!password) {
      setPasswordError('Password is empty!');
    } else {
      if (email && password && fcmToken && !emailError && !passwordError) {
        let loginUserData = {
          email: email?.toLowerCase(),
          password,
          country: countryGet,
          deviceToken: fcmToken,
        };
        // console.log(loginUserData, "loginUser");
        dispatch(
          logInUser(loginUserData, setLoading, navigation, setUserLoginError),
        );
      }
    }
  };

  return {
    email,
    password,
    onLoginHandler,
    validateEmail,
    emailError,
    validatePassword,
    passwordError,
    loading,
    userLoginError,
  };
}

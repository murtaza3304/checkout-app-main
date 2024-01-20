import {useState, useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser, checkReCaptcha} from '../../redux/actions/AuthActions';
import axios from 'axios';
import DeviceCountry from 'react-native-device-country';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFcmToken} from '../../../App';

export default function UseSignUpHook({navigation}) {
  const dispatch = useDispatch();
  // Store Data
  // const currentUserData = useSelector((store) => store?.AuthReducers?.checkReCaptcha);
  // console.log(currentUserData, "currentUserData in hook");
  const [countryGet, setCountryGet] = useState('');
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [accountTypeError, setAccountTypeError] = useState('');
  const [isFocusedTermsError, setisFocusedTermsError] = useState('');
  // const [isFocusedReCaptchaError, setisFocusedReCaptchaError] = useState('')
  const [isFocusedTerms, setIsFocusedTerms] = useState(false);
  // const [isFocusedReCaptcha, setisFocusedReCaptcha] = useState(false)
  const [loading, setLoading] = useState(false);
  const [userSignUpError, setUserSignUpError] = useState('');
  // const [token, setToken] = useState('');
  // const recaptcha = useRef(null);
  const [openMessage, setOpenMessage] = useState(false);
  const onpenMessageHandler = () => {
    setOpenMessage(!openMessage);
  };
  // isFocused Terms
  const termsIconShowHandler = () => {
    setOpenMessage(false);
    setIsFocusedTerms(!isFocusedTerms);
    if (isFocusedTerms) {
      setisFocusedTermsError('Please agree to terms and conditions!');
    } else {
      setisFocusedTermsError('');
    }
  };

  // isFocused Captcha
  // const captchaIconShowHandler = () => {
  //     recaptcha.current?.open();
  //     setisFocusedReCaptchaError('')
  //     setisFocusedReCaptcha(false)
  // }

  // close captcha
  // const handleClosePress = useCallback(() => {
  //     recaptcha.current?.close();
  // }, []);

  // validate password
  const validatePassword = e => {
    setPassword(e);
    if (e === '') {
      setPasswordError('*Required!');
    } else {
      let checkPassword = String(e).match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      );
      if (!checkPassword) {
        setPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else if (e.length < 8) {
        setPasswordError(
          'Your password must be at least 8 characters containing a lowercase letter, an uppercase letter, a number, and a special character!',
        );
      } else {
        setPasswordError('');
      }
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

  // validate lastName
  const validateLastName = e => {
    setLastName(e);
    if (e === '') {
      setLastNameError('*Required!');
    } else {
      let checkLastName = String(e)
        .toLowerCase()
        .match(/^[A-Za-z\s\-!@#$%^&*()_+={}[\]:;"'<>,.?/\\|]+$/);
      if (!checkLastName) {
        setLastNameError('Last Name is not correct!');
      } else if (e.length < 2) {
        setLastNameError('Must be at least 2 characters!');
      } else {
        setLastNameError('');
      }
    }
  };

  // validate firstName
  const validateFirstName = e => {
    setFirstName(e);
    if (e === '') {
      setFirstNameError('*Required!');
    } else {
      let checkFirstName = String(e)
        .toLowerCase()
        .match(/^[A-Za-z\s\-!@#$%^&*()_+={}[\]:;"'<>,.?/\\|]+$/);
      if (!checkFirstName) {
        setFirstNameError('First Name is not correct!');
      } else if (e.length < 2) {
        setFirstNameError('Must be at least 2 characters!');
      } else {
        setFirstNameError('');
      }
    }
  };

  // account Type
  const validateAccountType = e => {
    setOpenMessage(false);
    setAccountTypeError('');
    if (e === 'VA or Consultant') {
      let newVal = e.slice(6).toLowerCase();
      setAccountType(newVal);
      // console.log(newVal, "newVal");
    } else {
      let newValue = e.toLowerCase();
      setAccountType(newValue);
      // console.log(newValue, "newValue");
    }
  };

  // signup handler
  const onSignUpHandler = async () => {
    setUserSignUpError('');
    setOpenMessage(false);
    await getFcmToken();
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (
      !firstName &&
      !lastName &&
      !email &&
      !password &&
      !accountType &&
      !isFocusedTerms
      // && !isFocusedReCaptcha
    ) {
      setFirstNameError('*Required!');
      setLastNameError('*Required!');
      setEmailError('*Required!');
      setPasswordError('*Required!');
      // setisFocusedReCaptchaError('*Required!');
      setAccountTypeError('*Required!');
      setisFocusedTermsError('*Required!');
      return;
    } else if (!accountType) {
      setAccountTypeError('Account type is not selected!');
    } else if (!firstName) {
      setFirstNameError('First Name is empty!');
    } else if (!lastName) {
      setLastNameError('Last Name is empty!');
    } else if (!email) {
      setEmailError('Email is empty!');
    } else if (!password) {
      setPasswordError('Password is empty!');
    } else if (!isFocusedTerms) {
      setisFocusedTermsError('Please agree to terms and conditions!');
    }
    // else
    // if (!isFocusedReCaptcha) {
    //     setisFocusedReCaptchaError('Fill recaptcha!')
    // }
    else {
      if (
        firstName &&
        lastName &&
        email &&
        password &&
        accountType &&
        isFocusedTerms &&
        fcmToken &&
        // && isFocusedReCaptcha
        !firstNameError &&
        !lastNameError &&
        !emailError &&
        !passwordError &&
        !accountTypeError &&
        !isFocusedTermsError
        // && !isFocusedReCaptchaError
      ) {
        // if (currentUserData?.success) {
        let signupUserData = {
          firstName,
          lastName,
          email: email?.toLowerCase(),
          password,
          accountType,
          country: countryGet,
          deviceToken: fcmToken,
        };
        // console.log(signupUserData, 'signUpUser');
        dispatch(
          signUpUser(
            signupUserData,
            setLoading,
            navigation,
            setUserSignUpError,
          ),
        );
        // }

        // if (!userSignUpError) {
        //     setAccountType('')
        //     setFirstName('')
        //     setLastName('')
        //     setEmail('')
        //     setPassword('')
        //     setIsFocusedTerms(false)
        // }
        // setisFocusedReCaptcha(false)
      }
    }
  };

  // reCaptcha Handler
  // const reCaptchaHandler = (newToken) => {
  //     dispatch(checkReCaptcha(newToken))
  // }

  return {
    firstName,
    lastName,
    email,
    password,
    accountType,
    validateAccountType,
    onSignUpHandler,
    passwordError,
    validatePassword,
    emailError,
    validateEmail,
    firstNameError,
    validateFirstName,
    lastNameError,
    validateLastName,
    isFocusedTerms,
    termsIconShowHandler,
    // isFocusedReCaptcha,
    // captchaIconShowHandler,
    accountTypeError,
    isFocusedTermsError,
    // isFocusedReCaptchaError,
    loading,
    userSignUpError,
    // handleClosePress,
    // recaptcha,
    // setToken,
    // token,
    // setisFocusedReCaptcha,
    // setisFocusedReCaptchaError,
    // reCaptchaHandler,
    onpenMessageHandler,
    setOpenMessage,
    openMessage,
  };
}

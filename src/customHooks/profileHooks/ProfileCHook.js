import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {
  updateCUser,
  allCUserSearch,
} from '../../redux/actions/UpdateUserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileCHook({navigation}) {
  const dispatch = useDispatch();

  const currentUserLoginData = useSelector(store => store?.AuthReducers.user);
  const getAllUpdatedUserData = useSelector(
    store => store?.UpdateUserReducer.isGetAllUpdatedUser,
  );
  const currentUpdateUserData = useSelector(
    store => store?.UpdateUserReducer.updateUser,
  );
  const currentUserData = useSelector(
    store => store?.AuthReducers?.isUserAlreadySignUp,
  );
  // console.log(getAllUpdatedUserData,"getAllUpdatedUserData");

  // get asyncStorage data
  useEffect(() => {
    async function fetchData() {
      AsyncStorage.getItem('userDetails')
        .then(response => {
          let user = JSON.parse(response);
          if (user) {
            let links =
              user?.user?.businessName && user?.user?.businessName?.length > 0
                ? user?.user?.businessName
                : [];
            let newLinks = links?.filter(link => link !== '' && link !== null);
            let affLinks =
              user?.user?.website && user?.user?.website?.length > 0
                ? user?.user?.website
                : [];
            let newAffLinks = affLinks?.filter(
              link => link !== '' && link !== null,
            );
            setFirstName(user?.user?.firstName);
            setLastName(user?.user?.lastName);
            setPhoneNumber(user?.user?.phoneNo);
            setLinkCounter(newLinks?.length > 0 ? newLinks?.length - 1 : 0);
            setBusinessName(newLinks?.length > 0 ? newLinks[0] : '');
            setBusinessNameOne(newLinks?.length > 0 ? newLinks[1] : '');
            setBusinessNameTwo(newLinks?.length > 0 ? newLinks[2] : '');
            setBusinessNameThree(newLinks?.length > 0 ? newLinks[3] : '');
            setBusinessNameFour(newLinks?.length > 0 ? newLinks[4] : '');
            setwebCounter(
              newAffLinks?.length > 0 ? newAffLinks?.length - 1 : 0,
            );
            setBusinessEmail(user?.user?.businessEmail);
            setWebsiteName(newAffLinks?.length > 0 ? newAffLinks[0] : '');
            setWebsiteNameOne(newAffLinks?.length > 0 ? newAffLinks[1] : '');
            setWebsiteNameTwo(newAffLinks?.length > 0 ? newAffLinks[2] : '');
            setWebsiteNameThree(newAffLinks?.length > 0 ? newAffLinks[3] : '');
            setWebsiteNameFour(newAffLinks?.length > 0 ? newAffLinks[4] : '');
            setBusinessCategory(
              user?.user?.businessCategory &&
                user?.user?.businessCategory?.length > 0
                ? user?.user?.businessCategory
                : [],
            );
            setProductCategory(
              user?.user?.productCategory &&
                user?.user?.productCategory?.length > 0
                ? user?.user?.productCategory
                : [],
            );
            setUserDescription(user?.user?.description);
          }
        })
        .catch(error => {
          console.error('Error while fetching user details:', error);
        });
    }
    fetchData();
  }, []);

  // states
  const [imageUri, setImageUri] = useState('');
  const [imageShow, setImageShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessEmailError, setBusinessEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessNameOne, setBusinessNameOne] = useState('');
  const [businessNameTwo, setBusinessNameTwo] = useState('');
  const [businessNameThree, setBusinessNameThree] = useState('');
  const [businessNameFour, setBusinessNameFour] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteNameError, setWebsiteNameError] = useState('');
  const [websiteNameOne, setWebsiteNameOne] = useState('');
  const [websiteNameErrorOne, setWebsiteNameErrorOne] = useState('');
  const [websiteNameTwo, setWebsiteNameTwo] = useState('');
  const [websiteNameErrorTwo, setWebsiteNameErrorTwo] = useState('');
  const [websiteNameThree, setWebsiteNameThree] = useState('');
  const [websiteNameErrorThree, setWebsiteNameErrorThree] = useState('');
  const [websiteNameFour, setWebsiteNameFour] = useState('');
  const [websiteNameErrorFour, setWebsiteNameErrorFour] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [businessCategory, setBusinessCategory] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onUpdateUserProfileHandlerError, setonUpdateUserProfileHandlerError] =
    useState('');
  const [getCUsersHandlerError, setGetCUsersHandlerError] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [linkCounter, setLinkCounter] = useState(0);
  const [webCounter, setwebCounter] = useState(0);
  const onpenMessageHandler = () => {
    setOpenMessage(!openMessage);
  };

  // pick up image
  const pickUpImageHandler = async () => {
    try {
      setImageUri('');
      setonUpdateUserProfileHandlerError('');
      setOpenMessage(false);
      setImageShow(false);
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker?.types?.images],
      });
      // console.log(doc, 'result image');
      if (doc) {
        setImageUri(doc?.uri);
        setImageShow(true);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // console.log("user cencel the upload image", error);
      } else {
        console.log(error);
      }
    }
  };

  // validate lastName
  const validateLastName = e => {
    setLastName(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setLastNameError('');
    } else {
      let checkLastName = String(e)
        .toLowerCase()
        .match(/^[A-Za-z\s\-!@#$%^&*()_+={}[\]:;"'<>,.?/\\|]+$/);
      if (!checkLastName) {
        setLastNameError('Invalid Last Name!');
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
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setFirstNameError('');
    } else {
      let checkFirstName = String(e)
        .toLowerCase()
        .match(/^[A-Za-z\s\-!@#$%^&*()_+={}[\]:;"'<>,.?/\\|]+$/);
      if (!checkFirstName) {
        setFirstNameError('Invalid First Name!');
      } else if (e.length < 2) {
        setFirstNameError('Must be at least 2 characters!');
      } else {
        setFirstNameError('');
      }
    }
  };

  // validate email
  const validateBusinessEmail = e => {
    setBusinessEmail(e);
    let checkEmail = String(e).match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    );
    if (e === '') {
      setBusinessEmailError('*Required!');
    } else if (e.includes(' ')) {
      setBusinessEmailError('Space is not allowed!');
    } else if (!checkEmail) {
      setBusinessEmailError('Email is not correct!');
    } else {
      setBusinessEmailError('');
    }
  };

  // validate phone number
  const validatePhoneNumber = e => {
    setPhoneNumber(e);
    setonUpdateUserProfileHandlerError('');
  };

  // validate business name
  const validateBusinessName = e => {
    setBusinessName(e);
    setonUpdateUserProfileHandlerError('');
  };

  // validate business name one
  const validateBusinessNameOne = e => {
    setBusinessNameOne(e);
    setonUpdateUserProfileHandlerError('');
  };

  // validate business name two
  const validateBusinessNameTwo = e => {
    setBusinessNameTwo(e);
    setonUpdateUserProfileHandlerError('');
  };

  // validate business name three
  const validateBusinessNameThree = e => {
    setBusinessNameThree(e);
    setonUpdateUserProfileHandlerError('');
  };

  // validate business name four
  const validateBusinessNameFour = e => {
    setBusinessNameFour(e);
    setonUpdateUserProfileHandlerError('');
  };

  // validate website name
  const validateWebsiteName = e => {
    setWebsiteName(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setWebsiteNameError('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setWebsiteNameError('Invalid URL!');
      } else {
        setWebsiteNameError('');
      }
    }
  };

  // validate business name one
  const validateWebsiteNameOne = e => {
    setWebsiteNameOne(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setWebsiteNameErrorOne('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setWebsiteNameErrorOne('Invalid URL!');
      } else {
        setWebsiteNameErrorOne('');
      }
    }
  };

  // validate business name two
  const validateWebsiteNameTwo = e => {
    setWebsiteNameTwo(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setWebsiteNameErrorTwo('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setWebsiteNameErrorTwo('Invalid URL!');
      } else {
        setWebsiteNameErrorTwo('');
      }
    }
  };

  // validate business name three
  const validateWebsiteNameThree = e => {
    setWebsiteNameThree(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setWebsiteNameErrorThree('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setWebsiteNameErrorThree('Invalid URL!');
      } else {
        setWebsiteNameErrorThree('');
      }
    }
  };

  // validate business name four
  const validateWebsiteNameFour = e => {
    setWebsiteNameFour(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setWebsiteNameErrorFour('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setWebsiteNameErrorFour('Invalid URL!');
      } else {
        setWebsiteNameErrorFour('');
      }
    }
  };

  // validate description
  const validateDescription = e => {
    setUserDescription(e);
    setonUpdateUserProfileHandlerError('');
  };

  // onUpdateUserProfileHandler
  const onUpdateUserProfileHandler = () => {
    setOpenMessage(false);
    setonUpdateUserProfileHandlerError('');
    if (
      !imageUri &&
      !firstName &&
      !lastName &&
      !phoneNumber &&
      !businessName &&
      !websiteName &&
      businessCategory?.length <= 0 &&
      productCategory?.length <= 0 &&
      !userDescription
    ) {
      setonUpdateUserProfileHandlerError('*All fields is empty!');
      return;
    } else {
      if (imageUri) {
        RNFS.readFile(imageUri, 'base64')
          .then(res => {
            // console.log(res, "image response");
            if (res) {
              dispatch(
                updateCUser(
                  {
                    firstName: firstName,
                    lastName: lastName,
                    description: userDescription,
                    phoneNo: phoneNumber,
                    businessName: [
                      businessName,
                      businessNameOne,
                      businessNameTwo,
                      businessNameThree,
                      businessNameFour,
                    ],
                    website: [
                      websiteName,
                      websiteNameOne,
                      websiteNameTwo,
                      websiteNameThree,
                      websiteNameFour,
                    ],
                    businessCategory: businessCategory,
                    productCategory: productCategory,
                    file: res,
                    businessEmail: businessEmail,
                  },
                  setLoading,
                  setonUpdateUserProfileHandlerError,
                ),
              );
              navigation.navigate('Setting');
            }
          })
          .catch(err => {
            console.log(err, 'err image');
          });
      } else {
        dispatch(
          updateCUser(
            {
              firstName: firstName,
              lastName: lastName,
              description: userDescription,
              phoneNo: phoneNumber,
              businessName: [
                businessName,
                businessNameOne,
                businessNameTwo,
                businessNameThree,
                businessNameFour,
              ],
              website: [
                websiteName,
                websiteNameOne,
                websiteNameTwo,
                websiteNameThree,
                websiteNameFour,
              ],
              businessCategory: businessCategory,
              productCategory: productCategory,
              businessEmail: businessEmail,
            },
            setLoading,
            setonUpdateUserProfileHandlerError,
          ),
        );
        navigation.navigate('Setting');
      }
    }
  };

  // get C users
  const getCUsersHandler = setLoading => {
    dispatch(allCUserSearch(setLoading, setGetCUsersHandlerError));
  };
  return {
    pickUpImageHandler,
    imageShow,
    imageUri,
    firstName,
    firstNameError,
    validateFirstName,
    lastName,
    lastNameError,
    validateLastName,
    phoneNumber,
    validatePhoneNumber,
    businessName,
    validateBusinessName,
    businessNameOne,
    validateBusinessNameOne,
    businessNameTwo,
    validateBusinessNameTwo,
    businessNameThree,
    validateBusinessNameThree,
    businessNameFour,
    validateBusinessNameFour,
    onUpdateUserProfileHandler,
    userDescription,
    websiteName,
    websiteNameError,
    websiteNameOne,
    websiteNameErrorOne,
    websiteNameTwo,
    websiteNameErrorTwo,
    websiteNameThree,
    websiteNameErrorThree,
    websiteNameFour,
    websiteNameErrorFour,
    validateWebsiteName,
    validateWebsiteNameOne,
    validateWebsiteNameTwo,
    validateWebsiteNameThree,
    validateWebsiteNameFour,
    validateDescription,
    businessCategory,
    setBusinessCategory,
    productCategory,
    setProductCategory,
    loading,
    onUpdateUserProfileHandlerError,
    currentUserLoginData,
    getCUsersHandler,
    getAllUpdatedUserData,
    getCUsersHandlerError,
    currentUserData,
    setLoading,
    currentUpdateUserData,
    setOpenMessage,
    onpenMessageHandler,
    openMessage,
    linkCounter,
    setLinkCounter,
    webCounter,
    setwebCounter,
    validateBusinessEmail,
    businessEmail,
    businessEmailError,
  };
}

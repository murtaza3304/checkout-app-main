import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {
  updateBUser,
  allBUserSearch,
} from '../../redux/actions/UpdateUserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileBHook({navigation}) {
  const dispatch = useDispatch();

  const currentUserLoginData = useSelector(store => store?.AuthReducers.user);
  const getAllUpdatedUserData = useSelector(
    store => store?.UpdateUserReducer.isGetAllUpdatedBUser,
  );
  const currentUpdateUserData = useSelector(
    store => store?.UpdateUserReducer.updateUser,
  );

  // get asyncStorage data
  useEffect(() => {
    async function fetchData() {
      AsyncStorage.getItem('userDetails')
        .then(response => {
          let user = JSON.parse(response);
          if (user) {
            let links =
              user?.user?.otherProfessionalLinks &&
              user?.user?.otherProfessionalLinks?.length > 0
                ? user?.user?.otherProfessionalLinks
                : [];
            let newLinks = links?.filter(link => link !== '' && link !== null);
            let affLinks =
              user?.user?.affiliatedAgency &&
              user?.user?.affiliatedAgency?.length > 0
                ? user?.user?.affiliatedAgency
                : [];
            let newAffLinks = affLinks?.filter(
              link => link !== '' && link !== null,
            );
            setFirstName(user?.user?.firstName);
            setLastName(user?.user?.lastName);
            setFacebookLink(user?.user?.facebookLink);
            setLinkedInLink(user?.user?.linkedinLink);
            setUpworkLink(user?.user?.upworkLink);
            setLinkCounter(newLinks?.length > 0 ? newLinks?.length - 1 : 0);
            setProfessionalLink(newLinks?.length > 0 ? newLinks[0] : '');
            setProfessionalLinkOne(newLinks?.length > 0 ? newLinks[1] : '');
            setProfessionalLinkTwo(newLinks?.length > 0 ? newLinks[2] : '');
            setProfessionalLinkThree(newLinks?.length > 0 ? newLinks[3] : '');
            setProfessionalLinkFour(newLinks?.length > 0 ? newLinks[4] : '');
            setPlatformCategory(
              user?.user?.ecommercePlatform &&
                user?.user?.ecommercePlatform?.length > 0
                ? user?.user?.ecommercePlatform
                : [],
            );
            setToolsCategory(
              user?.user?.toolsUsed && user?.user?.toolsUsed?.length > 0
                ? user?.user?.toolsUsed
                : [],
            );
            setBusinessEmail(user?.user?.businessEmail);
            setAgancyCounter(
              newAffLinks?.length > 0 ? newAffLinks?.length - 1 : 0,
            );
            setAgencyLink(newAffLinks?.length > 0 ? newAffLinks[0] : '');
            setAgencyLinkOne(newAffLinks?.length > 0 ? newAffLinks[1] : '');
            setAgencyLinkTwo(newAffLinks?.length > 0 ? newAffLinks[2] : '');
            setAgencyLinkThree(newAffLinks?.length > 0 ? newAffLinks[3] : '');
            setAgencyLinkFour(newAffLinks?.length > 0 ? newAffLinks[4] : '');
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
  const [facebookLink, setFacebookLink] = useState('');
  const [facebookLinkError, setFacebookLinkError] = useState('');
  const [linkedInLink, setLinkedInLink] = useState('');
  const [linkedInLinkError, setLinkedInLinkError] = useState('');
  const [upworkLink, setUpworkLink] = useState('');
  const [upworkLinkError, setUpworkLinkError] = useState('');
  const [ProfessionalLink, setProfessionalLink] = useState('');
  const [ProfessionalLinkError, setProfessionalLinkError] = useState('');
  const [ProfessionalLinkOne, setProfessionalLinkOne] = useState('');
  const [ProfessionalLinkErrorOne, setProfessionalLinkErrorOne] = useState('');
  const [ProfessionalLinkTwo, setProfessionalLinkTwo] = useState('');
  const [ProfessionalLinkErrorTwo, setProfessionalLinkErrorTwo] = useState('');
  const [ProfessionalLinkThree, setProfessionalLinkThree] = useState('');
  const [ProfessionalLinkErrorThree, setProfessionalLinkErrorThree] =
    useState('');
  const [ProfessionalLinkFour, setProfessionalLinkFour] = useState('');
  const [ProfessionalLinkErrorFour, setProfessionalLinkErrorFour] =
    useState('');
  const [platformCategory, setPlatformCategory] = useState([]);
  const [toolsCategory, setToolsCategory] = useState([]);
  const [agencyLink, setAgencyLink] = useState('');
  const [agencyLinkError, setAgencyLinkError] = useState('');
  const [agencyLinkOne, setAgencyLinkOne] = useState('');
  const [agencyLinkErrorOne, setAgencyLinkErrorOne] = useState('');
  const [agencyLinkTwo, setAgencyLinkTwo] = useState('');
  const [agencyLinkErrorTwo, setAgencyLinkErrorTwo] = useState('');
  const [agencyLinkThree, setAgencyLinkThree] = useState('');
  const [agencyLinkErrorThree, setAgencyLinkErrorThree] = useState('');
  const [agencyLinkFour, setAgencyLinkFour] = useState('');
  const [agencyLinkErrorFour, setAgencyLinkErrorFour] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [onUpdateUserProfileHandlerError, setonUpdateUserProfileHandlerError] =
    useState('');
  const [getBUsersHandlerError, setGetBUsersHandlerError] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [linkCounter, setLinkCounter] = useState(0);
  const [agancyCounter, setAgancyCounter] = useState(0);
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
      console.log(doc, 'result image');
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
      } else {
        setFirstNameError('');
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
      } else {
        setLastNameError('');
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

  // validate facebook url
  const validateFacebookLink = e => {
    setFacebookLink(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setFacebookLinkError('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setFacebookLinkError('Invalid URL!');
      } else {
        setFacebookLinkError('');
      }
    }
  };

  // validate linkedin url
  const validateLinkedInLink = e => {
    setLinkedInLink(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setLinkedInLinkError('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setLinkedInLinkError('Invalid URL!');
      } else {
        setLinkedInLinkError('');
      }
    }
  };

  // validate upwork url
  const validateUpworkLink = e => {
    setUpworkLink(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setUpworkLinkError('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setUpworkLinkError('Invalid URL!');
      } else {
        setUpworkLinkError('');
      }
    }
  };

  // validate professional url
  const validateProfessionalLink = e => {
    setProfessionalLink(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setProfessionalLinkError('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setProfessionalLinkError('Invalid URL!');
      } else {
        setProfessionalLinkError('');
      }
    }
  };

  // validate business name one
  const validateProfessionalLinkOne = e => {
    setProfessionalLinkOne(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setProfessionalLinkErrorOne('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setProfessionalLinkErrorOne('Invalid URL!');
      } else {
        setProfessionalLinkErrorOne('');
      }
    }
  };

  // validate business name two
  const validateProfessionalLinkTwo = e => {
    setProfessionalLinkTwo(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setProfessionalLinkErrorTwo('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setProfessionalLinkErrorTwo('Invalid URL!');
      } else {
        setProfessionalLinkErrorTwo('');
      }
    }
  };

  // validate business name three
  const validateProfessionalLinkThree = e => {
    setProfessionalLinkThree(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setProfessionalLinkErrorThree('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setProfessionalLinkErrorThree('Invalid URL!');
      } else {
        setProfessionalLinkErrorThree('');
      }
    }
  };

  // validate business name four
  const validateProfessionalLinkFour = e => {
    setProfessionalLinkFour(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setProfessionalLinkErrorFour('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setProfessionalLinkErrorFour('Invalid URL!');
      } else {
        setProfessionalLinkErrorFour('');
      }
    }
  };

  // validate professional url
  const validateAgencyLink = e => {
    setAgencyLink(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setAgencyLinkError('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setAgencyLinkError('Invalid URL!');
      } else {
        setAgencyLinkError('');
      }
    }
  };

  // validate business name one
  const validateAgencyLinkOne = e => {
    setAgencyLinkOne(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setAgencyLinkErrorOne('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setAgencyLinkErrorOne('Invalid URL!');
      } else {
        setAgencyLinkErrorOne('');
      }
    }
  };

  // validate business name two
  const validateAgencyLinkTwo = e => {
    setAgencyLinkTwo(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setAgencyLinkErrorTwo('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setAgencyLinkErrorTwo('Invalid URL!');
      } else {
        setAgencyLinkErrorTwo('');
      }
    }
  };

  // validate business name three
  const validateAgencyLinkThree = e => {
    setAgencyLinkThree(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setAgencyLinkErrorThree('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setAgencyLinkErrorThree('Invalid URL!');
      } else {
        setAgencyLinkErrorThree('');
      }
    }
  };

  // validate business name four
  const validateAgencyLinkFour = e => {
    setAgencyLinkFour(e);
    setonUpdateUserProfileHandlerError('');
    if (e === '') {
      setAgencyLinkErrorFour('');
    } else {
      let checkURLName =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      let url = checkURLName?.test(e);
      if (!url) {
        setAgencyLinkErrorFour('Invalid URL!');
      } else {
        setAgencyLinkErrorFour('');
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
      !facebookLink &&
      !linkedInLink &&
      !upworkLink &&
      !ProfessionalLink &&
      platformCategory?.length <= 0 &&
      toolsCategory?.length <= 0 &&
      !agencyLink &&
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
                updateBUser(
                  {
                    firstName: firstName,
                    lastName: lastName,
                    facebookLink: facebookLink,
                    linkedinLink: linkedInLink,
                    upworkLink: upworkLink,
                    otherProfessionalLinks: [
                      ProfessionalLink,
                      ProfessionalLinkOne,
                      ProfessionalLinkTwo,
                      ProfessionalLinkThree,
                      ProfessionalLinkFour,
                    ],
                    ecommercePlatform: platformCategory,
                    toolsUsed: toolsCategory,
                    affiliatedAgency: [
                      agencyLink,
                      agencyLinkOne,
                      agencyLinkTwo,
                      agencyLinkThree,
                      agencyLinkFour,
                    ],
                    description: userDescription,
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
          updateBUser(
            {
              firstName: firstName,
              lastName: lastName,
              facebookLink: facebookLink,
              linkedinLink: linkedInLink,
              upworkLink: upworkLink,
              otherProfessionalLinks: [
                ProfessionalLink,
                ProfessionalLinkOne,
                ProfessionalLinkTwo,
                ProfessionalLinkThree,
                ProfessionalLinkFour,
              ],
              ecommercePlatform: platformCategory,
              toolsUsed: toolsCategory,
              affiliatedAgency: [
                agencyLink,
                agencyLinkOne,
                agencyLinkTwo,
                agencyLinkThree,
                agencyLinkFour,
              ],
              description: userDescription,
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
  const getBUsersHandler = setLoading => {
    dispatch(allBUserSearch(setLoading, setGetBUsersHandlerError));
  };
  return {
    currentUserLoginData,
    pickUpImageHandler,
    imageShow,
    imageUri,
    firstName,
    firstNameError,
    validateFirstName,
    lastName,
    lastNameError,
    validateLastName,
    facebookLink,
    facebookLinkError,
    validateFacebookLink,
    linkedInLink,
    linkedInLinkError,
    validateLinkedInLink,
    upworkLink,
    upworkLinkError,
    validateUpworkLink,
    ProfessionalLink,
    ProfessionalLinkError,
    validateProfessionalLink,
    ProfessionalLinkOne,
    ProfessionalLinkErrorOne,
    validateProfessionalLinkOne,
    ProfessionalLinkTwo,
    ProfessionalLinkErrorTwo,
    validateProfessionalLinkTwo,
    ProfessionalLinkThree,
    ProfessionalLinkErrorThree,
    validateProfessionalLinkThree,
    ProfessionalLinkFour,
    ProfessionalLinkErrorFour,
    validateProfessionalLinkFour,
    platformCategory,
    setPlatformCategory,
    toolsCategory,
    setToolsCategory,
    agencyLink,
    agencyLinkError,
    validateAgencyLink,
    agencyLinkOne,
    agencyLinkErrorOne,
    validateAgencyLinkOne,
    agencyLinkTwo,
    agencyLinkErrorTwo,
    validateAgencyLinkTwo,
    agencyLinkThree,
    agencyLinkErrorThree,
    validateAgencyLinkThree,
    agencyLinkFour,
    agencyLinkErrorFour,
    validateAgencyLinkFour,
    validateDescription,
    userDescription,
    onUpdateUserProfileHandler,
    loading,
    onUpdateUserProfileHandlerError,
    getBUsersHandler,
    getBUsersHandlerError,
    getAllUpdatedUserData,
    setLoading,
    currentUpdateUserData,
    setOpenMessage,
    openMessage,
    onpenMessageHandler,
    linkCounter,
    agancyCounter,
    setLinkCounter,
    setAgancyCounter,
    validateBusinessEmail,
    businessEmail,
    businessEmailError,
  };
}

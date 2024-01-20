import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {createPostUser, updatePostUser} from '../../redux/actions/PostAction';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {createThumbnail} from 'react-native-create-thumbnail';
import axios from 'axios';
import DeviceCountry from 'react-native-device-country';

export default function CreatePostHook({navigation, route}) {
  const dispatch = useDispatch();
  // console.log(route?.params?.postCardData?.file, "navigation post data");

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
  const [imageUri, setImageUri] = useState([]);
  const [videoUri, setVideoUri] = useState([]);
  const [postInput, setPostInput] = useState('');
  const [privacyStatus, setPrivacyStatus] = useState('public');
  const [privacyStatusError, setPrivacyStatusError] = useState('');
  const [postInputError, setPostInputError] = useState('');
  const [onCreatePostHandlerError, setOnCreatePostHandlerError] = useState('');
  const [onUpdatePostHandlerError, setOnUpdatePostHandlerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [collectHashtags, setCollectHashtags] = useState([]);
  const [hashTagError, setHashTagError] = useState('');
  const [flag, setFlag] = useState(false);
  const [updatePostId, setupdatePostId] = useState(false);
  const [mediaSizeError, setMediaSizeError] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);
  const [videoMediaLoading, setVideoMediaLoading] = useState(false);

  useEffect(() => {
    var temArr = [];
    route?.params?.postCardData?.file.forEach((element, index) => {
      if (element?.type?.toLowerCase() == 'video') {
        setVideoMediaLoading(true);
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'mp4',
        })
          .fetch('GET', element.fileKey, {})
          .then(res => {
            createThumbnail({
              url:
                Platform?.OS === 'ios'
                  ? res.path(res.path())
                  : `file://${res.path(res.path())}`,
              timeStamp: 10000,
            })
              .then(response => {
                temArr.push({...element, file: response?.path});
                if (
                  temArr?.length == route?.params?.postCardData?.file.length
                ) {
                  setImageUri(
                    temArr.filter(item => item?.type.toLowerCase() == 'image'),
                  );
                  setVideoUri(
                    temArr.filter(item => item?.type.toLowerCase() == 'video'),
                  );
                }
              })
              .catch(err => console.log({err}));
            setVideoMediaLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
      if (element?.type?.toLowerCase() == 'image') {
        setMediaLoading(true);
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'png',
        })
          .fetch('GET', element.fileKey, {})
          .then(res => {
            temArr.push({...element, file: 'file://' + res.path()});
            //   console.log(temArr + "if")
            //  console.log('The file saved to ', res.readFile());
            if (index == route?.params?.postCardData?.file.length - 1) {
              // console.log(temArr + "LastIndex")
              setImageUri(
                temArr.filter(item => item?.type.toLowerCase() == 'image'),
              );
              setVideoUri(
                temArr.filter(item => item?.type.toLowerCase() == 'video'),
              );
            }
            setMediaLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // console.log(temArr + "else")
      }
      // console.log(temArr+ 'tempArr')
      if (index == route?.params?.postCardData?.file.length - 1) {
        // console.log(temArr + "LastIndex")
        setImageUri(temArr.filter(item => item?.type.toLowerCase() == 'image'));
        setVideoUri(temArr.filter(item => item?.type.toLowerCase() == 'video'));
      }
    });
  }, []);

  useEffect(() => {
    if (route?.params?.postCardData) {
      setFlag(true);
      setPostInput(route?.params?.postCardData?.text);
      setupdatePostId(route?.params?.postCardData?._id);
      setCollectHashtags(route?.params?.postCardData?.hashtags);
    }
  }, []);

  // remove image
  const onRemoveImage = data => {
    let removeUri = imageUri?.filter(item => item?.file !== data);
    setImageUri(removeUri);
  };

  // remove video
  const onRemoveVideo = data => {
    let removeUri = videoUri?.filter(item => item?.file !== data);
    setVideoUri(removeUri);
  };

  // pick up image
  const pickUpImageHandler = async () => {
    try {
      setMediaLoading(true);
      setMediaSizeError('');
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker?.types?.images],
        allowMultiSelection: true,
      });
      // console.log(doc, "result image");
      if (doc?.length > 0) {
        let allUri = doc?.map(item => {
          if (item?.size <= 10728640) {
            return {file: item?.uri, type: 'image'};
          } else {
            setMediaSizeError(
              'Photo size is limited to 10MB. Video size is limited to 30MB!',
            );
            return {file: null, type: 'error'};
          }
        });
        let mediaFiles = allUri?.filter(item => item?.type !== 'error');
        setImageUri(prev => [...prev, ...mediaFiles]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('user cencel the upload image', error);
      } else {
        console.log(error);
      }
    } finally {
      setMediaLoading(false);
    }
  };

  // pick up video
  const pickUpVideoHandler = async () => {
    try {
      setVideoMediaLoading(true);
      setMediaSizeError('');
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker?.types?.video],
        allowMultiSelection: true,
      });
      // console.log(doc, "result video");
      if (doc?.length > 0) {
        let allUri = doc?.map(item => {
          if (item?.size <= 30728640) {
            return {file: item?.uri, type: 'video'};
          } else {
            setMediaSizeError(
              'Photo size is limited to 10MB. Video size is limited to 30MB!',
            );
            return {file: null, type: 'error'};
          }
        });
        let mediaFiles = allUri?.filter(item => item?.type !== 'error');
        setVideoUri(prev => [...prev, ...mediaFiles]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('user cencel the upload video', error);
      } else {
        console.log(error);
      }
    } finally {
      setVideoMediaLoading(false);
    }
  };

  // validate privacy status
  const validatePrivacyStatusType = e => {
    setPrivacyStatusError('');
    setPrivacyStatus(e);
  };

  // validate text
  const validatePostText = e => {
    setPostInput(e);
    if (e === '') {
      setPostInputError('');
    } else {
      setPostInputError('');
    }
  };

  // hashtags error
  useEffect(() => {
    if (collectHashtags?.length > 0) {
      setHashTagError('');
    }
  }, [collectHashtags]);

  // create post
  const onSubmitHandler = async () => {
    setOnCreatePostHandlerError('');
    setMediaSizeError('');
    if (!privacyStatus && collectHashtags?.length <= 0) {
      setPrivacyStatusError('*Required!');
      setHashTagError('*Required!');
    } else if (!privacyStatus) {
      setPrivacyStatusError('PrivacyStatus is not selected!');
    } else if (collectHashtags?.length <= 0) {
      setHashTagError('Hashtags is not selected!');
    } else if (!imageUri && !videoUri && !postInput) {
      setOnCreatePostHandlerError('Select at least one field!');
    } else {
      if (
        privacyStatus &&
        collectHashtags?.length > 0 &&
        !privacyStatusError &&
        !hashTagError
      ) {
        const uriManage = [...imageUri, ...videoUri];
        const newArrayData = [];

        if (uriManage?.length > 0) {
          uriManage?.map(item => {
            RNFS?.readFile(item?.file, 'base64')
              .then(res => {
                // console.log('base64 log ios====>======>>>>>', res);
                newArrayData?.push({file: res, type: item?.type});
                if (newArrayData?.length == uriManage?.length) {
                  dispatch(
                    createPostUser(
                      {
                        file: newArrayData,
                        privacyStatus: privacyStatus,
                        text: postInput,
                        fileType: 'media',
                        hashtags: collectHashtags,
                        country: countryGet?.toLowerCase(),
                      },
                      setLoading,
                      setOnCreatePostHandlerError,
                    ),
                  );
                  navigation.navigate('Home');
                }
              })
              .catch(err => {
                console.log(err, 'err Base64');
              });
          });
        } else {
          if (postInput) {
            dispatch(
              createPostUser(
                {
                  privacyStatus: privacyStatus,
                  text: postInput,
                  hashtags: collectHashtags,
                  fileType: 'text',
                  file: [],
                  country: countryGet?.toLowerCase(),
                },
                setLoading,
                setOnCreatePostHandlerError,
              ),
            );
            navigation.navigate('Home');
          } else {
            setOnCreatePostHandlerError('Select at least one field!');
          }
        }
      }
    }
  };

  // update handler
  const onUpdateHandler = async () => {
    setOnUpdatePostHandlerError('');
    setMediaSizeError('');
    if (!privacyStatus && collectHashtags?.length <= 0) {
      setPrivacyStatusError('*Required!');
      setHashTagError('*Required!');
    } else if (!privacyStatus) {
      setPrivacyStatusError('PrivacyStatus is not selected!');
    } else if (collectHashtags?.length <= 0) {
      setHashTagError('Hashtags is not selected!');
    } else if (!imageUri && !videoUri && !postInput) {
      setOnUpdatePostHandlerError('Select at least one field!');
    } else {
      if (
        privacyStatus &&
        collectHashtags?.length > 0 &&
        !privacyStatusError &&
        !hashTagError
      ) {
        const uriManage = [...imageUri, ...videoUri];
        const newArrayData = [];

        if (uriManage?.length > 0) {
          uriManage?.map(item => {
            RNFS?.readFile(item?.file, 'base64')
              .then(res => {
                newArrayData?.push({file: res, type: item?.type});
                if (newArrayData?.length == uriManage?.length) {
                  dispatch(
                    updatePostUser(
                      {
                        file: newArrayData,
                        privacyStatus: privacyStatus,
                        text: postInput,
                        fileType: 'media',
                        hashtags: collectHashtags,
                        country: countryGet?.toLowerCase(),
                      },
                      updatePostId,
                      setLoading,
                      setOnUpdatePostHandlerError,
                    ),
                  );
                  navigation.navigate('Home');
                }
              })
              .catch(err => {
                console.log(err, 'err update Base64');
              });
          });
        } else {
          if (postInput) {
            dispatch(
              updatePostUser(
                {
                  privacyStatus: privacyStatus,
                  text: postInput,
                  hashtags: collectHashtags,
                  fileType: 'text',
                  file: [],
                  country: countryGet?.toLowerCase(),
                },
                updatePostId,
                setLoading,
                setOnUpdatePostHandlerError,
              ),
            );
            navigation.navigate('Home');
          }
        }
      }
    }
  };
  return {
    pickUpImageHandler,
    pickUpVideoHandler,
    imageUri,
    videoUri,
    onSubmitHandler,
    postInput,
    validatePostText,
    onCreatePostHandlerError,
    validatePrivacyStatusType,
    privacyStatusError,
    loading,
    postInputError,
    collectHashtags,
    setCollectHashtags,
    flag,
    onUpdateHandler,
    onUpdatePostHandlerError,
    hashTagError,
    mediaSizeError,
    privacyStatus,
    onRemoveImage,
    onRemoveVideo,
    mediaLoading,
    videoMediaLoading,
  };
}

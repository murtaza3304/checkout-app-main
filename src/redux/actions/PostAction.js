import {
  CREATE_POST,
  GET_ALL_POSTS,
  SEARCH_POST,
  GET_MY_ALL_POSTS,
  GET_MY_ALL_BOOKMARKS,
  GET_USER_BOOKMARKS,
  DELETE_USER_POST,
  UPDATE_POST,
  SPAM_POST,
  SPAM_USER,
  SHARE_POST,
  GET_FEED_PREFERENCES,
  ADD_FEED_PREFERENCES,
  POSTING,
  GET_BOOST_POST,
  GET_ALL_POST_LIKES,
} from '../types/ActionsTypes';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonToast from '../../components/common/toasts/CommonToast';
const {showToast} = CommonToast();

// create post action
export const createPostUser =
  (data, setLoading, setOnCreatePostHandlerError) => async dispatch => {
    try {
      // console.log(data, "my data in action");
      setLoading(true);
      dispatch({
        type: POSTING,
        payload: true,
      });
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/post/create`,
        {...data},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully create post then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: CREATE_POST,
          payload: {
            ...response?.data?.post,
            originalAuthor: {
              _id: user?.user?._id,
              firstName: user?.user?.firstName,
              lastName: user?.user?.lastName,
              accountType: user?.user?.accountType,
              profilePic: user?.user?.profilePic,
              country: user?.user?.country,
              identified_docs_status: user?.user?.identified_docs_status,
            },
          },
        });
        showToast({
          title1: 'Created!',
          title2: 'Your post were successfully created.',
          type: 'success',
        });
        dispatch({
          type: POSTING,
          payload: false,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "create post error");
      if (error?.response?.data) {
        setOnCreatePostHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setOnCreatePostHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// update post
export const updatePostUser =
  (data, updatePostId, setLoading, setOnUpdatePostHandlerError) =>
  async dispatch => {
    try {
      // console.log(data, "my data in action");
      setLoading(true);
      dispatch({
        type: POSTING,
        payload: true,
      });
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.put(
        `${BASE_URL}/api/post/update/${updatePostId}`,
        {...data},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully create post then save data in redux
      if (response?.data?.success) {
        setOnUpdatePostHandlerError(response?.data?.message);
        dispatch({
          type: UPDATE_POST,
          payload: {
            ...response?.data?.data,
            originalAuthor: {
              _id: user?.user?._id,
              firstName: user?.user?.firstName,
              lastName: user?.user?.lastName,
              accountType: user?.user?.accountType,
              profilePic: user?.user?.profilePic,
              country: user?.user?.country,
              identified_docs_status: user?.user?.identified_docs_status,
            },
          },
        });
        showToast({
          title1: 'Updated!',
          title2: 'Your post were successfully updated.',
          type: 'success',
        });
        dispatch({
          type: POSTING,
          payload: false,
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "create post error");
      if (error?.response?.data) {
        setOnUpdatePostHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setOnUpdatePostHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// get all posts
export const getAllPostUser =
  (setLoading, currentPage, countryKey, setHasReachesEnd) => async dispatch => {
    try {
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/post/getAllPosts?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      //  console.log('response in action my posts', response?.data?.allPosts?.length);

      // if user are succesfully get all post then save data in redux
      if (response?.data?.success) {
        if (response?.data?.allPosts?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: GET_ALL_POSTS,
          payload: {
            data: response?.data?.allPosts,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get all posts error');
    } finally {
      setLoading(false);
    }
  };

// get likes posts
export const getLikesPostsUser = postId => async dispatch => {
  try {
    // console.log(postId, "my data in action");

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.get(`${BASE_URL}/api/post/likes/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);
  } catch (error) {
    console.log(error, 'get all likes------------------------ error');
  }
};

// get all save videos
export const getSavePostsUser =
  (saveId, isBookmarked, setLoading) => async dispatch => {
    try {
      // console.log(saveId, "my data in action");
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/post/bookmarks/${saveId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully LIKES all post then save data in redux
      if (response?.data?.success) {
        let newSaveData = {
          saveId: saveId,
          userId: user?.user?._id,
          isBookmarked: isBookmarked,
          responseData: response?.data,
        };
        dispatch({
          type: GET_MY_ALL_BOOKMARKS,
          payload: newSaveData,
        });
      } else {
        console.log('Error in like/disLike post', response);
      }
    } catch (error) {
      console.log(error, 'get all videos saved error');
    } finally {
      setLoading(false);
    }
  };

// get my posts
export const getMyPosts =
  (currentPage, data, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(data,"data in action");
      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/post/getMyPosts/${data}?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully get my post then save data in redux
      if (response?.data?.success) {
        if (response?.data?.posts?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: GET_MY_ALL_POSTS,
          payload: {
            data: response?.data?.posts,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get my posts error');
    } finally {
      setLoading(false);
    }
  };

// get my All Bookmark
export const getMyAllBookMark =
  (currentPage, setLoading, setHasReachesPostEnd) => async dispatch => {
    try {
      // console.log(currentPage, 'currentPage');
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/post/getUserBookmarks?page=${currentPage}&limit=5`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data?.foundPosts?.length);

      // if user are succesfully get my post then save data in redux
      if (response?.data?.success) {
        if (response?.data?.foundPosts?.length <= 0) {
          setHasReachesPostEnd(true);
        }
        dispatch({
          type: GET_USER_BOOKMARKS,
          payload: {
            data: response?.data?.foundPosts,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get my save posts error');
    } finally {
      setLoading(false);
    }
  };

// delete post
export const deleteUserPost =
  (data, setLoading, setDeletePostHandlerError) => async dispatch => {
    try {
      // console.log(data, "data in action");
      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.delete(
        `${BASE_URL}/api/post/delete/${data}`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully get my post then save data in redux
      if (response?.data?.success) {
        dispatch({
          type: DELETE_USER_POST,
          payload: response?.data?.data,
        });
        showToast({
          title1: 'Deleted!',
          title2: 'Your post were successfully deleted.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "get error");
      if (error?.response?.data) {
        setDeletePostHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setDeletePostHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// comment post
export const commentPost = data => async dispatch => {
  try {
    // console.log(data, "data in action");
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(`${BASE_URL}/api/comment/add`, data, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);

    // if user are succesfully get my post then save data in redux
  } catch (error) {
    console.log(error?.response?.data, 'get error');
  }
};

// spam post
export const spamPost =
  (data, setLoading, navigation, setOnSpamHandlerError) => async dispatch => {
    try {
      // console.log(data, "data in action");

      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/report/submitReport`,
        data,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully get my post then save data in redux
      if (response?.data?.status == 'success') {
        dispatch({
          type: SPAM_POST,
          payload: response?.data,
        });
        navigation.navigate('Home');
        showToast({
          title1: 'Report!',
          title2: 'Your report were successfully collected.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "get error");
      if (error?.response?.data) {
        setOnSpamHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setOnSpamHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// spam user
export const spamUser =
  (data, setLoading, navigation, setOnSpamHandlerError) => async dispatch => {
    try {
      // console.log(data, "data in action");

      setLoading(true);
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/report/userReport`,
        data,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);

      // if user are succesfully get my post then save data in redux
      if (response?.data?.status == 'success') {
        dispatch({
          type: SPAM_USER,
          payload: response?.data,
        });
        navigation.navigate('Home');
        showToast({
          title1: 'Report!',
          title2: 'Your report were successfully collected.',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "get error");
      if (error?.response?.data) {
        setOnSpamHandlerError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setOnSpamHandlerError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// commentLiked
export const innerCommentLike = data => async dispatch => {
  try {
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.get(`${BASE_URL}/api/comment/like/${data}`, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);
  } catch (error) {
    console.log(error, 'innerCommentLike Error');
  }
};

// post search action
export const postSearch =
  (currentPage, data, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(data, 'data in action');
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/post/search?text=${data}&page=${currentPage}&limit=10`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log(response?.data?.data?.response, 'response in action');

      // if user get succesfully data then save data in redux
      if (response?.data?.status == 'success') {
        if (response?.data?.data?.response?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: SEARCH_POST,
          payload: {
            data: response?.data?.data?.response,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get post search error');
    } finally {
      setLoading(false);
    }
  };

// share post action
export const sharePost = (data, setLoading) => async dispatch => {
  try {
    // console.log(data, 'data');
    setLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/post/sharePost`,
      {...data},
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);
    if (response?.data?.success) {
      dispatch({
        type: SHARE_POST,
        payload: response?.data?.sharedPost,
      });
      showToast({
        title1: 'Shared!',
        title2: 'You shared this post successfully.',
        type: 'success',
      });
    }
  } catch (error) {
    console.log(error);
    showToast({
      title1: 'Shared!',
      title2: error?.response?.data?.message,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
};

// post feed preferences action
export const postFeedPreferences =
  (data, setLoading, navigation, setFeedPreferencesError) => async dispatch => {
    try {
      setLoading(true);
      // console.log(data,"data in action");

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/post/feedPreferences`,
        {...data},
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data);
      if (response?.data?.success) {
        dispatch({
          type: ADD_FEED_PREFERENCES,
          payload: response?.data?.data,
        });
        navigation?.navigate('Setting');
        showToast({
          title1: 'Success!',
          title2: 'You have successfully updated your feed preference!',
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error?.response?.data, "get post feed preferences error")
      if (error?.response?.data) {
        setFeedPreferencesError(error?.response?.data?.message);
      } else {
        // console.log('error in response', error.toString().slice(12));
        let newError = error.toString().slice(12);
        setFeedPreferencesError(newError);
      }
    } finally {
      setLoading(false);
    }
  };

// get feed preferences action
export const getFeedPreferences = setIsLoading => async dispatch => {
  try {
    setIsLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.get(`${BASE_URL}/api/post/feedPreferences`, {
      headers: {
        'access-control-allow-origin': '*',
        Authorization: token,
      },
    });
    // console.log('response in action', response?.data);
    if (response?.data?.success) {
      dispatch({
        type: GET_FEED_PREFERENCES,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log(error, 'get post feed preferences error');
  } finally {
    setIsLoading(false);
  }
};

// boost post
export const boostPost = data => async dispatch => {
  try {
    // console.log(data, 'data in action');

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/boost/create-boost-post`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);

    if (response?.data?.success) {
      showToast({
        title1: `Success`,
        title2: 'Your post is boosted successfully.',
        type: 'success',
      });
    }
  } catch (error) {
    console.log(error, 'boost post error');
  }
};

// get boost post
export const getBoostPost = (data, setLoading) => async dispatch => {
  try {
    // console.log(data, 'data in action');
    setLoading(true);

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/boost/get-boost-post`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);
    if (response?.data?.success) {
      dispatch({
        type: GET_BOOST_POST,
        payload: response?.data,
      });
    } else {
      dispatch({
        type: GET_BOOST_POST,
        payload: response?.data,
      });
    }
  } catch (error) {
    console.log(error, 'get boost post error');
  } finally {
    setLoading(false);
  }
};

export const getPostAllLikes =
  (currentPage, data, setLoading, setHasReachesEnd) => async dispatch => {
    try {
      // console.log(data, currentPage, 'data in action');
      setLoading(true);

      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.post(
        `${BASE_URL}/api/post/getallUniquePostLikes?page=${currentPage}&limit=12`,
        data,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      // console.log('response in action', response?.data?.uniquePost?.likes);
      if (response?.data?.success) {
        if (response?.data?.uniquePost?.likes?.length <= 0) {
          setHasReachesEnd(true);
        }
        dispatch({
          type: GET_ALL_POST_LIKES,
          payload: {
            data: response?.data?.uniquePost?.likes,
            page: currentPage,
          },
        });
      }
    } catch (error) {
      console.log(error, 'get all likes of post error');
    } finally {
      setLoading(false);
    }
  };

// add impression on posts
export const addImpression = data => async dispatch => {
  try {
    // console.log(data, 'data in action');

    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let token = user?.token;

    const response = await axios.post(
      `${BASE_URL}/api/boost/impression`,
      data,
      {
        headers: {
          'access-control-allow-origin': '*',
          Authorization: token,
        },
      },
    );
    // console.log('response in action', response?.data);
  } catch (error) {
    console.log(error, 'add impression on posts error');
  }
};

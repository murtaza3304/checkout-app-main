import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMyPosts, getMyAllBookMark} from '../../redux/actions/PostAction';

export default function MyProfileHook() {
  const dispatch = useDispatch();

  // Store Data
  const currentPostsData = useSelector(
    store => store?.PostsReducers?.isGetAllPostsUser,
  );
  const currentGetAllPostsData = useSelector(
    store => store?.PostsReducers?.isGetAllPostsUser,
  );
  const isGetUserProfileBookmarksData = useSelector(
    store => store?.PostsReducers?.isGetAllPostsUser,
  );
  const currentUserLoginData = useSelector(store => store?.AuthReducers.user);
  const getUserUpdateData = useSelector(
    store => store?.AuthReducers.isUserAlreadySignUp,
  );
  const updateUserData = useSelector(
    store => store?.UpdateUserReducer.updateUser,
  );

  // console.log(getUserUpdateData, "user in hook");
  // console.log(isGetUserProfileBookmarksData, "isGetUserProfileBookmarksData in hook");

  // states
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);
  const [hasReachesPostEnd, setHasReachesPostEnd] = useState(false);

  // get all posts
  const getAllMyPostsHandler = userId => {
    // console.log(userId,"userId");
    currentUserPosts = 1;
    setHasReachesEnd(false);
    dispatch(getMyPosts(1, userId, setLoading, setHasReachesEnd));
  };

  const getMyBookMarkHandler = () => {
    currentSavePostPage = 1;
    setHasReachesPostEnd(false);
    dispatch(getMyAllBookMark(1, setLoading, setHasReachesPostEnd));
  };

  // control refresh
  const handleRefreshUserPosts = userId => {
    currentUserPosts = 1;
    setHasReachesEnd(false);
    dispatch(getMyPosts(1, userId, setLoading, setHasReachesEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // control refresh on bookmark
  const handleRefreshSavePosts = () => {
    currentSavePostPage = 1;
    setHasReachesPostEnd(false);
    dispatch(getMyAllBookMark(1, setLoading, setHasReachesPostEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // load more user
  const fetchMoreUserPosts = userId => {
    currentUserPosts += 1;
    if (!hasReachesEnd) {
      dispatch(
        getMyPosts(
          currentUserPosts,
          userId,
          setFooterLoading,
          setHasReachesEnd,
        ),
      );
    }
  };

  // load more user
  const fetchMoreSavePosts = () => {
    currentSavePostPage += 1;
    if (!hasReachesPostEnd) {
      dispatch(
        getMyAllBookMark(
          currentSavePostPage,
          setFooterLoading,
          setHasReachesPostEnd,
        ),
      );
    }
  };

  return {
    getAllMyPostsHandler,
    currentUserLoginData,
    loading,
    currentPostsData,
    currentGetAllPostsData,
    getMyBookMarkHandler,
    isGetUserProfileBookmarksData,
    getUserUpdateData,
    updateUserData,
    handleRefreshUserPosts,
    refreshing,
    fetchMoreUserPosts,
    footerLoading,
    handleRefreshSavePosts,
    fetchMoreSavePosts,
  };
}

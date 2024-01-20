import {useState} from 'react';
import {
  getAllPostUser,
  getLikesPostsUser,
  getSavePostsUser,
  commentPost,
  innerCommentLike,
} from '../../redux/actions/PostAction';
import {useDispatch, useSelector} from 'react-redux';
import {socket} from '../../../config';
import {
  GET_COMMENT_POST,
  INNER_COMMENT_LIKE,
  SOCKET_LIKES,
} from '../../redux/types/ActionsTypes';
import uuid from 'react-native-uuid';
import DateTime from '../../utils/DateTime';

export default function GetAllPostsHook() {
  const dispatch = useDispatch();

  // Store Data
  const currentPostsData = useSelector(
    store => store?.PostsReducers?.isGetAllPostsUser,
  );
  const currentUserData = useSelector(
    store => store?.AuthReducers?.isUserAlreadySignUp,
  );
  const currentUserLoginData = useSelector(store => store?.AuthReducers.user);
  // console.log(currentUserData, "currentUserData in hook");

  // states
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyCommentID, setReplyCommentID] = useState('');

  // date time
  const {getCurrentDateTimeISO} = DateTime();

  // get all posts
  const getAllPostsHandler = (
    currentPage,
    setLoading,
    countryGet,
    setHasReachesEnd,
  ) => {
    dispatch(
      getAllPostUser(setLoading, currentPage, countryGet, setHasReachesEnd),
    );
  };

  // like handler
  const isLikeHandler = (postID, isLiked) => {
    let socketLikeData = {
      postId: postID,
      userId: currentUserLoginData?._id,
      isLiked: isLiked,
    };
    dispatch({
      type: SOCKET_LIKES,
      payload: socketLikeData,
    });
    socket.emit('addLike', socketLikeData);
    dispatch(getLikesPostsUser(postID));
  };

  // save handler
  const isSaveHandler = (saveID, isBookmarked) => {
    dispatch(getSavePostsUser(saveID, isBookmarked, setLoading));
  };

  // uuid
  function generateRandomHexString(length) {
    const uid = uuid?.v4();
    return uid.replace(/-/g, '').substring(0, length);
  }

  // comment handler
  const commentHandler = (postID, parentCommentID) => {
    if (!commentText) {
      return;
    }
    let newUid = generateRandomHexString(24);
    const isoDateTime = getCurrentDateTimeISO();

    let commentData = {
      text: commentText,
      postId: postID,
      userId: currentUserLoginData?._id,
      parentComment: parentCommentID ? parentCommentID : '',
      _id: newUid,
    };
    let socketCommentData = {
      _id: newUid,
      text: commentText,
      postId: postID,
      parentComment: parentCommentID ? parentCommentID : '',
      author: {
        _id: currentUserLoginData?._id,
        firstName: currentUserLoginData?.firstName,
        lastName: currentUserLoginData?.lastName,
        accountType: currentUserLoginData?.accountType,
        profilePic: currentUserLoginData?.profilePic,
        country: currentUserLoginData?.country,
        identified_docs_status: currentUserLoginData?.identified_docs_status,
      },
      replyComments: [],
      likes: [],
      createdAt: isoDateTime,
    };

    dispatch({
      type: GET_COMMENT_POST,
      payload: socketCommentData,
    });

    socket.emit('addComment', socketCommentData);
    dispatch(commentPost(commentData));
    setCommentText('');
    setReplyCommentID('');
  };

  // commentLike
  const commentLikedHandler = (likeId, isLiked, postID) => {
    let socketCommentLike = {
      userId: currentUserLoginData?._id,
      commentId: likeId,
      postId: postID,
      isLiked: isLiked,
    };

    dispatch({
      type: INNER_COMMENT_LIKE,
      payload: socketCommentLike,
    });
    socket.emit('innerCommentLike', socketCommentLike);
    dispatch(innerCommentLike(likeId));
  };
  return {
    getAllPostsHandler,
    loading,
    currentPostsData,
    isLikeHandler,
    currentUserLoginData,
    isSaveHandler,
    currentUserData,
    commentHandler,
    commentText,
    setCommentText,
    replyCommentID,
    setReplyCommentID,
    commentLikedHandler,
  };
}

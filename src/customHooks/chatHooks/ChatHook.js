import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  blockUser,
  chatUserGet,
  deleteChatUser,
  getCallUser,
  getChatsUsers,
  messageSend,
} from '../../redux/actions/ChatAction';
import CommonToast from '../../components/common/toasts/CommonToast';
import {
  DISPLAY_MEDIA_CHAT,
  MESSAGE_SEND_SUCCESS,
  UPDATE_FRIEND_MESSAGE,
} from '../../redux/types/ActionsTypes';
import DocumentPicker from 'react-native-document-picker';
import DateTime from '../../utils/DateTime';
import UTC_Time from '../../utils/UTC_Time';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import {socket} from '../../../config';

export default function ChatHook({navigation, chatUser, cardItems}) {
  const dispatch = useDispatch();
  const {showToast} = CommonToast();

  const allChatUsers = useSelector(
    store => store?.ChatReducers?.isGetAllChatUser,
  );
  const allCallUsers = useSelector(
    store => store?.ChatReducers?.isGetAllCallUser,
  );

  const getChatsAllUsers = useSelector(
    store => store?.ChatReducers?.isChatsUsersGet,
  );

  const deleteChatUsers = useSelector(
    store => store?.ChatReducers?.isDeleteChat,
  );
  const deleteCallUsers = useSelector(
    store => store?.ChatReducers?.isDeleteCall,
  );

  const blockChatUsers = useSelector(store => store?.ChatReducers?.isUserBlock);

  const currentUserLoginData = useSelector(store => store?.AuthReducers?.user);
  const activeUser = useSelector(store => store?.ChatReducers?.isActiveUser);
  //   console.log(allChatUsers, 'allChatUsers');
  const getAllMessages = useSelector(
    store => store?.ChatReducers?.isGetAllMessages,
  );
  const getMessageSuccess = useSelector(
    store => store?.ChatReducers?.isGetMessagesSuccess,
  );
  const isGetSendMessages = useSelector(
    store => store?.ChatReducers?.isGetSendMessages,
  );
  // console.log(getAllMessages, 'getAllMessages');
  const isDisplayMediaInChat = useSelector(
    store => store?.ChatReducers?.isDisplayMediaChat,
  );

  //   states
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [soketMessage, setSocketMessage] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaUri, setMediaUri] = useState([]);
  const [typingMessage, setTypingMessage] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);
  const [hasReachesCallEnd, setHasReachesCallEnd] = useState(false);

  // get all chat user
  const getAllChatUserHandler = () => {
    chatUserPage = 1;
    setHasReachesEnd(false);
    dispatch(chatUserGet(1, setLoading, setHasReachesEnd));
  };

  // refresh control
  const reFreshControlChat = () => {
    chatUserPage = 1;
    setHasReachesEnd(false);
    dispatch(chatUserGet(1, setLoading, setHasReachesEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // load more posts
  const fetchMoreChatUsers = () => {
    chatUserPage += 1;
    if (!hasReachesEnd) {
      dispatch(chatUserGet(chatUserPage, setFooterLoading, setHasReachesEnd));
    }
  };

  const getChatUsers = () => {
    let newData = {
      userID: chatUser,
    };
    dispatch(getChatsUsers(newData));
  };

  // get call user
  const getAllCallUserHandler = () => {
    callUserPage = 1;
    setHasReachesCallEnd(false);
    dispatch(getCallUser(1, setLoading, setHasReachesCallEnd));
  };

  // call refresh control
  const reFreshControlCall = () => {
    callUserPage = 1;
    setHasReachesCallEnd(false);
    dispatch(getCallUser(1, setLoading, setHasReachesCallEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // fetch more call data
  const fetchMoreCallUsers = () => {
    callUserPage += 1;
    if (!hasReachesCallEnd) {
      dispatch(
        getCallUser(callUserPage, setFooterLoading, setHasReachesCallEnd),
      );
    }
  };

  // delete chat handler
  const deleteChatHandler = data => {
    let newData = {fdId: data?.userID};
    dispatch(deleteChatUser(newData, setIsLoading));
  };

  // block user handler
  const blockUserHandler = data => {
    let newData = {fdId: data?.userID ? data?.userID : data};
    dispatch(blockUser(newData, setBlockLoading));
  };

  // validate text input
  const validateTextInput = e => {
    setTextMessage(e);
    if (currentUserLoginData?._id && chatUser) {
      socket.emit('typingMessage', {
        senderId: currentUserLoginData?._id,
        receiverId: chatUser,
        message: e,
      });
    }
  };

  // pick up media
  const pickUpMediaHandler = async () => {
    try {
      dispatch({
        type: DISPLAY_MEDIA_CHAT,
        payload: false,
      });
      setMediaLoading(true);
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker?.types?.images, DocumentPicker?.types?.video],
        allowMultiSelection: true,
      });
      // console.log(doc, 'result media files');
      if (doc?.length > 0) {
        let mediaFiles = doc?.map(item => {
          if (item?.size <= 10528733) {
            if (
              item?.type === 'image/jpeg' ||
              item?.type === 'image/png' ||
              item?.type === 'image/gif'
            ) {
              return {file: item?.uri, type: 'image'};
            } else if (item?.type?.startsWith('video/')) {
              return {file: item?.uri, type: 'video'};
            } else {
              showToast({
                title1: 'Error',
                title2: 'Selected file is not an image or video!',
                type: 'error',
              });
              return {file: null, type: 'error'};
            }
          } else {
            showToast({
              title1: 'Error',
              title2: 'File size up to 10MB!',
              type: 'error',
            });
            return {file: null, type: 'error'};
          }
        });
        // console.log(mediaFiles, 'mediaFiles pure array');

        const mediaFilesError = mediaFiles?.some(
          item => item?.type === 'error',
        );

        // Set mediaUri only if no errors
        if (!mediaFilesError) {
          setMediaUri(mediaFiles);
        }
      }
    } catch (error) {
      if (DocumentPicker?.isCancel(error)) {
        console.log('user cencel the upload image', error);
      } else {
        console.log(error);
      }
    } finally {
      setMediaLoading(false);
    }
  };

  useEffect(() => {
    if (mediaUri?.length > 0) {
      navigation?.navigate('DisplayMediaScreen', {
        mediaFiles: mediaUri,
        chatUser,
        cardItems,
      });
    }
  }, [mediaUri]);

  // date time
  const {getCurrentDateTimeISO} = DateTime();
  const {currentUtcTime} = UTC_Time();

  // uuid
  function generateRandomHexString(length) {
    const uid = uuid?.v4();
    return uid.replace(/-/g, '').substring(0, length);
  }

  // send message handler
  const messageHandler = () => {
    if (
      getChatsAllUsers?.blockedUsers?.length > 0 &&
      getChatsAllUsers?.blockedUsers?.some(
        item =>
          item?.blockedByID?.toString() ===
          currentUserLoginData?._id?.toString(),
      )
    ) {
      setModalVisible(true);
    } else if (
      getChatsAllUsers?.blockedUsers?.length > 0 &&
      getChatsAllUsers?.blockedUsers?.some(
        item =>
          item?.blockedToID?.toString() ===
          currentUserLoginData?._id?.toString(),
      )
    ) {
      setModalVisible(true);
    } else {
      if (!textMessage && mediaUri?.length <= 0) {
        return;
      } else {
        const newArrayData = [];
        const currentTime = currentUtcTime();
        let newUid = generateRandomHexString(24);
        const isoDateTime = getCurrentDateTimeISO();

        if (mediaUri?.length > 0) {
          mediaUri?.map(item => {
            RNFS?.readFile(item?.file, 'base64')
              .then(res => {
                newArrayData?.push({file: res, type: item?.type});
                if (newArrayData?.length == mediaUri?.length) {
                  let chatData = {
                    senderName: currentUserLoginData?.firstName,
                    receiverId: chatUser,
                    message: textMessage,
                    messageTime: currentTime,
                    file: newArrayData,
                    _id: newUid,
                  };
                  let socketChat = {
                    _id: newUid,
                    author: currentUserLoginData?._id,
                    message: {
                      file: mediaUri,
                      text: textMessage,
                    },
                    messageTime: currentTime,
                    receiverId: chatUser,
                    senderId: currentUserLoginData?._id,
                    senderName: currentUserLoginData?.firstName,
                    status: 'unseen',
                    unreadCount: 0,
                    createdAt: isoDateTime,
                  };
                  dispatch(messageSend(chatData, setLoading));
                  dispatch({
                    type: MESSAGE_SEND_SUCCESS,
                    payload: socketChat,
                  });
                  dispatch({
                    type: UPDATE_FRIEND_MESSAGE,
                    payload: {
                      msgInfo: getAllMessages[getAllMessages?.length - 1],
                    },
                  });
                }
              })
              .catch(err => {
                console.log(err, 'err Base64');
              });
          });
        } else {
          let chatData = {
            senderName: currentUserLoginData?.firstName,
            receiverId: chatUser,
            message: textMessage,
            messageTime: currentTime,
            _id: newUid,
          };
          let socketChat = {
            _id: newUid,
            author: currentUserLoginData?._id,
            message: {
              file: mediaUri,
              text: textMessage,
            },
            messageTime: currentTime,
            receiverId: chatUser,
            senderId: currentUserLoginData?._id,
            senderName: currentUserLoginData?.firstName,
            status: 'unseen',
            unreadCount: 0,
            createdAt: isoDateTime,
          };
          dispatch(messageSend(chatData, setLoading));
          dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: socketChat,
          });
          dispatch({
            type: UPDATE_FRIEND_MESSAGE,
            payload: {
              msgInfo: getAllMessages[getAllMessages?.length - 1],
            },
          });
        }
        socket.emit('typingMessage', {
          senderId: currentUserLoginData?._id,
          receiverId: chatUser,
          message: '',
        });
        setTextMessage('');
        setMediaUri([]);
        dispatch({
          type: DISPLAY_MEDIA_CHAT,
          payload: true,
        });
      }
    }
  };

  return {
    getAllChatUserHandler,
    loading,
    isLoading,
    setIsLoading,
    allChatUsers,
    currentUserLoginData,
    getAllCallUserHandler,
    allCallUsers,
    deleteChatHandler,
    blockUserHandler,
    blockLoading,
    deleteChatUsers,
    blockChatUsers,
    getChatUsers,
    getChatsAllUsers,
    activeUser,
    getAllMessages,
    getMessageSuccess,
    isGetSendMessages,
    isDisplayMediaInChat,
    textMessage,
    soketMessage,
    setSocketMessage,
    mediaUri,
    setMediaUri,
    typingMessage,
    setTypingMessage,
    modalVisible,
    setModalVisible,
    pickUpMediaHandler,
    messageHandler,
    validateTextInput,
    reFreshControlChat,
    refreshing,
    fetchMoreChatUsers,
    footerLoading,
    reFreshControlCall,
    fetchMoreCallUsers,
    deleteCallUsers,
  };
}

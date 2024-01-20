import {
  CHAT_USERS_GET,
  MESSAGE_SEND_SUCCESS,
  GET_ALL_MESSAGES,
  UPDATE_FRIEND_MESSAGE,
  SOCKET_MESSAGE,
  GET_SEND_MESSAGE,
  DELETE_CHAT_USER,
  BLOCK_CHAT_USER,
  GET_CALL_USERS,
  CHATS_USERS_GET,
  IS_ACTIVE_USER,
  DISPLAY_MEDIA_CHAT,
  LOGOUT_USER,
  DELETE_CALL_USER,
} from '../types/ActionsTypes';

// initial state
const initialState = {
  isGetAllChatUser: [],
  isGetAllCallUser: [],
  isGetAllMessages: [],
  isGetSendMessages: null,
  isGetMessagesSuccess: 1,
  isDeleteChat: null,
  isDeleteCall: null,
  isUserBlock: null,
  isChatsUsersGet: null,
  isActiveUser: null,
  isDisplayMediaChat: false,
};

// chat reducers
export default function ChatReducers(state = initialState, action) {
  switch (action.type) {
    // chat user get
    case CHAT_USERS_GET:
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isGetAllChatUser: action?.payload?.data,
        };
      } else {
        let allData = [];
        const updateUserData = action?.payload?.data?.map(user => {
          const isUserAlreadyAdded = state?.isGetAllChatUser?.some(
            item => item?._id === user?._id,
          );
          if (!isUserAlreadyAdded) {
            allData.push(user);
          }
        });
        return {
          ...state,
          isGetAllChatUser: [...state?.isGetAllChatUser, ...allData],
        };
      }
    // get call user
    case GET_CALL_USERS:
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isGetAllCallUser: action?.payload?.data,
        };
      } else {
        let allData = [];
        const updateUserData = action?.payload?.data?.map(user => {
          const isUserAlreadyAdded = state?.isGetAllCallUser?.some(
            item => item?._id === user?._id,
          );
          if (!isUserAlreadyAdded) {
            allData.push(user);
          }
        });
        return {
          ...state,
          isGetAllCallUser: [...state?.isGetAllCallUser, ...allData],
        };
      }
    // send message
    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        isGetAllMessages: [...state?.isGetAllMessages, action?.payload],
      };

    case GET_SEND_MESSAGE:
      return {
        ...state,
        isGetMessagesSuccess: state.isGetMessagesSuccess + 1,
        isGetSendMessages: action?.payload,
      };

    // get all message
    case GET_ALL_MESSAGES:
      return {
        ...state,
        isGetAllMessages: action?.payload,
      };

    // socket massages
    case SOCKET_MESSAGE:
      return {
        ...state,
        isGetAllMessages: [...state.isGetAllMessages, action.payload.message],
      };

    // UPDATE_FRIEND_MESSAGE
    case UPDATE_FRIEND_MESSAGE:
      const index = state.isGetAllChatUser?.findIndex(
        f =>
          f._id === action.payload?.msgInfo?.receiverId ||
          f._id === action.payload?.msgInfo?.senderId,
      );
      if (index !== -1) {
        state.isGetAllChatUser[index] = {
          ...state?.isGetAllChatUser[index],
          msgInfo: action?.payload?.msgInfo,
          status: action?.payload?.status,
        };
      }

      return {
        ...state,
        isGetMessagesSuccess: 0,
      };

    // delete chat
    case DELETE_CHAT_USER:
      return {
        ...state,
        isDeleteChat: action?.payload,
      };

    // delete call history
    case DELETE_CALL_USER:
      return {
        ...state,
        isDeleteCall: action?.payload,
      };

    case BLOCK_CHAT_USER:
      return {
        ...state,
        isUserBlock: action?.payload,
      };

    case CHATS_USERS_GET:
      return {
        ...state,
        isChatsUsersGet: action?.payload,
      };

    // get active user
    case IS_ACTIVE_USER:
      const filterUser = action?.payload?.users?.filter(
        u => u?.userId !== action?.payload?.logInUser,
      );
      return {
        ...state,
        isActiveUser: filterUser,
      };

    // display media chat
    case DISPLAY_MEDIA_CHAT:
      return {
        ...state,
        isDisplayMediaChat: action?.payload,
      };

    // User Logout
    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}

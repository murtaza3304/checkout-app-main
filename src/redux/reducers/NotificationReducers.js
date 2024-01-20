import {
  DELETE_NOTIFIACTION,
  GET_NOTIFIACTION,
  SEEN_NOTIFICATION,
  LOGOUT_USER,
  GET_NOTIFICATION_SETTING,
  GET_OUTSIDE_APP_NOTIFICATION,
} from '../types/ActionsTypes';

// initial state
const initialState = {
  isNotification: [],
  isNotificationSetting: [],
};

// chat reducers
export default function NotificationReducers(state = initialState, action) {
  switch (action?.type) {
    // get all notification
    case GET_NOTIFIACTION:
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isNotification: action?.payload?.data,
        };
      } else {
        let allData = [];
        const updateData = action?.payload?.data?.map(items => {
          const isAlreadyAdded = state?.isNotification?.some(
            item => item?._id === items?._id,
          );
          if (!isAlreadyAdded) {
            allData?.push(items);
          }
        });
        return {
          ...state,
          isNotification: [...state?.isNotification, ...allData],
        };
      }

    // SEEN NOTIFICATION
    case SEEN_NOTIFICATION:
      const updateData = state?.isNotification?.map(item => {
        if (item?._id === action?.payload) {
          return {
            ...item,
            seen: true,
          };
        }
        return item;
      });
      return {
        ...state,
        isNotification: updateData,
      };

    // DELETE NOTIFICATION
    case DELETE_NOTIFIACTION:
      const filteredData = state?.isNotification?.filter(
        item => item?._id !== action?.payload,
      );
      return {
        ...state,
        isNotification: filteredData,
      };

    // NOTIFICATION SETTING
    case GET_NOTIFICATION_SETTING:
      return {
        ...state,
        isNotificationSetting: action?.payload,
      };

    // GET OUTSIDE NOTIFICATION
    case GET_OUTSIDE_APP_NOTIFICATION:
      let allData = [];
      const isAlreadyAdded = state?.isNotification?.some(
        item => item?._id === action?.payload?._id,
      );
      if (!isAlreadyAdded) {
        allData?.push(action?.payload);
      }
      return {
        ...state,
        isNotification: [...allData, ...state?.isNotification],
      };

    // User Logout
    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}

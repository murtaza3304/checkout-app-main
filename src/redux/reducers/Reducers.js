import {
  TERMS_AND_CONDITIONS,
  PRIVACY_POLICY,
  SEARCH_USER,
  SEARCH_B_USER,
  USER_RATING,
  USER_FEEDBACK,
  GET_USER_FEEDBACK,
  GET_ALL_BOOST_POSTS,
  GET_CONTENT_PERFORMANCE,
  LOGOUT_USER,
} from '../types/ActionsTypes';

// initial state
const initialState = {
  isGetTermsAndPrivacy: null,
  isSearchUser: [],
  isSearchBUser: [],
  isUserRating: null,
  isUserFeedback: null,
  isGetUserFeedback: [],
  isGetAllBoostPosts: [],
  isGetContentPerformance: null,
};

export default function Reducers(state = initialState, action) {
  switch (action.type) {
    // TERMS AND CONDITIONS
    case TERMS_AND_CONDITIONS:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isGetTermsAndPrivacy: action?.payload,
      };

    // PRIVACY POLICY
    case PRIVACY_POLICY:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isGetTermsAndPrivacy: action?.payload,
      };

    // SEARCH USER
    case SEARCH_USER:
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isSearchUser: action?.payload?.data,
        };
      } else {
        let allData = [];
        const updateUserData = action?.payload?.data?.map(user => {
          const isUserAlreadyAdded = state?.isSearchUser?.some(
            item => item?._id === user?._id,
          );
          if (!isUserAlreadyAdded) {
            allData.push(user);
          }
        });
        return {
          ...state,
          isSearchUser: [...state?.isSearchUser, ...allData],
        };
      }

    // SEARCH B USER
    case SEARCH_B_USER:
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isSearchBUser: action?.payload?.data,
        };
      } else {
        let allData = [];
        const updateUserData = action?.payload?.data?.map(user => {
          const isUserAlreadyAdded = state?.isSearchBUser?.some(
            item => item?._id === user?._id,
          );
          if (!isUserAlreadyAdded) {
            allData.push(user);
          }
        });
        return {
          ...state,
          isSearchBUser: [...state?.isSearchBUser, ...allData],
        };
      }

    // USER RATING
    case USER_RATING:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isUserRating: action?.payload,
      };

    // USER FEEDBACK
    case USER_FEEDBACK:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isUserFeedback: action?.payload,
      };

    // GET USER FEEDBACK
    case GET_USER_FEEDBACK:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isGetUserFeedback: action?.payload,
      };

    // GET_ALL_BOOST_POSTS
    case GET_ALL_BOOST_POSTS:
      if (action?.payload?.page == 1) {
        return {
          ...state,
          isGetAllBoostPosts: action?.payload?.data,
        };
      } else {
        let allData = [];
        const updatePostData = action?.payload?.data?.map(post => {
          const isPostAlreadyAdded = state?.isGetAllBoostPosts?.some(
            item => item?._id === post?._id,
          );
          if (!isPostAlreadyAdded) {
            allData.push(post);
          }
        });
        return {
          ...state,
          isGetAllBoostPosts: [...state?.isGetAllBoostPosts, ...allData],
        };
      }

    // GET_CONTENT_PERFORMANCE
    case GET_CONTENT_PERFORMANCE:
      return {
        ...state,
        isGetContentPerformance: action?.payload,
      };

    // User Logout
    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}

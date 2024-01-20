import {
  UPDATE_VA_USER,
  UPDATE_CONSULTANT_USER,
  UPDATE_SUPPLIER_USER,
  GET_ALL_C_USER,
  GET_ALL_B_USER,
  LOGOUT_USER,
  GET_CURRENT_SINGLE_USER,
} from '../types/AuthActionsTypes';

// initial state
const initialState = {
  updateUser: null,
  isGetAllUpdatedUser: null,
  isGetAllUpdatedBUser: null,
  isGetCurrentSingleUser: null,
};

export default function UpdateUserReducer(state = initialState, action) {
  switch (action.type) {
    // update User
    case UPDATE_VA_USER:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        updateUser: action?.payload,
      };

    // update User
    case UPDATE_CONSULTANT_USER:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        updateUser: action?.payload,
      };

    // update User
    case UPDATE_SUPPLIER_USER:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        updateUser: action?.payload,
      };

    // update User
    case GET_ALL_C_USER:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isGetAllUpdatedUser: action?.payload,
      };

    // update User
    case GET_ALL_B_USER:
      // console.log(action?.payload, "my data in reducers");
      return {
        ...state,
        isGetAllUpdatedBUser: action?.payload,
      };

    case GET_CURRENT_SINGLE_USER:
      return {
        ...state,
        isGetCurrentSingleUser: action?.payload,
      };

    // User Logout
    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}

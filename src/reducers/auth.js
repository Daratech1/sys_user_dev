import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  RESET_PASS,
  CODE_CONFIRMATION
} from "../action/types";


const initialState = {
  isAuthenticated: false,
  loading: true,
  user: {},
  message: "",
  code:"",
  code_is_valid:false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload.userData
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.userData,
        code:"",
        code_is_valid:false
      };
      case RESET_PASS:
      case CODE_CONFIRMATION: 
        return {
          ...state,
          loading: false,
          code: payload,
        };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    localStorage.removeItem('token')

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };

    case "SET_ADMIN":
      return {
        ...state,
        message: action.value,
      };
    default:
      return state;
  }
};

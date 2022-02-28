import { GET_PERMISSIONS,CREATE_PERMISSIONS,GET_PERMISSION_ABSENCE } from "../action/types";

const initialState = {
  permissions: [],
  absence:{},
  perLoading: true,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PERMISSIONS:
      return {
        ...state,
        permissions: payload,
        perLoading: false,
      };
      case GET_PERMISSION_ABSENCE:
      return {
        ...state,
        absence: payload,
        perLoading: false,
      };
      case CREATE_PERMISSIONS:
      return {
        ...state,
        permissions:[payload,...state.permissions],
        perLoading: false,
      };
    default:
      return state;
    }
};

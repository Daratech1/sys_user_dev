import { CHANGE_PASSWORB } from "../action/types";

const initialState = {
    passwordData:{},
    loading: true,
};
export default (state = initialState, action) => {
  const { type, payload ,date } = action;
  switch (type) {
    
      case CHANGE_PASSWORB:
      return {
        passwordData: payload,
        loading: false,
      };
    default:
      return state;
    }
};
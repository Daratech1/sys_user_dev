import { GET_APPLICATIONS,GET_PLANS,SEND_PLAN ,CREATE_APPLICATIONS, FAIL_APP } from "../action/types";

const initialState = {
  applications: [],
  plans:[],
  msg:'',
  loading: true,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: payload,
      };
    case GET_PLANS:
      return {
        ...state,
        plans: payload,
      };
    case CREATE_APPLICATIONS:
      return {
        applications:[payload,...state.applications],
        loading: false,
      };
      case FAIL_APP:
        return {
          ...state,
          msg:payload,
          loading: false,
        };
    case SEND_PLAN:
      return {
        ...state,
        msg: payload,
        loading: false,
      };
    default:
      return state;
  }
};

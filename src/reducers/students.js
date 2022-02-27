import { GET_STUDENTS,CALL_STUDENTS,FAIL_CALL } from "../action/types";

const initialState = {
  students: [],
  loading: true,
  msg:'',
  success:false
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: payload,
      };
      case CALL_STUDENTS:
        return {
          ...state,
          msg:payload.message,
          success:payload.success,
          loading: false,
        };
      case FAIL_CALL:
        return {
          ...state,
          msg:payload,
          loading: false,
        };
    default:
      return state;
  }
};

import { GET_STUDENTS,CALL_STUDENTS } from "../action/types";

const initialState = {
  students: [],
  loading: true,
  msg:[]
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
          loading: false,
        };
    default:
      return state;
  }
};

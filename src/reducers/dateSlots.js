import { GET_SLOTS } from "../action/types";

const initialState = {
  usedSlotsArry: [],
  loading: true,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SLOTS:
      return {
        usedSlotsArry: payload,
        loading: false,
      };
    default:
      return state;
  }
};

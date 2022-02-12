var Promise = require("promise");
import instance from "uitils/api";
import {GET_SLOTS} from "./types";

export const getDateSlots = (time) => (dispatch) => {
  const promise = new Promise((resolve, reject) => {
    instance.get(`/api/user/meeting/used_slots?selected_date=${time}`).then(
      (res) => {
        dispatch({ type: GET_SLOTS, payload: res.data.slots });
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });

  return promise;
};
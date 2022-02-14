var Promise = require("promise");
import instance from "uitils/api";

import { CHANGE_PASSWORB } from "./types";

export const getChangePassword = (data) => (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      instance.post(`/api/user/auth/changepassword` , data).then(
        (res) => {
          dispatch({ type: CHANGE_PASSWORB, payload:res.data });
          resolve(res);
        },
        (err) => {
          dispatch({ type: CHANGE_PASSWORB, payload:err.response});
          reject(err);
        }
      );
    });

    return promise;
  };
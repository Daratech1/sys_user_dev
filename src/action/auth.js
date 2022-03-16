var Promise = require("promise");
import instance from "uitils/api";
import {setAlert} from './alert'
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_PROFILE,
  RESET_PASS,
  CODE_CONFIRMATION
} from "./types";


export const loadUser =() => async dispatch=>{
  // if(localStorage.token) {
  //     setAuthToken(localStorage.token)
  // }
  const promise = new Promise((resolve, reject) => {
    instance.get("/api/user/auth/user").then(
      (res) => {
        dispatch({
          type:USER_LOADED,
          payload: res.data
      })
       // dispatch(setAlert(res.data.message,'success'))

   resolve(res);
      },
      (err) => {
        dispatch({
          type:AUTH_ERROR,
         
      })
        reject(err);
      }
    );
  })
  return promise;
}


// Set token ketika telah login supaya bisa mendapatkan data dari server
export const storeToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
  instance.defaults.headers.common.authorization = `Bearer ${token}`;
};

export const login = (body) => (dispatch) => {
  const promise = new Promise((resolve, reject) => {
    instance.get("/sanctum/csrf-cookie").then(
      (res) => {
        resolve(res);
      },
      (err) => {

        reject(err);
      }
    );
    instance.post("/api/user/auth/login", body).then(
      (res) => {
         dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        storeToken(res.data.access_token);
        resolve(res);
      },
      (err) => {
        const errors = err.response.data.errors
        dispatch({ type: LOGIN_FAIL});
        dispatch(setAlert(Object.values(errors),'error'))
        reject(err);

      }
    );
  });

  return promise;
};
export const codeConfirm = ({ phone, password }) => (dispatch) => {
  const body = { phone, password };
  const promise = new Promise((resolve, reject) => {
    instance.get("/sanctum/csrf-cookie").then(
      (res) => {
        resolve(res);
      },
      (err) => {

        reject(err);
      }
    );
    instance.post("/api/user/auth/login", body).then(
      (res) => {
         dispatch({ type: CODE_CONFIRMATION, payload: res.data.data });
        resolve(res);
      },
      (err) => {
        const errors = err.response.data.errors
        dispatch({ type: LOGIN_FAIL});
        dispatch(setAlert(Object.values(errors),'error'))
        reject(err);

      }
    );
  });

  return promise;
};
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const register = (data) => (dispatch) => {
  const promise = new Promise((resolve, reject) => {
    instance.post("/api/user/auth/register", data).then(
      (res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        resolve(res);
        window.location.href = "/login"
       // dispatch(setAlert(Object.values(errors),'success'))
      },
      (err) => {
        const errors = err.response.data.errors
        const x = Object.values(errors)
        var merged = [].concat.apply([], x)
        if (merged) 
    {
      merged.forEach(error=> dispatch(setAlert(error,'error')))
    }
        reject(err);
      }
    );
  });

  return promise;
};

export const getProtectedAPI = () => (dispatch) => {
  const promise = new Promise((resolve, reject) => {
    instance.get("protected").then(
      (res) => {
        dispatch({ type: "SET_ADMIN", value: res.data.message });
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });

  return promise;
};

export const resetPassword = (body) => (dispatch) => {
  const promise = new Promise((resolve, reject) => {
   
    instance.post("/api/user/auth/reset-password-send-code", body).then(
      (res) => {
         dispatch({ type: RESET_PASS, payload: res.data.data });
        resolve(res);
      },
      (err) => {
        // const errors = err.response.data.errors
        // dispatch({ type: LOGIN_FAIL});
        // dispatch(setAlert(Object.values(errors),'error'))
        reject(err);

      }
    );
  });

  return promise;
};
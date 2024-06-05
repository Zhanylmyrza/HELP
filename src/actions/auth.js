import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "./types";

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    
    try {
      const currentUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );
      const userId = currentUser.data.id
      
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/person/${userId}`,
        config
      );

      console.log("load_user res.data", res.data);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(
        "Error loading user:",
        err.response ? err.response.data : err.message,
      );
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );
    console.log('res.data', res.data)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signup =
  (full_name, email, password, re_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ full_name, email, password, re_password });

    try {
      // const res = await axios.post(
      //   `${process.env.REACT_APP_API_URL}/auth/users/`,
      //   body,
      //   config
      // );
      const res = await axios.post(
        `/auth/users/`,
        body,
        config
      );

      console.log('USER REGISTERED',res.data)

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data, //{email, full_name, id}
      });
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      console.log('USER CANT REGISTER', err)

      return Promise.reject()
    }
  };

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};


// Function to refresh the token
// export const refreshToken = async () => {
//   try {
//     const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh`, {refresh:''});
//     return response.data; // Assumes the response contains the new token
//   } catch (error) {
//     console.error('Unable to refresh token', error);
//     throw error;
//   }
// };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const update_profile =
  (profile, id) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/person/${id}`,
        profile,
        config
      );

      console.log('succcccccessssssss',res.data)

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log('errrrrrroooooorrrr', err)
      console.log("Error Response data", err.response.data)

      dispatch({
        type: UPDATE_PROFILE_FAIL,
      });
      
      return Promise.reject()
    }
  };




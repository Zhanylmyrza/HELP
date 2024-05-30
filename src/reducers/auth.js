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
  SAVE_PERSON_SUCCESS,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: payload,
      };

    case USER_LOADED_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload))
      return {
        ...state,
        user: payload,
      };

    case SAVE_PERSON_SUCCESS:
      const userNewData = { ...state.user, saved_persons: [...state.user.saved_persons, payload] };
      localStorage.setItem("user", JSON.stringify(userNewData))

      return {
        ...state,
        user: userNewData,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload
      }
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
      }
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.clear()
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: {},
      };
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

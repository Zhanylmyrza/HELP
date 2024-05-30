import axios from "axios";
import { SAVE_PERSON_SUCCESS } from "./types";

export const savePerson = (user) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try { 
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/person/${user.email}/like`, config)

      dispatch({
        type: SAVE_PERSON_SUCCESS,
        payload: user,
      })
      
    } catch (error){
    //   dispatch({
    //     type: PERSON_LIST_FAIL,
    //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    //   })
    }
  }
  
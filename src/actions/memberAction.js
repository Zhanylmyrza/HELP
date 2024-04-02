
import axios from "axios";
import {
    PERSON_LIST_REQUEST,
    PERSON_LIST_SUCCESS,
    PERSON_LIST_FAIL,
} from "./types";


export const getPersonList = () => async (dispatch) => {
    try {
      dispatch({type: PERSON_LIST_REQUEST})
      
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/person`)
      console.log('PERSON List =====>', res.data)
      
      dispatch({
        type: PERSON_LIST_SUCCESS,
        payload: res.data,
      })
      
    } catch (error){
      dispatch({
        type: PERSON_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    }
  }
  
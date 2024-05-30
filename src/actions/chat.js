import axios from "axios"
import { CHAT_HISTORY_FAIL, CHAT_HISTORY_REQUEST, CHAT_HISTORY_SUCCESS } from "./types";

export const getChatHistory = (email) => async (dispatch) => {
    const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

    try{
        dispatch({type: CHAT_HISTORY_REQUEST})
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/chat/${email}/`, config)
        const sortedChatHistory = res.data.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))

        dispatch({
            type: CHAT_HISTORY_SUCCESS,
            payload: sortedChatHistory,
          })

    } catch (error){
        dispatch({
            type: CHAT_HISTORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
          })
    }
}
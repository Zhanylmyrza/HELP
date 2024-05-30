import { CHAT_HISTORY_FAIL, CHAT_HISTORY_REQUEST, CHAT_HISTORY_SUCCESS } from "../actions/types";


const initialState = {
    chatHistory: [],
    loading:false,
    error: null,
}
  
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case CHAT_HISTORY_REQUEST:
        return { 
            ...state,
            loading: true,
        };
  
      case CHAT_HISTORY_SUCCESS:
        return { 
            ...state,
            loading: false, 
            chatHistory: payload,
        };
  
      case CHAT_HISTORY_FAIL:
        return { 
            ...state,
            loading: false, 
            error: payload,
         };
  
      default:
        return state;
    }
  };
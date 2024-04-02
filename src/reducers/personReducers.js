import { PERSON_LIST_FAIL, PERSON_LIST_REQUEST, PERSON_LIST_SUCCESS } from "../actions/types";


const initialState = {
    person: []
}
  
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case PERSON_LIST_REQUEST:
        return { 
            ...state,
            loading: true,
        };
  
      case PERSON_LIST_SUCCESS:
        return { 
            ...state,
            loading: false, 
            person: payload,
        };
  
      case PERSON_LIST_FAIL:
        return { 
            ...state,
            loading: false, 
            error: payload,
         };
  
      default:
        return state;
    }
  };
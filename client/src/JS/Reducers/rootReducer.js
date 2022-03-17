import { IS_AUTHORISED } from "../Constants/action-types";
import { SIGNOUT } from "../Constants/action-types";
import { UPDATE } from "../Constants/action-types";
import { GET_INFO } from "../Constants/action-types";
import { GET_SUB } from "../Constants/action-types";
import { CANCEL_SUB } from "../Constants/action-types";
import { GET_NOTIFICATION } from "../Constants/action-types";
import { POST_TOAST, GET_PRICES } from "../Constants/action-types";

const initialState = {
  status: {
    isauthorized: false,
    user: {},
  },
  info: {},
  sub: { status: false },
  notification: {},
  toast: {
    state: "",
    text: "",
    show: false
  },
  prices: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case IS_AUTHORISED: {
      return {
        ...state,
        status: {
          isauthorized: action.payload.isauthorized,
          user: action.payload.user,
        }
      }
    }
    case SIGNOUT: {
      return {
        ...state,
        status: {
          isauthorized: action.payload.isauthorized,
          user: action.payload.user,
        },
        info: {},
        sub: { status: false }
      }
    }
    case UPDATE: {
      return {
        ...state,
        status: {
          isauthorized: action.payload.isauthorized,
          user: action.payload.user,
        }
      }
    }
    case GET_INFO: {
      return {
        ...state,
        info: action.payload.info
      }
    }
    case GET_SUB: {
      return {
        ...state,
        sub: action.payload.sub
      }
    }
    case CANCEL_SUB: {
      return {
        ...state,
        sub: action.payload.sub
      }
    }
    case GET_NOTIFICATION: {
      return {
        ...state,
        notification: action.payload.notification
      }
    }
    case POST_TOAST: {
      return {
        ...state,
        toast: {
          state: action.payload.toast.state,
          text: action.payload.toast.text,
          show: action.payload.toast.show
        }
      }
    }
    case GET_PRICES:{
      return {
        ...state,
        prices: action.payload
      }
    }
    default:
      return state;
  }
}

export default rootReducer;

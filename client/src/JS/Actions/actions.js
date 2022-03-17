
import {IS_AUTHORISED} from '../Constants/action-types'
import {SIGNOUT} from '../Constants/action-types'
import {UPDATE} from '../Constants/action-types'
import {GET_INFO} from '../Constants/action-types'
import {GET_SUB} from '../Constants/action-types'
import {CANCEL_SUB} from '../Constants/action-types'
import {GET_NOTIFICATION} from '../Constants/action-types' 
import {POST_TOAST, GET_PRICES} from '../Constants/action-types'

export const authorization = (object) => {
    return {
        type: IS_AUTHORISED,
        payload: object,
    };
};

export const signout = (object) => {
    return {
        type: SIGNOUT,
        payload: object,
    }
}

export const update = (object) => {
    return {
        type: UPDATE,
        payload: object,
    }
}

export const getinfo = (object) => {
    return { 
        type: GET_INFO, 
        payload: object
    }
}

export const getsub = (object) => {
    return {
        type: GET_SUB,
        payload: object
    }
}

export const cancelsub = (object) => {
    return {
        type: CANCEL_SUB,
        payload: object
    }
}

export const getnotification = (object) => {
    return {
        type: GET_NOTIFICATION,
        payload: object
    }
}

export const getprices= (object) => {
    return {
        type: GET_PRICES,
        payload: object
    }
}

export const posttoast = (object) => {
    return {
        type: POST_TOAST,
        payload: object
    }
}
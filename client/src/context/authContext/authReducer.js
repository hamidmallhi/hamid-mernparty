import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_ERROR
  } from '../types'
  
  export default (state, action) => {
    switch (action.type) {

      case GET_USER:
        return {
          ...state,
          userAuth: true,
          user: action.payload,
          errors: null,
          loading: false
        }

      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token)
        return {
          ...state,
          // ...action.payload,
          userAuth: true,
          loading: false,
          errors: null
        }
      case REGISTER_FAIL:
      case LOGIN_FAIL:
        case AUTH_ERROR:
      case LOGOUT:
      
        localStorage.removeItem('token')

        return {
          ...state,
          token: null,
          user: null,
          loading: false,
          userAuth: null,
          errors: action.payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          errors: null
        }
        case SET_ERROR:
          return {
            ...state,
            errors: action.payload
          }
      default:
        return state
    }
  }

  

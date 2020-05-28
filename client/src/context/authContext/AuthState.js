import React, { useReducer } from 'react'
import axios from 'axios'
import authReducer from '../authContext/authReducer'
import AuthContext from '../authContext/authContext'
import setToken from '../../utils/setToken'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ERROR,
  GET_USER,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    userAuth: null,
    loading: true,
    user: null,
    errors: null
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Get User

  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token)
    }
    try {
      const res = await axios.get('/auth')
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data
      })
    }
  }

  //Register User
    const registerUser = async userData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post("/register", userData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            getUser()
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        }
    }

    // Login User
    const loginUser = async userData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post("/auth", userData, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            getUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
        }
    }

 // LOGOUT User
    const logout = () => {
      dispatch({
        type: LOGOUT,
      })
    }
 
//   Set Error
    const setError = err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      })
    }

    // Clear Errors
    const clearErrors = () => {
      dispatch({
        type: CLEAR_ERRORS,
      })
    }

  return (
    <AuthContext.Provider value={{
      token: state.token,
      userAuth: state.userAuth,
      user: state.user, 
      errors: state.errors,
      loading: state.loading,
      registerUser,
      loginUser,
      getUser,
      logout,
      clearErrors,
      setError
    }} >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState

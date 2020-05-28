import React, { useReducer } from 'react'
import axios from 'axios'
import GuestContext from './guestContext';
import guestReducer from './guestReducer';
import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  GET_GUESTS,
  GUESTS_ERROR,
  CLEAR_GUESTS,
  CLEAR_GUEST_ERRORS
} from '../types'

const GuestState = (props) => {

  const initialState = {
    filterGuest: false,
    search: null,
    editGuest: null,
    guests: [],
    errors: null
    // loading: false
  }

  const [state, dispatch] = useReducer(guestReducer, initialState)

  // Get Guests

  const getGuests = async () => {
    try {
      const res = await axios.get('/guests')
      dispatch({
        type: GET_GUESTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.data
      })
    }
  }


  // Add Guest 
  const addGuest = async (guest) => {

    const config = {
      "Content-Type": "application/json"
    }
    try {
      const res = await axios.post('/guests', guest, config)
      dispatch({
        type: ADD_GUEST,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.data
      })
    }
  }
  
  // Remove Guest 
  const removeGuest = async (id) => {
    try {
      await axios.delete(`/guests/${id}`)
      dispatch({
        type: REMOVE_GUEST,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.data
      })
    }
  }
  

  // Update Guest 
  const updateGuest = async (guest) => {

    const config = {
      "Content-Type": "application/json"
    }
    try {
      const res = await axios.put(`/guests/${guest._id}`, guest, config)
      dispatch({
        type: UPDATE_GUEST,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.data
      })
    }
  }

  // Edit Guest 
  const edit_Guest = (guest) => {
    dispatch({
      type: EDIT_GUEST,
      payload: guest
    })
  }

  // Clear Edit Guest 
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }

  // toggle isConfirmed
  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER
    })
  }
   // Search Guest
  const searchGuest = (guest) => {
    dispatch({
      type: SEARCH_GUEST,
      payload: guest
    })
  }
  // Clear Search Guest
  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }
  // Clear Guests
  const clearGuests = () => {
    dispatch({
      type: CLEAR_GUESTS
    })
  }
  // Clear Errors
  const clearGuestErrors = () => {
    dispatch({
      type: CLEAR_GUEST_ERRORS
    })
  }
  

  return (

    <GuestContext.Provider
    value = {{
      guests: state.guests,
      filterGuest: state.filterGuest,
      search: state.search,
      editGuest: state.editGuest,
      errors: state.errors,
      // loading: state.loading,
      addGuest,
      getGuests,
      removeGuest,
      updateGuest,    
      edit_Guest,
      clearEdit,
      toggleFilter,
      searchGuest,
      clearSearch,
      clearGuests,
      clearGuestErrors

    }}
    >
      {props.children}
    </GuestContext.Provider>

  )
}


export default GuestState




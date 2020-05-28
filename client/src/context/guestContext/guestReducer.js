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

  export default (state, {type, payload}) => {
    switch(type) {

      case GET_GUESTS:
        return {
          ...state,
          guests: payload
        }

        case GUESTS_ERROR:
        return {
          ...state,
          guests: [],
          errors: payload
        }

        case ADD_GUEST:
        return {
          ...state,
          guests: [...state.guests, payload]
        }

        case REMOVE_GUEST:
        return {
          ...state,
          guests: state.guests.filter(guest => guest._id !== payload)
        }

        case UPDATE_GUEST:
        return {
          ...state,
          guests: state.guests.map(guest => guest._id === payload._id ? payload : guest)
        }

        case EDIT_GUEST:
        return {
          ...state,
          editGuest: payload
        }

        case CLEAR_EDIT:
        return {
          ...state,
          editGuest: null
        }

        case SEARCH_GUEST:
        const reg = new RegExp(`${payload}`, 'gi')
        return {
          ...state,
          search: state.guests.filter(guest => guest.name.match(reg))
        }
      case CLEAR_SEARCH:
        return {
          ...state,
          search: null
        }  

        case  TOGGLE_FILTER:
            return{
                ...state,
                filterGuest: !state.filterGuest
            }
            case  CLEAR_GUESTS:
            return{
                ...state,
                filterGuest: false,
                search: null,
                editGuest: null,
                guests: [],
                errors: null
            }
            case CLEAR_GUEST_ERRORS:
              return {
                ...state,
                errors: null
              }

        default:
        return state
    }
  }

 
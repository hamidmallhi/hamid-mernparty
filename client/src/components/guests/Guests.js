import React, {useContext, useEffect} from 'react'
import GuestContext from '../../context/guestContext/guestContext'
import AuthContext from '../../context/authContext/authContext'
import Guest from './Guest'
// import spinner from './spinner1.gif'


const Guests = () => {
  const { loading } = useContext(AuthContext)
  const {guests, filterGuest, search, getGuests, errors} = useContext(GuestContext)

  useEffect(() => {
    getGuests()
    // eslint-disable-next-line
  }, [])
  
  if (guests === null || guests.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading...'  :
      errors === null ? 'Please add a guest' : ' '}</h3>
  }

  return (

    <div className="guests">
      { search !== null ? search.map(guest=> <Guest key={guest._id} guest={guest} />) :
        guests.filter(guest => !filterGuest || guest.isConfirmed)
        .map(guest=> <Guest key={guest._id} guest={guest} />)}
    </div>
  )
}
export default Guests








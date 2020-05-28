import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';

 

const Register = (props) => {
  const {registerUser, userAuth, errors, setError, clearErrors} = useContext(AuthContext)
  
  useEffect(() => {
    if(userAuth) {
      props.history.push('/')
    }
  }, [userAuth, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2}= user

    const handleChange = e => {
        setUser({...user, [e.target.name] : e.target.value})
        clearErrors()
    }
    const handleSubmit = e => {
        e.preventDefault()
        if(password !== password2) {
            setError({msg: "passwords don't match"})
        } else {
            registerUser({name, email, password})
            clearErrors()
        }
    }

  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="name" value={name} onChange={handleChange}></input>
      <input type="text" name="email" placeholder="email" value={email} onChange={handleChange}></input>
      <input type="text" name="password" placeholder="password" value={password} onChange={handleChange}></input>
      <input type="text" name="password2" placeholder="password2" value={password2} onChange={handleChange}></input>
      <input type="submit" value="Sign Up" className="btn"></input>
      </form>
      <div className="question">
      {errors !== null && <button className="danger">
      {errors ? 'Email or password not correct' : 'Email or Password not Error'}
      <span onClick={() => clearErrors()}>X</span></button>}
      <p>Already have an account? {""} <Link to = '/login'>Login</Link></p>
      </div>
    </div> 
  );
}

export default Register;


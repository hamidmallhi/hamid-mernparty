import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';

 

const Login = (props) => {
  const {loginUser, userAuth, errors, clearErrors} = useContext(AuthContext)
  
  useEffect(() => {
    if(userAuth) {
      props.history.push('/')
    }
  }, [userAuth, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const {email, password}= user

    const handleChange = e => {
        setUser({...user, [e.target.name] : e.target.value})
        clearErrors()
    }
    const handleSubmit = e => {
        e.preventDefault()
            loginUser({email, password})
            clearErrors()
    }

  return (
    <div className="register">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" name="email" placeholder="email" value={email} onChange={handleChange}></input>
      <input type="text" name="password" placeholder="password" value={password} onChange={handleChange}></input>
      <input type="submit" value="Login" className="btn"></input>
      </form>
      <div className="question">
      {errors !== null && <button className="danger">
        {errors.msg ? errors.msg : errors.error[0].msg}
      <span onClick={() => clearErrors()}>X</span></button>}
      <p>Don't have an account? {" "} <Link to = '/register'>Sign Up</Link></p>
      </div>
    </div> 
  );
}

export default Login;

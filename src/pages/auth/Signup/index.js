import React, {useState } from 'react'
import style from './signup.module.css'
import {Link, useHistory} from 'react-router-dom'
import Button from '../../../components/Button'
import axios from 'axios'
import swal from 'sweetalert'

function Signup() {
  const history = useHistory();
  const url = process.env.REACT_APP_API;
  const [formUser, setFormUser] = useState({
    email: '',
    password: '',
    firstName: '',
  });


  const handleFormChange = (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    })
  };

  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`http://localhost:8081/v1/users/signup`, formUser)
      .then((res) => {
          // console.log(res.data.data, 'lihatttttttt')
          const dataRegis = res.data.data;
          if(dataRegis === null){
            swal('Email is registered')
          } 
          swal(`Registered \n Email : ${formUser.email}, Check your email to verify `)
          history.push("/signin");
            
      })
      .catch((err) => {
          console.log(err);
      })       
  };
  return (
    <div>
      <div className={style["main"]}>
        <div className={style["form-container"]}>
          <div className="container">
            <p className={style["title"]}>Register</p>
            <br/>
            <p className={style["teks"]}>Let’s create your account!</p>
    
            <form className={style["form-register"]}>
              <div className="form-group mt-4">
                <p className={style["name"]}>Name</p>
                <input
                  type="text"
                  className={[["form-control mt-1"], style["form-control"]].join(" ")}
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your username"
                  value={formUser.firstName}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>
              <div className="form-group mt-3">
                <p className={style["name"]}>Email</p>
                <input
                  type="email" className={[["form-control mt-1"], style["form-control"]].join(" ")}
                  name="email"
                  id="email"
                  placeholder="Enter your email adress"
                  value={formUser.email}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>
              <div className="form-group mt-3">
                <p className={style["name"]}>Password</p>
                <input
                  type="password"
                  className={[["form-control mt-1"], style["form-control"]].join(" ")}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formUser.password}
                  onChange={(e)=>handleFormChange(e)}
                />
              </div>
              
              <div>
                <Link to="/forgot-password">
                  <p className={style["forgot"]}>Forgot Password?</p>
                </Link>
              </div>
              
              <button
                type="submit"
                className={[["btn"], style["btn-auth"]].join(" ")}
                onClick={handleSubmit}
              >
                Sign Up
              </button>
              
              
            </form>
              <p className={style["register-teks"]}>Already have account ? <Link to="/signin">Signin</Link> Now </p>
              {/* <p className={style["register-teks"]}>Register </p> */}
              <Button 
                type="submit"
                btn="btn-signup-google"
                // onClick={handleSubmit}
                btnValue="Google"
              />

          </div>
        </div>
      </div>
    </div>
  )
}


export default Signup
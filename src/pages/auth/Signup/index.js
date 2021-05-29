import React, {useState } from 'react'
import style from './signup.module.css'
import {Link, useHistory} from 'react-router-dom'
import Button from '../../../components/Button'
import axios from 'axios'
import swal from 'sweetalert'

function Signup() {
  const history = useHistory();
  const url = process.env.REACT_APP_API;

  const [passwordErr, setPasswordErr] = useState({})
  const [firstNameErr, setFirstNameErr] = useState({})
  const [emailErr, setEmailErr] = useState({})

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
      const isValid = formValidation();
      if(formUser.email === ''){
        swal('Email cannot be empty!')
      } else if(formUser.password === ''){
        swal('Password cannot be empty!')
      } else if(formUser.firstName === ''){
        swal('First name cannot be empty !')
      } else{
        if(isValid){
          axios.post(`${process.env.REACT_APP_API}/users/signup`, formUser)
          .then((res) => {
            // const dataRegis = res.data.data;
            console.log(res, 'lihatttttttt')
            if(res.data.data==null){
              swal(res.data.error.message)
            } 
            swal(`Registered \n Email : ${formUser.email}, Check your email to verify `)
            history.push("/");
          })
          .catch((err) => {
              console.log(err);
          })       
        }
      }
    };
  
    const formValidation = () =>{
      const passwordErr = {};
      const firstNameErr = {};
      const emailErr = {};
      let isValid = true;

      if(formUser.password.trim().length < 8){
        passwordErr.passwordShort = "Password is too short. Min 8 character";
        isValid = false;
      }

      if(formUser.firstName.trim().length < 5){
        firstNameErr.firstNameShort = "Your Name is too short. Min 5 character";
        isValid = false;
      }

      if(formUser.email.trim().length < 1){
        emailErr.emailEmpty = "Email cannot be empty!"
      }

      setPasswordErr(passwordErr);
      setFirstNameErr(firstNameErr);
      setEmailErr(emailErr)
      return isValid;
    }

    const handleGoogleBtn = ()=>{
      history.push("/")
    }

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
                {Object.keys(firstNameErr).map((key)=>{
                  return <div className={style['error-validation']} style={{color: "red"}}>{firstNameErr[key]}</div>
                })}
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
                {Object.keys(emailErr).map((key)=>{
                  return <div className={style['error-validation']} style={{color: "red"}}>{emailErr[key]}</div>
                })}
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
                {Object.keys(passwordErr).map((key)=>{
                  return <div className={style['error-validation']} style={{color: "red"}}>{passwordErr[key]}</div>
                })}
              </div>
              
              <div>
                <Link to="/signup">
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
              <p className={style["register-teks"]}>Already have account ? <Link to="/">Signin</Link> Now </p>
              {/* <p className={style["register-teks"]}>Register </p> */}
              <Button 
                type="submit"
                btn="btn-signup-google"
                onClick={handleGoogleBtn}
                btnValue="Google"
              />

          </div>
        </div>
      </div>
    </div>
  )
}


export default Signup

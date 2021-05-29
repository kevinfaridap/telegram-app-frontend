import React, {useState } from 'react'
import style from './signin.module.css'
import {Link, useHistory} from 'react-router-dom'
import Button from '../../../components/Button'
import axios from 'axios'
import swal from 'sweetalert'

function Signin() {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
  });


const handleFormChange = (e) => {
  setData({
    ...data,
    [e.target.name]: e.target.value
  })
};


  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/users/signin`, data)
    .then((res) => {
      const dataLogin = res.data.data;
      // console.log(res.data);
      if(res.data.data == null){
        swal(res.data.error.message)
      } else {
        localStorage.setItem("token", dataLogin.token)
        if (dataLogin.token) {
        swal('Success Login')
        history.push("/chat");
        } 
      }
    })
    .catch((err) => {
      console.log(err);
      swal('Email and Password are incorrect')
    })        
  };

  const handleGoogleBtn = ()=>{
    history.push("/signup")
  }
  return (
    <div>
      <div>
        <div className={style["main"]}>
          <div className={style["form-container"]}>
            <div className="container">
              <p className={style["title"]}>Login</p>
              <br/>
              <p className={style["teks"]}>Hi, Welcome Back!</p>
      
              <form className={style["form-login"]}>
                <div className="form-group mt-3">
                  <p className={style["name"]}>Email</p>
                  <input
                    type="email" className={[["form-control mt-1"], style["form-control"]].join(" ")}
                    name="email"
                    id="email"
                    placeholder="Enter your email adress"
                    value={data.email}
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
                    value={data.password}
                    onChange={(e)=>handleFormChange(e)}
                  />
                </div>
                
                <div>
                  <Link to="/">
                    <p className={style["forgot"]}>Forgot Password?</p>
                  </Link>
                </div>
                
                <button
                  type="submit"
                  className={[["btn"], style["btn-auth"]].join(" ")}
                  onClick={handleLogin}
                >
                  Login
                </button>
                
                
              </form>
                <p className={style["login-teks"]}>Login With</p>
                
                <Button 
                  type="submit"
                  btn="btn-signup-google"
                  onClick={handleGoogleBtn}
                  btnValue="Google"
                />
                <p className={style["dont-have-acc"]}>Don't have account? <Link to="/signup">Signup</Link></p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin

import React, {useState } from 'react'
import style from './verify.module.css'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function Verify(props) {
  const history = useHistory();

  const email = props.match.params.email;
  const result = email
  const lastEmail = result.substring(6)
  const [verifyAcc, setVerifyAcc] = useState({
    email: lastEmail
  })
  
  

  const handleVerify = (e)=>{
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API}/users/verify`, verifyAcc)
      .then((res) => {
        console.log(res);
        swal('Success Verify')
        history.push("/")
      })
      .catch((err) => {
          console.log(err);
      }) 
  }

 
  return (
    <div>
      <p className={style["teks"]}>Click here to verify</p>
      <button
        type="submit"
        className={[["btn"], style["btn-verify"]].join(" ")}
        onClick={handleVerify}
      >
        Verify
      </button>
    </div>
  )
}

export default Verify

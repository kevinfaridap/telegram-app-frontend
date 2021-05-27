import React, { useEffect, useState, useRef } from 'react'
import SideChat from '../../../components/SideChat'
import StartMessage from '../../../parts/Chat/StartMessage'
import style from './settings.module.css'
import axiosApiInstance from '../../../helpers/axios'
import qs from 'query-string'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {menu} from '../../../assets/images'
import swal from 'sweetalert'
import {update} from '../../../configs/actions/user'
import {useDispatch} from 'react-redux'
import { MdDelete } from "react-icons/md";

function Settings({ match, location, socket}) {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [removeBio, setRemoveBio] = useState({
    idUser: user.id,
  });

  const dispatch = useDispatch()
  const imageRef = useRef(null)

  const [formUpdateProfile, setFormUpdateProfile] = useState({
    firstName: user.firstName,
    username: user.username,
    phoneNumber: user.phoneNumber,
    image: user.image,
    bio: ''
  })  

  const handleFormUpdate = (e) =>{
    setFormUpdateProfile({
      ...formUpdateProfile,
      [e.target.name]: e.target.value
    })
  }
  
  const handleChangeImage =(e) => {
    setFormUpdateProfile({
      ...formUpdateProfile,
      image: e.target.files[0]
    })
    // console.log(e.target.files[0], 'asdasdasd')
  }

  // const handleFormRemove = (e) =>{
  //   setRemoveBio({
  //     ...removeBio,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const handleRemoveBio = (e)=>{
    // e.preventDefault();
    axios.put(`${process.env.REACT_APP_API}/users/removebio`, {
      idUser: user.id,
    })
      .then((res) => {
          console.log(res.data)
          if(res.data){
            swal(`Removed Bio`)
            history.push('/')
          } 
      })
      .catch((err) => {
          console.log(err);
      }) 
  }

  const handleUpdate = (e) =>{
    e.preventDefault()
    const formData = new FormData()

    formData.append('firstName', formUpdateProfile.firstName)
    formData.append('username', formUpdateProfile.username)
    formData.append('phoneNumber', formUpdateProfile.phoneNumber)
    formData.append('image', formUpdateProfile.image)
    formData.append('bio', formUpdateProfile.bio)
    imageRef.current.value = ""

    const id = user.id
    dispatch(update(formData, id))
    .then((res)=>{
      setFormUpdateProfile({
        firstName: user.firstName,
        username: user.username,
        phoneNumber: user.phoneNumber,
        image: user.image,
        bio: user.bio
      })
     
      if(res.message === 'Success update data'){
        swal(res.message)
        history.push('/chat')
      }
      else if(res.message==='File too large'){
        swal('File size too large, max size = 2 mb')
      } else{
        swal(res.message)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  // const handleChangePassword = (e) =>{
  //   axios.put(`${process.env.REACT_APP_API}/users/${user.id}`, formUpdateProfile)
  //     .then((res) => {
  //         console.log(res.data)
  //         if(res.data === null){
  //           swal(`Failed`)
  //         } else{
  //           swal(`Success Update Profile`)
  //         }
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //     }) 
  // }

  const idsender = `${user.id}`


  useEffect(()=>{
    axiosApiInstance.get(`${process.env.REACT_APP_API}/users/profile`)
    .then((res)=>{
      const dataUser = res.data.data[0]
      // console.log('isasdasd' , dataUser.id);
      setUser(dataUser)

    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

 


  const handleSetting = () =>{
    history.push('/setting')
  }

  const handleLogout = () =>{
    localStorage.removeItem("token");
    swal("You Have Been Logged Out!")
    history.push('/')
  }

  return (
    <div>
        <div className={[["row"], style["chat"]].join(' ')}>
          <div className="col-lg-3">
            <div className={style["side-chat"]}>
              <div className="container">
                <Link to="/chat">
                  <h5 className={style["title"]}>Telegram App</h5>
                </Link>
                
                <div className={[style["btn-menu"], ["dropright"]].join(' ')}>
                  {/* <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                    <img src={menu} alt="" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                  {/* </button> */}
                  <div className={[["dropdown-menu"], style["drop-menu"]].join(' ')} >
                    <button className="dropdown-item" type="button" onClick={handleSetting}>Settings</button>
                    <button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
                <br/>
                <form>
                  <p className={style["username"]}>@{user.firstName}</p>
                  
                  <br/>
                  <img className={style["user-img"]} src={user.image} alt=""/>
                  <input type="file" 
                    className={style['form-img']} 
                    name="image"
                    id="image"
                    title="edit"
                    ref={imageRef}
                    onChange={e => handleChangeImage(e)}
                  />
                  <br/>
                  {/* <p className={style["fullName"]}>{user.firstName} {user.lastName}</p> */}
                  <input 
                    className={[ style["form-profile-fullname"], ["outline-noone"]].join(' ')} 
                    type="text" 
                    name="firstName"
                    id="firstName"
                    placeholder={`${user.firstName} `}
                    value={formUpdateProfile.firstName}
                    onChange={e=>handleFormUpdate(e)}
                  />
                  <br/>
                  <p className={style["acc"]}>Account</p>
                  <br/>
                  {/* <p className={style["phonenumber"]}>{user.phoneNumber}</p> */}
                  <input 
                    className={[style["form-profile-phone"]].join(' ')} 
                    type="text" 
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder={`${user.phoneNumber}`}
                    value={formUpdateProfile.phoneNumber}
                    onChange={e=>handleFormUpdate(e)}
                  />
                  <br/>
                  <input 
                    className={[ style["form-profile-username"]].join(' ')} 
                    type="text" 
                    name="username"
                    id="username"
                    placeholder={`@${user.username}`}
                    value={formUpdateProfile.username}
                    onChange={e=>handleFormUpdate(e)}
                  />
                  <br/>
                  <p className={style["username-edit"]}>Username</p>
                  <br/>
                  <textarea 
                    className={[ style["form-profile-bio"]].join(' ')} 
                    type="text" 
                    name="bio"
                    id="bio"
                    placeholder={`${user.bio}`}
                    value={formUpdateProfile.bio}
                    onChange={e=>handleFormUpdate(e)}
                  />
                  <br/>
                  <p className={style["bio"]}>Bio</p>
                  
                </form>

                <button 
                  className={style["btn-change-profule"]}
                  type="button"
                  onClick={handleUpdate}
                > Update
                </button>
                <button 
                  type="submit"
                  onClick={handleRemoveBio}
                  className={style['btn-remove-bio']}
                > 
                  <MdDelete 
                    className={style["icon-delete"]}
                  />
                  
                </button>
              </div> 
            </div>
          </div>
          <div className="col">
            <StartMessage teks=""/>
          </div>
        </div>

      
    </div>
  )
}

export default Settings

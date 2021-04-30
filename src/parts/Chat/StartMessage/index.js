import React, { useEffect, useState } from 'react'
import style from './startmessage.module.css'
import qs from 'query-string'
import axiosApiInstance from '../../../helpers/axios'


function StartMessage({ match, location, socket }) {
  // Pindah ke Chat
  // const [user, setUser] = useState([]);

  // useEffect(()=>{
  //   axiosApiInstance.get(`http://localhost:8081/v1/users/profile`)
  //   .then((res)=>{
  //     const dataUser = res.data.data[0]
  //     setUser(dataUser)
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // }, [])

  // useEffect(()=>{
    // const urlQuery = qs.parse(location.search)
    // const room = match.params.room
  //   if(socket){
  //     socket.emit('initialUser', user.id)
  //   }
  // }, [socket])

  return (
    <div>
      <div className={style["start-message"]}>
        <p className={style["text"]}>Please select a chat to start messaging</p>
        
      </div>
    </div>
  )
}

export default StartMessage

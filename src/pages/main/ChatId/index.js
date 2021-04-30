import React, { useEffect, useState } from 'react'
import SideChat from '../../../components/SideChat'
import StartMessage from '../../../parts/Chat/StartMessage'
import style from './chatid.module.css'
import axiosApiInstance from '../../../helpers/axios'
import qs from 'query-string'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'

function ChatId({ match, location, socket}) {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  // const [recevierId, setReceiverId] = useState
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const idRec = match.params.idreceiver;
  const idsender = `${user.id}`
 
  
  const [sendMessage, setSendMessage] = useState({
    idUser: idsender,
    idReceiver: idRec,
    body: ''
  })
    // console.log(idsender, 'iuser');
    // console.log(idRec, 'idrec');
    // console.log(sendMessage.body, 'isinya');
  
  const handleInputText = (e) =>{
    setSendMessage({
      ...sendMessage,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const urlQuery = qs.parse(location.search)
    // setUser(urlQuery.username)

    if(socket){
      socket.on('receiverMessage', (dataMessage) => {
        setMessages([...messages, dataMessage])
      })
    }
    
  }, [socket, messages])


  useEffect(()=>{
    axiosApiInstance.get(`http://localhost:8081/v1/users/profile`)
    .then((res)=>{
      const dataUser = res.data.data[0]
      console.log('isasdasd' , dataUser.id);
      setUser(dataUser)

      console.log(dataUser.id, 'userid = initialsocket');
      if(socket ||  userid != null){
        socket.emit('initialUser', dataUser.id)
    
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  useEffect(()=>{
    axiosApiInstance.get(`http://localhost:8081/v1/users`)
    .then((res)=>{
      const dataFriend = res.data.data
  
      setAllUser(dataFriend)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])


  // console.log(user.id);
  const userid = user.id
  // useEffect(()=>{
  //   const urlQuery = qs.parse(location.search)


  //   console.log(userid, 'check');
  //   if(socket ||  userid != null){
      
  //   } else if(socket || userid === undefined){
      
  //   }

  // }, [socket])


  const handleSendMessage = (e)=>{
    const room = match.params.room
    const kirimpesan = sendMessage.body
    const idRec = match.params.idreceiver;
    // console.log(kirimpesan);
    
    e.preventDefault();
    socket.emit('sendMessage', {
      body: kirimpesan,
      idReceiver: idRec,
      idUser: userid
    }, (data)=>{
      setMessages([...messages, data]) 
    })
    // axios.post(`http://localhost:8081/v1/message/sendmessage`, sendMessage)
    //   .then((res) => {
    //       console.log(res.data, 'data handle chat ')
           
            
           
          
    //   })
    //   .catch((err) => {
    //       console.log(err);
    //   }) 
  }

  
  
  // console.log(allUser[0].id, 'asdasdasf');


  return (
    <div>
        <div className={[["row"], style["chat"]].join(' ')}>
          <div className="col-lg-3">
            <div className={style["side-chat"]}>
              <div className="container">
                <Link to="/chat">
                  <h5 className={style["title"]}>Telegram</h5>

                </Link>
                <input 
                  className={[["form-control"], style["form-search"]].join(' ')} 
                  type="search" 
                  placeholder="Type your message..." 
                  aria-label="Search"
                >
                </input>
                <br/>
                <div className="row">
                  <div className="col">
                    <p className="all">All</p>
                  </div>
                  <div className="col">
                    <p className="important">Important</p>
                  </div>
                  <div className="col">
                  <p className="unread">Unread</p>
                  </div>
                </div>
                <br/>
                {allUser !== undefined ? allUser.map((item)=>{
                  return (
                  <>
                    <div className="row">
                      <div className="col">
                        <img className={style["user-img"]} src="https://img.icons8.com/bubbles/2x/user-male.png" alt=""/>
                      </div>
                      <div className="col">
                        <p className={style["user-name"]}  onClick={() => history.push(`/chatid/${item.id}`)} >{item.firstName}</p>
                       
                        {/* <p className={style["user-name"]} onClick={()=>setAllUser()} >{item.firstName}</p> */}
                        <br/>
                        <p className={style["message"]}>Hey you !</p>
                      </div>
                      <div className="col">
                        <p className="time">15:30</p>
                      </div>
                    </div>
                  </>
                  )
                  }) : console.log("try again")} 
                
              </div> 
            </div>
          </div>
          <div className="col">
            <div className="wrapper-chat">
            <ul className="list-group">

                <li className="list-group-item active" key="" aria-current="true">{idRec}</li>
            
              {messages.map((item, index)=>
                <li className={`list-group-item`} key={index}>{item.body +' | '+item.createdAt}</li>
              )}
            </ul>
            </div>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="text here" 
                name="body"
                id="body"
                value={sendMessage.body}
                onChange={(e)=>handleInputText(e)} 
                // value={formTransfer.pin}
                // onChange={(e)=>handleFormTransfer(e)}
                // onChange={(e)=>setMessage(e.target.value)} 
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSendMessage}>Kirim</button>
              </div>
            </div>
          
            {/* <StartMessage /> */}
          </div>
        </div>

      
    </div>
  )
}

export default ChatId

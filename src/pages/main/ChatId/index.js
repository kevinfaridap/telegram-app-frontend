import React, { useEffect, useState } from 'react'
import SideChat from '../../../components/SideChat'
import StartMessage from '../../../parts/Chat/StartMessage'
import style from './chatid.module.css'
import axiosApiInstance from '../../../helpers/axios'
import qs from 'query-string'
import axios from 'axios'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {menu} from '../../../assets/images'
import swal from 'sweetalert'

function ChatId({ match, location, socket}) {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [dataReceiverById, setDataReceiverById] = useState([])
  // const [setting, setSetting] = useState(true)
  
  
  const idRec = match.params.idreceiver;
  const idsender = `${user.id}`
  const {search, pathname} = useLocation();
  
  const [sendMessage, setSendMessage] = useState([{
    idUser: idsender,
    idReceiver: idRec,
    body: ''
  }])
  
  const handleInputText = (e) =>{
    setSendMessage({
      ...sendMessage,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if(socket){
      socket.on('receiverMessage', (dataMessage) => {
        setMessages([...messages, dataMessage])
      })
    }
  }, [socket, messages])


  useEffect(()=>{
    axiosApiInstance.get(`${process.env.REACT_APP_API}/users/profile`)
    .then((res)=>{
      const dataUser = res.data.data[0]
      // console.log('isasdasd' , dataUser.id);
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
    axiosApiInstance.get(`${process.env.REACT_APP_API}/users`)
    .then((res)=>{
      const dataFriend = res.data.data
      setAllUser(dataFriend)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  const userid = user.id

  const handleSendMessage = (e)=>{
    const kirimpesan = sendMessage.body
    const idRec = match.params.idreceiver;
    e.preventDefault();
    socket.emit('sendMessage', {
      body: kirimpesan,
      idReceiver: idRec,
      idUser: userid
    }, (data)=>{
      setMessages([...messages, data]) 
    })
  }

  useEffect(()=>{
    setMessages([])
    axiosApiInstance.get(`${process.env.REACT_APP_API}/users/${idRec}`)
    .then((res)=>{
      const dataReceive = res.data.data[0]
      setDataReceiverById(dataReceive)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [pathname])
  // pathname ini biar pesan nya ga masuk semua saat pindah revuser, disini setMesaage([]) dijadiin gini
  
  
 

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
                  <h5 className={style["title"]}>Telegram</h5>
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
                        <img className={style["user-img"]} src={item.image} alt=""/>
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

              <ul className={style["list-group"]}>
                  <li className={[["list-group-item"], style["headline-chat"]].join(' ')} key="" aria-current="true">
                    <img className={style["receiver-profile"]} src={dataReceiverById.image} alt=""/>  
                    <p className={style["rec-name"]}>{dataReceiverById.firstName}</p>
                    
                  
                  </li>
                  {/* <li className={[["list-group-item"], style["headline-chat"]].join(' ')} key="" aria-current="true">{idRec}</li> */}
               
              
                {messages.map((item, index)=>
                  
                  <li className={`list-group-item ${user.id  === item.idUser? 'text-right': 'text-left'}`} key={index}>{item.body +' | '+item.createdAt} </li>
                )}
              </ul>


            
            <div className={[["input-group"], style["input-text"]].join(' ')}>
              <input 
                type="text" 
                className={[["form-control"], style["input-chat"]].join(' ')} 
                placeholder="Type your message here..." 
                name="body"
                id="body"
                value={sendMessage.body}
                onChange={(e)=>handleInputText(e)} 
              />
              <div className="input-group-append">
                <button className={[["btn"], style["btn-send"]].join(' ')} type="button" id="button-addon2" onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          
            {/* <StartMessage /> */}
          </div>
        </div>

      
    </div>
  )
}

export default ChatId

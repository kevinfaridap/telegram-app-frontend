import React, { useEffect, useState } from 'react'
import style from './chatid.module.css'
import axiosApiInstance from '../../../helpers/axios'
import axios from 'axios'
import {Link, useHistory, useLocation, useRouteMatch} from 'react-router-dom'
import {menu} from '../../../assets/images'
import swal from 'sweetalert'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getProfile} from '../../../configs/actions/user'
import {useSelector} from 'react-redux'

function ChatId({ match, location, socket}) {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  // const [user, setUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [dataReceiverById, setDataReceiverById] = useState([])
  const [getHistoryMsg, setGetHistoryMsg] = useState([])

  toast.configure()
  
  const idRec = match.params.idreceiver;
  const {search, pathname} = useLocation();
 
  // Ini dari redux
  const userProfile = useSelector((state)=>state.users)

  const idsender = userProfile.users.id
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
      socket.off('receiverMessage')
      socket.on('receiverMessage', (dataMessage) => {
        const notify = () => {
          toast.info("You Have New Messages");
          // console.log(dataMessage.idUser, 'cobalagi');
          // history.push(`/chatid/${dataMessage.idUser}`)
        }
        notify();
        setMessages([...messages, dataMessage])
      })
    }
  }, [socket, messages])


  useEffect(()=>{
    if(socket &&  userProfile.users.id != null){
      socket.emit('initialUser', userProfile.users.id)
    }
    // axiosApiInstance.get(`${process.env.REACT_APP_API}/users/profile`)
    // .then((res)=>{
    //   const dataUser = res.data.data[0]
    //   setUser(dataUser)
    // })
    // .catch((err)=>{
    //   console.log(err);
    // })
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
  

  const handleSendMessage = (e)=>{
    const kirimpesan = sendMessage.body
    const idRec = match.params.idreceiver;
    e.preventDefault();
    socket.emit('sendMessage', {
      body: kirimpesan,
      idReceiver: idRec,
      idUser: userProfile.users.id
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

    axios.get(`${process.env.REACT_APP_API}/message/${userProfile.users.id}/${idRec}`)
    .then((res)=>{
      const dataMsg = res.data.data
      // console.log(dataMsg, lihatttt);
      if(dataMsg !== null){
        setGetHistoryMsg(dataMsg)
      } else{
        setGetHistoryMsg([])
      }
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
                    {/* <p className="important">Important</p> */}
                  </div>
                  <div className="col">
                  {/* <p className="unread">Unread</p> */}
                  </div>
                </div>
                <br/>
                {allUser !== undefined ? allUser.map((item)=>{
                  return (
                  <>
                    <div className="row">
                      <div className="col-4">
                        <img className={style["user-img"]} src={item.image} alt=""/>
                      </div>
                      <div className="col-5">
                        <p className={style["user-name"]}  onClick={() => history.push(`/chatid/${item.id}`)} >{item.firstName}</p>
                        <br/>
                        <p className={style["message"]}>Lets talk!</p>
                      </div>
                      <div className="col-3">
                        <p className="time">15:30</p>
                      </div>
                    </div>
                  </>
                  )
                  }) : console.log("try again")} 
                
              </div> 
            </div>
          </div>
          <div className="col-lg-9">

              <ul className={style["list-group"]}>
                  <li className={[["list-group-item"], style["headline-chat"]].join(' ')} key="" aria-current="true">
                    <img className={style["receiver-profile"]} src={dataReceiverById.image} alt=""/>  
                    <p className={style["rec-name"]}>{dataReceiverById.firstName}</p>
                  </li>

                {getHistoryMsg.map((item, index) => 
                  userProfile.users.id === item.idUser ?(
                    <>
                    <div className="d-flex justify-content-end align-items-start" key={index}>
                      <p className={style['sender']}>{item.body} &emsp; {item.createdAt} </p>
                    </div>
                    </>
                  ) : 
                    <>
                    <div className="d-flex justify-content-start align-items-end" key={index}>
                      <p className={style['receiver']}> {item.createdAt} &emsp; {item.body}</p>

                    </div>
                    </>
                )} 

                {messages.map((item, index) => 
                  userProfile.users.id === item.idUser ?(
                    <>
                    <div className="d-flex justify-content-end align-items-start" key={index}>
                      <p className={style['sender']}>{item.body} &emsp; {item.createdAt} </p>

                    </div>
                    </>
                  ) : 
                    <>
                    <div className="d-flex justify-content-start align-items-end" key={index}>
                      <p className={style['receiver']}> {item.createdAt} &emsp; {item.body}</p>
                    </div>
                    </>
                )}
                {/* Ganti dengan yang diatas supaya lebih mudah styeling */}
                {/* {messages.map((item, index)=>
                  <div className={style["msg-style"]}>
                    <li className={`list-group-item ${user.id  === item.idUser? 'text-right bg-dark': 'text-left'}`} key={index}>{item.body +' | '+item.createdAt} </li>
                  </div>
                )} */}
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
          </div>
        </div>

      
    </div>
  )
}

export default ChatId

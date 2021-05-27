import React, { useEffect, useState } from 'react'
import SideChat from '../../../components/SideChat'
import StartMessage from '../../../parts/Chat/StartMessage'
import style from './chat.module.css'
import axiosApiInstance from '../../../helpers/axios'
import qs from 'query-string'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {menu} from '../../../assets/images'
import swal from 'sweetalert'
import {getProfile} from '../../../configs/actions/user'
import {useDispatch} from 'react-redux'

function Chat({ match, location, socket }) {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
 
  const dispatch =  useDispatch()
  
  const iduser = user.id
  
  const [sendMessage, setSendMessage] = useState({
    idUser: '',
    idReceiver: '',
    body: ''
  })

  useEffect(()=>{
    dispatch(getProfile())
    
  }, []);

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
      setUser(dataUser)
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


  useEffect(()=>{
    axios.post(`${process.env.REACT_APP_API}/message/sendmessage`)
    .then((res)=>{
      const sendMsg = res.data.data
  
      setSendMessage(sendMsg)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  // console.log(user.id);
  const userid = user.id
  useEffect(()=>{
    const urlQuery = qs.parse(location.search)
    const room = match.params.room

    if(socket && userid != null){
      console.log(userid, 'userid di initialsocket');
      socket.emit('initialUser', userid)
    }
  }, [socket])

  const handleSendMessage = ()=>{
    const room = match.params.room
    
    socket.emit('sendMessage', {
      message: message,
      receiverId: allUser[0].id
    }, (data)=>{
      setMessages([...messages, data])
    })
  }

  // console.log(allUser[0].id, 'asdasdasf');
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
          <div className="col-lg-3 ">
            <div className={style["side-chat"]}>
              <div className="container">
                <h5 className={style["title"]}>Telegram App</h5>

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
                <div className="row ml-4">
                  <div className="col-4 col-lg">
                    <p className="all">All</p>
                  </div>
                  <div className="col-4 col-lg">
                    {/* <p className="important">Important</p> */}
                  </div>
                  <div className="col-4 col-lg">
                  {/* <p className={style["unread"]}>Unread</p> */}
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
                        <p className={style["user-name"]} onClick={() => history.push(`/chatid/${item.id}`)} >{item.firstName}</p>
                        <br/>
                        <p className={style["message"]}>{item.username}</p>
                      </div>
                      <div className="col-3">
                        <p className={style["time"]}></p>
                      </div>
                    </div>
                  </>
                  )
                  }) : console.log("try again")} 
                
              </div> 
            </div>
          </div>
          <div className="col-lg">
            <StartMessage teks="Please select a chat to start messaging" />
          </div>
        </div>

      
    </div>
  )
}

export default Chat

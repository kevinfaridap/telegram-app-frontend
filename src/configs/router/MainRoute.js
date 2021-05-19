import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Signup from '../../pages/auth/Signup'
import Signin from '../../pages/auth/Signin'
import Chat from '../../pages/main/Chat'
import Verify from '../../pages/main/Verify'
// import io from 'socket.io-client'
import ChatId from '../../pages/main/ChatId'
import Settings from '../../pages/main/Settings'
import PrivateRoute from './module/PrivateRoute'
import PublicRoute from './module/PublicRoute'
import {getProfile} from '../../configs/actions/user'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'

function MainRoute() {
  // Pindahin ke private route
  // const [socket, setSocket] = useState(null)
  // const [message, setMessage] = useState('')
  // const [messages, setMessages] = useState([])
  
  // const setupSocket = ()=>{
  //   console.log('hello setupSocket berjalan');
  //   const newSocket = io("http://localhost:8081")
  //   setSocket(newSocket)
  // }

  // useEffect(()=>{
  //   setupSocket()
    
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])
  const dispatch =  useDispatch()
  
  const {users} = useSelector((state)=>state.users)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(getProfile())
    }
    
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/signup" component={Signup} />
          <Route path="/auth/:email" component={Verify} />
          <PublicRoute exact path="/" component={Signin} />

          <PrivateRoute path="/chat" component={Chat} />
          {users.id?<PrivateRoute path="/chatid/:idreceiver" component={ChatId} />: null}
          <PrivateRoute path="/setting" component={Settings} />

          {/* Ubah ke Private Route */}
          {/* <Route path="/chat" render={(props) => <Chat {...props} socket={socket}/>} />
          <Route path="/chatid/:idreceiver" render={(props) => <ChatId {...props} socket={socket}/>} />
          <Route path="/setting" render={(props) => <Settings {...props} socket={socket}/>} /> */}
          
     
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default MainRoute

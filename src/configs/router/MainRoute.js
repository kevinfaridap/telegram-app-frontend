// import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Signup from '../../pages/auth/Signup'
import Signin from '../../pages/auth/Signin'
import Chat from '../../pages/main/Chat'
import Verify from '../../pages/main/Verify'
// import io from 'socket.io-client'
import ChatId from '../../pages/main/ChatId'
import Settings from '../../pages/main/Settings'
import PrivateRoute from './module/PrivateRoute'

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
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Signin} />
          <Route path="/auth/:email" component={Verify} />

          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute path="/chatid/:idreceiver" component={ChatId} />
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

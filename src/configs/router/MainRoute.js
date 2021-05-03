import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Signup from '../../pages/auth/Signup'
import Signin from '../../pages/auth/Signin'
import Chat from '../../pages/main/Chat'
import Verify from '../../pages/main/Verify'
import io from 'socket.io-client'
import ChatId from '../../pages/main/ChatId'
import Settings from '../../pages/main/Settings'

function MainRoute() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  
  const setupSocket = ()=>{
    console.log('hello setupSocket berjalan');
    const newSocket = io("http://localhost:8081")
    // const newSocket = io(`${process.env.REACT_APP_SOCKET}`)
    

    setSocket(newSocket)
  }

  useEffect(()=>{
    setupSocket()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/auth/:email" component={Verify} />
          {/* <Route path="/chat" component={Chat} /> */}
          <Route path="/chat" render={(props) => <Chat {...props} socket={socket}/>} />
          <Route path="/chatid/:idreceiver" render={(props) => <ChatId {...props} socket={socket}/>} />
          <Route path="/setting" render={(props) => <Settings {...props} socket={socket}/>} />
          

          {/* <Route exact path="/" component={Home} /> */}
           {/* <PrivateRoute path="/details/:idmovie" component={Details} /> */}
          

        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default MainRoute

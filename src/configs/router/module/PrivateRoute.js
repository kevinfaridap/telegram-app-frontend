import React, {useEffect, useState} from 'react'
import {Redirect, Route} from 'react-router-dom'
import io from 'socket.io-client'


function PrivateRoute({component:Component, ...rest}) {
  const isAuthenticated = localStorage.getItem('token')

  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  
  const setupSocket = ()=>{
    console.log('hello setupSocket berjalan');
    const newSocket = io("http://localhost:8081")
    setSocket(newSocket)
  }

  useEffect(()=>{
    setupSocket()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
      <Route {...rest} render={(props)=>
        isAuthenticated ? <Component {...props}  socket={socket} /> : <Redirect to="/" />
      } />
    )
}

export default PrivateRoute

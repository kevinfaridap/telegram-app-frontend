import React from 'react'
import SideChat from '../../../components/SideChat'
import StartMessage from '../../../parts/Chat/StartMessage'
import style from './chat.module.css'

function Chat() {
  return (
    <div>
        <div className={[["row"], style["chat"]].join(' ')}>
          <div className="col-lg-3">
            <SideChat />
          </div>
          <div className="col">
            <StartMessage />
          </div>
        </div>

      
    </div>
  )
}

export default Chat

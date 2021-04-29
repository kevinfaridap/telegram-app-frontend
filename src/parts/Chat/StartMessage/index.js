import React from 'react'
import style from './startmessage.module.css'

function StartMessage() {
  return (
    <div>
      <div className={style["start-message"]}>
        <p className={style["text"]}>Please select a chat to start messaging</p>
      </div>
    </div>
  )
}

export default StartMessage

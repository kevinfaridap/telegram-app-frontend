import React from 'react'
import style from './sidechat.module.css'

function SideChat({receivername}) {
  return (
    <div>
      <div className={style["side-chat"]}>
        <div className="container">
          <h5 className={style["title"]}>Telegram App</h5>
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
          <div className="row">
            <div className="col">
              <img className={style["user-img"]} src="https://img.icons8.com/bubbles/2x/user-male.png" alt=""/>
            </div>
            <div className="col">
              <p className={style["user-name"]}>{receivername}</p>
              <br/>
              <p className={style["message"]}>Hey you !</p>
            </div>
            <div className="col">
              <p className="time">15:30</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SideChat

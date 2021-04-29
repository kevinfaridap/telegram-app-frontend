import React from 'react'
import style from './button.module.css'

function Button({type, btn, onClick, btnValue}) {
  return (
    <div>
      <button type={type} className={`${style[btn]}`} onClick={onClick} >
        {btnValue}
      </button>
    </div>
  )
}

export default Button

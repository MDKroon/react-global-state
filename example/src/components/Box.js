import React from 'react'
import style from './demo.module.css'

const Box = ({title, children, bgColor = null}) => {
  return <div className={[style.box, bgColor ? style[bgColor] : ''].join(' ')}> 
    <div className={style.title}>
      <strong>{title}</strong>
    </div>
    <hr/>
    {children}
  </div>
}

export default Box
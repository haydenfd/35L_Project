import './index.css'
import React from 'react'

export default function Form(props:any) {
  return (
    // <div className='nav-container'>
    <div>
      <div className='form-background' onClick={() => props.close()}></div>
      <div className='form'>{props.children}</div>
    </div>
  )
}
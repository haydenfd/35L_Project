import React from 'react'
import './index.css'

export default function Register(props:any) {
  return (
    <>
      <h2>Sign up</h2>
      <div>
        <form
          onSubmit={e => {
            alert("Log in!")
            e.preventDefault()
          }}
        >
          <input id='email' type='email' placeholder='Email address' className='input' />
          <input id='password' type='password' placeholder='Password' className='input'/>
          <input
            id='passwordconfirm'
            type='password'
            placeholder='Enter password again'
            className='input'
          />
          <button className='btn'>Sign up</button>
        </form>
      </div>
      <p>
        Already have an account?{" "}
        <a href='javascript:;' onClick={() => props.showLogin()}>
          Log in
        </a>
      </p>
    </>
  )
}
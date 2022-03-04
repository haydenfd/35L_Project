import React from 'react'
import './index.css'

export default function Login(props:any) {
  return (
    <>
      <h2>Login</h2>
      <div>
        <form
          onSubmit={e => {
            alert("Sign up!")
            e.preventDefault()
          }}
        >
          <input id='email' type='email' placeholder='Email address' className='input' />
          <input id='password' type='password' placeholder='Password' className='input'/>
          <button className='btn'>Log in</button>
        </form>
      </div>
      <p>
        Don't have an account yet?{" "}
        <a href='javascript:;' onClick={() => props.showSignup()}>
          Sign up
        </a>
      </p>
    </>
  )
}
import React from 'react'
import './index.css'
import { useState } from 'react'
import { errors } from './global'

export default function Login(props: any) {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (e: any) => { 
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e:any) => { 
    setPassword(e.target.value)
    }
  
  const handleSubmit = (e:any) => { 
    e.preventDefault()
    const data = {
      email: email, 
      password: password,
    }

    console.log(data)

    auth()
  }

  const auth = () => {

     const pattern = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$");

    if (password.length <= 7) { 
      document.getElementById('error')!.style.display = 'block';
      document.getElementById('error')!.innerHTML = errors[4];
      return false;
    }
  }

  return (
    <>
      <h2>Login</h2>
      <div>
        <form
          onSubmit={handleSubmit}
        >
          <input id='email' type='email' placeholder='Email address' className='input' onChange={handleEmailChange}  />
          <input id='password' type='password' placeholder='Password' className='input' onChange={handlePasswordChange} />
          <button className='btn'>Log in</button>
        </form>
      </div>
         <p>
        <a href='javascript:;' onClick={() => props.showSignup()}>
          I forgot my password
        </a>
      </p>
      <p>
        <a href='javascript:;' onClick={() => props.showSignup()}>
          I don't have an account
        </a>
      </p>
    </>
  )
}
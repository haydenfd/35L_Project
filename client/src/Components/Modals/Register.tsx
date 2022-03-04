import React from 'react'
import './index.css'
import { useState } from 'react'

export default function Register(props:any) {



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("") 

  //move more functionality into reset if needed
  const resetPasswords = () => { 
      setPassword("");
      setConfirmPassword("");
  }
  const handleEmailChange = (e: any) => { 
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e:any) => { 
    setPassword(e.target.value)
    }
  
    const handleConfirmPasswordChange = (e:any) => { 
    setConfirmPassword(e.target.value)
    }
  
  const handleSubmit = (e:any) => { 
    e.preventDefault()
    const data = {
      email: email, 
      password: password,
      confirmPassword: confirmPassword,
    }

    console.log(data)

    auth()
  }

  const auth = () => {
  }

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
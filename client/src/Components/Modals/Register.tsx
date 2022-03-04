import React from 'react'
import './index.css'
import { useState } from 'react'
import { errors } from './global'

export default function Register(props:any) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("") 

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

     const pattern = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$");

    if (password.length <= 7) { 
      document.getElementById('error')!.style.display = 'block';
      document.getElementById('error')!.innerHTML = errors[4];
      return false;
    }

  //  else if (pattern.test(password)) { 
  //     document.getElementById('error')!.style.display = 'block';
  //     document.getElementById('error')!.innerHTML = errors[5];
  //     resetPasswords();
  //     return false;
  //    }

  else if (password !== confirmPassword) { 
      document.getElementById('error')!.style.display = 'block';
      document.getElementById('error')!.innerHTML = errors[2];
      return false;
    }
  }

  return (
    <>
      <h2>Sign up</h2>
      <div>
        <form onSubmit={ handleSubmit} >
          <input id='email' type='email' placeholder='Email address' className='input' onChange={handleEmailChange} />
          <input id='password' type='password' placeholder='Password' className='input' onChange={handlePasswordChange}/>
          <input
            id='passwordconfirm'
            type='password'
            placeholder='Enter password again'
            className='input'
            onChange={handleConfirmPasswordChange}
          />
          <button className='btn'>Sign up</button>
        </form>
      </div>
      <p>
        <a href='javascript:;' onClick={() => props.showLogin()}>
          I already have an account
        </a>
      </p>
    </>
  )
}
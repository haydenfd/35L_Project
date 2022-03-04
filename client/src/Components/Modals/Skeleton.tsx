import { useState } from 'react'
import React from 'react'
import Form from "./Form"
import Login from "./Login"
import Register from "./Register"
import Header from "./Header"
import './index.css'

export default function Layout(props:any) {
  const [showForm, setShowForm] = useState(true)
  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div>
      <Header />
      <div className="main">{props.content}</div>
      {showForm && (
        <Form close={() => setShowForm(false)}>
          {showLogin && (
            <Login
              showSignup={() => {
                setShowRegister(true)
                setShowLogin(false)
              }}
            />
          )}
          {showRegister && (
            <Register
              showLogin={() => {
                setShowRegister(false)
                setShowLogin(true)
              }}
            />
          )}
        </Form>
      )}
    </div>
  )
}

import React, {useState} from "react"
import './index.css'

function LoginModal() {

    return (
        <div className="formWrapper">
        <form>
            <input className="input_forms" type="text" id="first" name="first" placeholder="&#xf2bb; &nbsp; First Name" style={{fontFamily: "Arial, FontAwesome"}} />
            <input className="input_forms" type="text" id="last" name="last" placeholder="&#xf299; &nbsp; Last Name" style={{fontFamily: "Arial, FontAwesome"}} />
            <input className="input_forms" type="text" id="username" name="username" placeholder="&#xf007; &nbsp; Username" style={{fontFamily: "Arial, FontAwesome"}} />
            <input className="input_forms" type="password" id="password" name="password" placeholder="&#xf023; &nbsp; Password" style={{fontFamily: "Arial, FontAwesome"}} />
            <input className="input_forms" type="password" id="confirm" name="confirm" placeholder="&#xf023; &nbsp; Confirm Password" style={{fontFamily: "Arial, FontAwesome"}} />
        </form>
        <div style={{marginTop:'10px'}}></div>
        <button className="submit_signin">Sign Up</button>
        <div style={{marginTop:'15px'}}></div>
    </div>
)
}

export default LoginModal;
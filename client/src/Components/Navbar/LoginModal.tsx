import React, {useState} from "react"
import './index.css'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai'
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField" 
import ApiService from '../../service'

function LoginModal(props:any) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function updateUsername(event:any) {
        setUsername(event.target.value);
    }

    function updatePassword(event:any) {
        setPassword(event.target.value);
    }

    async function logIn(e: React.FormEvent) {   
        e.preventDefault()
        await ApiService.signIn(username, password);
        if (isSignedIn()) {
            props.isLoginSuccessful(true);
        }
        else {
            props.isLoginSuccessful(false);
        }
    }

    function isSignedIn() {
        if (localStorage.getItem('token') != null) {
            return true;
        }
        return false;
    }

    return (
        <div className="formWrapper">
        <form>
            <input onChange={updateUsername} className="input_forms" type="text" id="username" name="username" placeholder="&#xf007; &nbsp; Enter Username" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updatePassword} className="input_forms" type="password" id="password" name="password" placeholder="&#xf023; &nbsp; Enter Password" style={{fontFamily: "Montserrat, FontAwesome"}} />
        <div className="div-button-top"></div>
            <input className="submit_signin" type="submit" onClick={(e: React.FormEvent) => {logIn(e)}} value="Log In" style={{fontFamily: "Montserrat, FontAwesome"}} />
        <div className="div-button-bottom"></div>
        </form>
        {/* <div className="div-button-top"></div>
            <button className="submit_signin" onClick={logIn} style={{fontFamily: "Montserrat, FontAwesome"}}>Log In</button>
        <div className="div-button-bottom"></div> */}

    </div>
)
}

export default LoginModal;

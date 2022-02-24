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

    async function logIn() {   
        console.log('logging in...')
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
            <input onChange={updateUsername} className="input_forms" type="text" id="username" name="username" placeholder="&#xf007; &nbsp; Username" style={{fontFamily: "Arial, FontAwesome"}} />
            <input onChange={updatePassword} className="input_forms" type="password" id="password" name="password" placeholder="&#xf023; &nbsp; Password" style={{fontFamily: "Arial, FontAwesome"}} />
        </form>
        <div style={{marginTop:'10px'}}></div>
        <button className="submit_signin" onClick={logIn}>Sign In</button>
        <div style={{marginTop:'15px'}}></div>

    </div>
)
}

export default LoginModal;
import React, {useState} from "react"
import './index.css'
// import { IoPersonCircleOutline } from 'react-icons/io5';
// import { AiOutlineMenu } from 'react-icons/ai'
// import { IconContext } from "react-icons/lib";
// import { useNavigate } from "react-router-dom";
// import TextField from "@material-ui/core/TextField" 
import LoginModal from "./LoginModal";
import SignUpModal from './SignUpModal'

function Dialog(props:any) {

    const [isLoginActive, setActive] = useState(true);

    function updateDialog() {
        setActive(!isLoginActive);
    }

    const modal_when_signed_in = <div style={{width:'90%', marginLeft: '5%'}}>
    <br></br>
    <span>
        <div onClick={updateDialog} className={!isLoginActive ? 'toggle toggleIsActive' : 'toggle toggleIsDormant'}>Sign Up <hr></hr></div>
        <div onClick={updateDialog} className={isLoginActive ? 'toggle toggleIsActive' : 'toggle toggleIsDormant'}>Log In <hr></hr></div>
    </span>
    {isLoginActive ? <LoginModal {...props} /> : <SignUpModal {...props} />}
    </div>

    const modal_when_signed_out = <div className="signedInDropdown">
        <button onClick={props.navigateToProfile}>My Profile</button>
        <button onClick={props.signOut}>Sign Out</button>
    </div>

    return (
        <div>
            {!props.isSignedIn ? modal_when_signed_in : modal_when_signed_out}
        </div>
    )
}

export default Dialog;
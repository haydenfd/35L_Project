import React, {useState} from "react"
import './index.css'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineMenu, AiOutlineCaretDown } from 'react-icons/ai'
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import Dialog from './Dialog'
import swal from 'sweetalert';

function Navbar() {
    const navigate = useNavigate();

    const [dropdown, setDropdown] = useState(false);
    const [signedIn, setSignedIn] = useState(isSignedIn());

    function changeDropdown() {
        setDropdown(!dropdown);
    }

    function isSignedIn() {
        if (localStorage.getItem('token') != null) {
            return true;
        }
        return false;
    }

    function clickProfile(): void {
        // NAVIGATE WAS BUGGY 5-10% OF THE TIME - WILL LOOK INTO
        window.location.assign(`http://localhost:3000/profile/${localStorage.getItem('username')}`)
        setDropdown(false);
    }

    function clickHome(): void {
        navigate('/')
    } 

    function isLoginSuccessful(status:boolean) {
        if (status) {
            swal("Successfully Signed In!", "", "success")
            setDropdown(false);
            setSignedIn(true);
        }
        else {
            swal("Sign In Unsuccessful", "", "error")
        }
        console.log(status)
    }

    function isSignupSuccessful(status:boolean) {
        if (status) {
            swal("Successfully Signed Up!", "Sign in to begin your search!", "success")
            setDropdown(false);
        }
        else {
            swal("Sign Up Unsuccessful", "", "error")
        }
    }

    function signOut() {
        setDropdown(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        swal("Successfully Signed Out", "","success")
        setSignedIn(false);
    }

    const menu = 
    <IconContext.Provider value = {{ color: '#606060', size: '17px' }}>
    <AiOutlineMenu style={{ marginTop:'auto', marginBottom:'auto' }} />
</IconContext.Provider>

    const caret =
    <IconContext.Provider value = {{ color: '#606060', size: '17px' }}>
    <AiOutlineCaretDown style={{ marginTop:'auto', marginBottom:'auto' }} />
</IconContext.Provider>

    
    return (
        <div className="wrapper">
            <img className="logo" onClick={clickHome} src="/new_logo.png"></img>
            <span className="signin">
                <button className="prof" onClick={changeDropdown}>
                <p>&nbsp;</p>
                    {!signedIn ? menu : caret}
                    <p>&nbsp;&nbsp;</p>
                <IconContext.Provider value = {{ color: '#606060', size: '40px' }}>
                    <IoPersonCircleOutline />
                </IconContext.Provider>
                </button>
                <span className={!signedIn ? (dropdown ? 'dropdown' : 'notClickedDisplay') : (dropdown ? 'dropdown dropdown_smaller' : 'notClickedDisplay')}>
                    <Dialog isLoginSuccessful={isLoginSuccessful} isSignupSuccessful={isSignupSuccessful} isSignedIn={signedIn} signOut={signOut} navigateToProfile={clickProfile}/>
                </span>
            </span>
        </div>
    )
}

export default Navbar;
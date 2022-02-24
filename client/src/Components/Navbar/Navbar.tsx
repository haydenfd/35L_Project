import React, {useState} from "react"
import './index.css'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineMenu, AiOutlineCaretDown } from 'react-icons/ai'
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import Dialog from './Dialog'

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
        navigate('/profile');
        setDropdown(false);
    }

    function clickHome(): void {
        navigate('/')
    } 

    function isLoginSuccessful(status:boolean) {
        if (status == true) {
            setDropdown(false);
            setSignedIn(true);
        }
        console.log(status)
    }

    function isSignupSuccessful(status:boolean) {
    }

    function signOut() {
        setDropdown(false);
        localStorage.removeItem('token');
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
            <img className="logo" onClick={clickHome} src="Images/logoalt.png"></img>
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
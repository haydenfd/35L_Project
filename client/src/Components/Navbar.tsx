import React from "react"
import './index.css'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai'
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    function clickProfile(): void {
        navigate('/profile');
    }

    function clickHome(): void {
        navigate('/')
    } 


    return (
        <div className="wrapper">
            <img className="logo" onClick={clickHome} src="Images/logoalt.png"></img>
            <span className="signin">
                <button className="prof" onClick={clickProfile}>
                    <p>&nbsp;</p>
                <IconContext.Provider value = {{ color: '#606060', size: '17px' }}>
                    <AiOutlineMenu style={{ marginTop:'auto', marginBottom:'auto' }} />
                </IconContext.Provider>
                <p>&nbsp;&nbsp;</p>
                <IconContext.Provider value = {{ color: '#606060', size: '40px' }}>
                    <IoPersonCircleOutline />
                </IconContext.Provider>
                </button>
            </span>
        </div>
    )
}

export default Navbar;
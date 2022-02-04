import React from "react"
import './index.css'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai'
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from 'react-icons/ai'

function SubNavbar() {

    return (
        <div>
            <br></br>
            <div className="flex">
                <button>Price <span><AiOutlineDown size={12} style={{verticalAlign:'bottom', marginLeft:'3px', fontWeight:"bold"}}/></span> </button>
                <button>Bedrooms <span><AiOutlineDown size={12} style={{verticalAlign:'bottom', marginLeft:'3px'}}/></span> </button>
                <button>Bathrooms <span><AiOutlineDown size={12} style={{verticalAlign:'bottom', marginLeft:'3px'}}/></span> </button>
                <button>Amenities <span><AiOutlineDown size={12} style={{verticalAlign:'bottom', marginLeft:'3px'}}/></span> </button>
                <button>Facilities <span><AiOutlineDown size={12} style={{verticalAlign:'bottom', marginLeft:'3px'}}/></span> </button>
            </div>
        </div>
    )
}

export default SubNavbar;
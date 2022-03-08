import { red } from "@material-ui/core/colors";
import React from "react"
import { AiOutlineFontSize } from "react-icons/ai";

function NotFound() {
    const styleObj = {
        font: "Airbnb Cereal",
        fontSize: 30,
        color: "#FF0000",
        textAlign: "center" as "center",
        paddingTop: "10px",
    }


    function excitFont() {
        const styleObj = {
            fontSize: 30,
            color: "#FF0000",
            textAlign: "center",
            paddingTop: "10px",
        }
    }

    return (
    <div className="body">

       
        <p style={styleObj}><b> Airbnb Page Not Found!</b></p> 
        <img src="https://media.giphy.com/media/dsWOUTBz5aae8ET8Ss/giphy.gif" alt="gif 404 image" /> 






    </div>
    )
}

export default NotFound;

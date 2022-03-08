import { red } from "@material-ui/core/colors";
import React from "react"
import { AiOutlineFontSize } from "react-icons/ai";

function Concerns() {
    const styleObj = {
        font: "Airbnb Cereal",
        fontSize: 30,
        color: "#FF0000",
        textAlign: "center" as "center",
        paddingTop: "10px",
    }
    const styleObj2 = {
        font: "Airbnb Cereal",
        fontSize: 15,
        color: "blue",
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

       
        <p style={styleObj}><b> Do you have any concerns?</b></p> 

        <img src="https://media.giphy.com/media/js5AuAD9ZJkKKNjVrw/giphy.gif" alt="gif concern image" /> 
        <p style={styleObj2}><b> Please reach us at lordeggert@gmail.com. </b></p> 





    </div>
    )
}

export default Concerns;

import { red } from "@material-ui/core/colors";
import React from "react";
import { AiOutlineFontSize } from "react-icons/ai";

function Hosting() {
    const styleObj = {
        font: "Airbnb Cereal",
        fontSize: 50,
        color: "white",
        textAlign: "center" as "center",
        paddingTop: "10px",
    }
    const styleObj2 = {
        font: "Airbnb Cereal",
        fontSize: 30,
        color: "white",
        textAlign: "center" as "center",
        paddingTop: "80px",
    }


    function excitFont() {
        const styleObj = {
            fontSize: 30,
            color: "#FF0000",
            textAlign: "center",
            paddingTop: "10px",
        }
    }

    // change background color for whole body..
    function changebackground(){
        return document.body.style.backgroundColor = 'black';
    }
     

    return (

    <div className="body">
    <p style={styleObj}><b> Hosting makes Airbnb, Airbnb.</b></p> 
    <p style={styleObj2}><b> Are you interested in Hosting? 
        If you are, check out some of our resources coming April 2022!
        </b></p> 

    window.addEventListener("load",function() { changebackground() });
       
         






    </div>
    )
}

export default Hosting;

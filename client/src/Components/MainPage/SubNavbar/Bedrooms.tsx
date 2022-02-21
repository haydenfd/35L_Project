import React, { useState } from "react"
import './index.css'


function Bedrooms(props:any) {     
    
    const [bedrooms, setBedrooms] = useState(0);
    const [change, setChange] = useState(false);


    function isAtMin() {
        if (bedrooms == 0) return true;
        return false;
    }

    function isAtMax() {
        if (bedrooms == 9) return true;
        return false;
    }

    function display() {
        if (bedrooms == 0) {
            return "N/A";
        }
        else {
            return bedrooms;
        }
    }

    function increment() {
        if (!change) setChange(true);
        if (bedrooms < 9) {
            setBedrooms(bedrooms+1);
        }
    }

    function decrement() {
        if (!change) setChange(true);
        if (bedrooms >= 1) {
            setBedrooms(bedrooms-1)
        }
    }

    return (
        <span>  
            <br></br>
            <div style={{paddingTop:'10px'}}></div>
            <span className="counter_wrapper">
                <span onClick={decrement} className={isAtMin() ? 'minus at_min' : 'minus'}>-</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{display()}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span onClick={increment} className={isAtMax() ? 'plus at_min' : 'plus'}>+</span>
            </span>  
            <br></br>
            <div style={{paddingTop:'20px'}}></div>

             <button className={!change ? 'update_counter update_counter_idle' : 'update_counter'}>Update</button>      

      </span>
)

}

export default Bedrooms;
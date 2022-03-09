import React, { useState } from "react"
import './index.css'


function Bathrooms(props:any) {     
    
    const [bathrooms, setBathrooms] = useState(0);
    const [change, setChange] = useState(false);

    function isAtMin() {
        if (bathrooms === 0) return true;
        return false;
    }

    function isAtMax() {
        if (bathrooms === 9) return true;
        return false;
    }

    function display() {
        if (bathrooms === 0) {
            return 0;
        }
        else {
            return bathrooms;
        }
    }

    function increment() {
        if (!change) setChange(true);
        if (bathrooms < 9) {
            setBathrooms(bathrooms+1);
        }
    }

    function decrement() {
        if (!change) setChange(true);
        if (bathrooms >= 1) {
            setBathrooms(bathrooms-1)
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

export default Bathrooms;
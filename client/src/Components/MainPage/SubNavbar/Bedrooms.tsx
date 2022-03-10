import React, { useState } from "react"
import './index.css'


function Bedrooms(props:any) {     
    
    const [bedrooms, setBedrooms] = useState(0);
    const [change_, setChange] = useState(false);


    function isAtMin() {
        if (bedrooms === 0) return true;
        return false;
    }

    function isAtMax() {
        if (bedrooms === 9) return true;
        return false;
    }

    function display() {
        if (bedrooms === 0) {
            return 0;
        }
        else {
            return bedrooms;
        }
    }

    function increment() {
        if (!change_) setChange(true);
        if (bedrooms < 9) {
            setBedrooms(bedrooms+1);
        }
    }

    function decrement() {
        if (!change_) setChange(true);
        if (bedrooms >= 1) {
            setBedrooms(bedrooms-1)
            if ((bedrooms-1) <= 0) {
                setChange(false)
            }
        }
    }

    function sortByBedrooms() {
        if (bedrooms == 0) {
            console.log("CANT SUBMIT!")
            return
        }
        props.sortByBedrooms(bedrooms)
        props.adjustStyles('bedrooms')
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
            <div style={{paddingTop:'15px'}}></div>
            <button onClick={sortByBedrooms} className={!change_ ? 'update_counter update_counter_idle' : 'update_counter'}>Update</button>      

             {/* <button onClick={sortByBedrooms} className={!change ? 'update_counter update_counter_idle' : 'update_counter'}>Update</button>       */}

      </span>
)

}

export default Bedrooms;
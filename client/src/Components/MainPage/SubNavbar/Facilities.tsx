import React from "react"
import './index.css'
function Facilities(props:any) { 
  
  function sortByFacilities() {
    let facilities = []

    let gym = document.getElementById("gym") as HTMLInputElement;
    if (gym.checked) facilities.push('gym') 

    let courtyard = document.getElementById("courtyard") as HTMLInputElement;
    if (courtyard.checked) facilities.push('courtyard') 

    let spa = document.getElementById("spa") as HTMLInputElement;
    if (spa.checked) facilities.push('spa')

    let laundry = document.getElementById("laundry") as HTMLInputElement;
    if (laundry.checked) facilities.push('laundry')

    let pool = document.getElementById("pool") as HTMLInputElement;
    if (pool.checked) facilities.push('pool')

    console.log(facilities)
    props.sortByFacilities(facilities)
    props.adjustStyles('facilities')

  }

    return (
        <span>
          <div style={{paddingTop:'8px'}}></div>
            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-80px'}}>Gym</span>
              <input id="gym" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>

            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-45px'}}>Courtyard</span>
              <input id="courtyard" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>

            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-80px'}}>Spa</span>
              <input id="spa" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>
            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-11px'}}>Laundry Room</span>
              <input id="laundry" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>
            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-5px'}}>Swimming Pool</span>
              <input id="pool" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>
            
            <button onClick={sortByFacilities} className="update_counter modified-btn-1">Update</button>

      </span>
)

}

export default Facilities;
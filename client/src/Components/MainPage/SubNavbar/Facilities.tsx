import React from "react"
import './index.css'


function Facilities(props:any) {      

    return (
        <span>
          <div style={{paddingTop:'8px'}}></div>
            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-80px'}}>Gym</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>

            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-45px'}}>Courtyard</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-80px'}}>Spa</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-11px'}}>Laundry Room</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-5px'}}>Swimming Pool</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>
            

            <button className="update_amenities">Update</button>
            

      </span>
)


}

export default Facilities;
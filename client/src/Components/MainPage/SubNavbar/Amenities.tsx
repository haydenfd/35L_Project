import React from "react"
import './index.css'

function Amenities(props:any) {      

    return (
        <span>
          <div style={{paddingTop:'8px'}}></div>
            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-33px'}}>Fully Furnished</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>

            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'0px'}}>Appliances Included</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-75px'}}>Balcony</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-75px'}}>Parking</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-54px'}}>Hardwood</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>
            

            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-20px'}}>Breakfast Nook</span>
              <input type="checkbox"/>
              <span className="check"></span>
            </label>

            <button className="update_amenities">Update</button>
            

      </span>
)


}

export default Amenities;
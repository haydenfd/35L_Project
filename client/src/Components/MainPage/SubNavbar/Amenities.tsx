import React from "react"
import './index.css'

function Amenities(props:any) {    
  
  function sortByAmenities() {
    let amenities = [];

    let furnished = document.getElementById("furnished") as HTMLInputElement;
    if (furnished.checked) amenities.push('furnished')

    let appliances = document.getElementById("appliances") as HTMLInputElement;
    if (appliances.checked) amenities.push('appliances')

    let balcony = document.getElementById("balcony") as HTMLInputElement;
    if (balcony.checked) amenities.push('balcony')

    let parking = document.getElementById("parking") as HTMLInputElement;
    if (parking.checked) amenities.push('parking')

    let hardwood = document.getElementById("hardwood") as HTMLInputElement;
    if (hardwood.checked) amenities.push('hardwood')

    props.sortByAmenities(amenities);
    props.adjustStyles('amenities');

    console.log(amenities)

  }

    return (
        <span>
          <div style={{paddingTop:'8px'}}></div>
            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-33px'}}>Fully Furnished</span>
              <input id="furnished" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>

            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'0px'}}>Appliances Included</span>
              <input id="appliances" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-75px'}}>Balcony</span>
              <input id="balcony" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-75px'}}>Parking</span>
              <input id="parking" type="checkbox"/>
              <span className="check"></span>
            </label>

            <div style={{paddingTop:'4px'}}></div>


            <label className="check_wrapper"><span style={{fontSize:'14px', marginLeft:'-54px'}}>Hardwood</span>
              <input id="hardwood" type="checkbox"/>
              <span className="check"></span>
            </label>

            <button onClick={sortByAmenities} className="update_amenities">Update</button>
            

      </span>
)


}

export default Amenities;
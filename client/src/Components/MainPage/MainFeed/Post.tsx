import React from "react"
import './index.css'
function Post(props:any) {

    return (
        <div>
            <div className="parent">
                <img className="featuredImage" src={`data:image/jpg;base64,${props.image_data.base64}`} alt="base-64"></img>
                <p className="address">{props.address} <br></br><span className="proximity">{props.distance} {props.distance > 1? 'miles':'mile'} away</span> </p>
                <p className="price">${props.price} / month <br></br> <span className="timeframe">{props.rentByDate} </span> </p>
            </div>
        </div>
    )
}

export default Post;
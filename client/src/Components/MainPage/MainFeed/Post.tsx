import { TimeLike } from "fs"
import React from "react"
// import SubNavbar from "./SubNavbar/SubNavbar";
import TimelinePost from '../../../Models/TimelinePost'
import './index.css'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';

function Post(props:TimelinePost) {
    return (
        <div>
            <div className="parent">
                <img className="featuredImage" src={props.pic}/>
                <p className="address">{props.address} <br></br><span className="proximity">{props.proximity_to_campus} miles away</span> </p>
                <p className="price">${props.price} / month <br></br> <span className="timeframe">{props.year} </span> </p>

                <Button size="small" color= "primary">
                <FavoriteIcon fontSize="small" />
                &nbsp; &nbsp; 
                {/* {postObject.favorites}   */}
                </Button>
                
            </div>
        </div>
    )
}

export default Post;
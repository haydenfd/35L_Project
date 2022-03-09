import React from "react"
import './index.css'
import TextField from "@material-ui/core/TextField" 
// import { TextField } from '@mui/material';
import {Button} from '@material-ui/core'; //importing material ui component
import InputAdornment from '@material-ui/core/InputAdornment';


function Price(props:any) {      

    return (
        <span>
            <div className="price_fields">
            <div style={{display:"inline-block", paddingRight:'10px', fontFamily:"Montserrat", color: 'black'}}>
                <TextField 
                id="min-price" 
                label="Min Price" 
                variant="outlined"
                InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
                />
            </div>

            <div style={{display:"inline-block", paddingLeft:'10px', color: 'black', fontFamily:"Montserrat"}}>
                <TextField
                 id="max-price" 
                 label="Max Price" 
                 variant="outlined"
                 InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
                 />
            </div>  
            <br></br>

            <button className="update_counter">Update</button>
            </div>
      </span>
)


}

export default Price;
import React from "react"
import './index.css'
import TextField from "@material-ui/core/TextField" 
import InputAdornment from '@material-ui/core/InputAdornment';


function Price(props:any) {

    function checkIfInteger(value:string) {
        return /^\d+$/.test(value);
    }
    
    function updatePrice() {
        let min = document.getElementById('min-price') as HTMLInputElement;
        let min_val = min.value
        let max = document.getElementById('max-price') as HTMLInputElement;
        let max_val = max.value;
        if (checkIfInteger(min_val) && (checkIfInteger(max_val) && (parseInt(max_val) > parseInt(min_val)))) {
            props.adjustStyles("price")
            props.sortByPrice(parseInt(min_val), parseInt(max_val))
        }
        return
    }

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
          <button onClick={updatePrice} className="update_counter">Update</button> 
            </div>
      </span>
)


}

export default Price;
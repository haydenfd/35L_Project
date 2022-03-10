import { useState } from 'react'
import React from 'react'
import Middleware from '../Middleware/Middleware'
import ApiService from '../../service'
import Amenities from '../../Components/MainPage/SubNavbar/Amenities'
import './upload.css'
import swal from 'sweetalert'
import TextField from "@material-ui/core/TextField" 
import InputAdornment from '@material-ui/core/InputAdornment';

export default function Upload(props:any) {

  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [distance, setDistance] = useState(0)
  const [rentByDate, setRentByDate] = useState('')
  const [seller, setSeller] = useState('')
  // const [amenities, setAmenities] = useState([])
  const [bathrooms, setBathrooms] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [images, setImages] = useState([]) //confused about this


  function updateAddress(event:any) {
    setAddress(event.target.value);
  }

  function updatePrice(event:any) {
    setPrice(event.target.value)
  }

  function updateDistance(event:any) {
    setDistance(event.target.value)
  }

  function updateRentBy(event:any) {
    setRentByDate(event.target.value)
  }

  function updateAmenities(event:any) {
    console.log(event.target.value)
  }

  function updateBedrooms(event:any) {
    setBedrooms(event.target.value)
  }
  
  function updateBathrooms(event:any) {
    setBathrooms(event.target.value)
  }

  function checkAmenities() {
    console.log("HERE")
    var amenities = []
    let furnished_status = document.getElementById("_furnished_") as HTMLInputElement;
    let appliances_status = document.getElementById("_appliances_") as HTMLInputElement;
    let balcony_status = document.getElementById("_balcony_") as HTMLInputElement
    let parking_status = document.getElementById("_parking_") as HTMLInputElement
    let hardwood_status = document.getElementById("_hardwood_") as HTMLInputElement;

    if (furnished_status.checked) {
      amenities.push('furnished')
    }

    if (appliances_status.checked) {
      amenities.push('appliances')
    }

    if (balcony_status.checked) {
      amenities.push('balcony')
    }

    if (parking_status.checked) {
      amenities.push('parking')
    }

    if (hardwood_status.checked) {
      amenities.push('hardwood')
    }
    return amenities
  }

  function checkFacilities() {
    var facilities = []
    let gym_status = document.getElementById("_gym_") as HTMLInputElement;
    let courtyard_status = document.getElementById("_courtyard_") as HTMLInputElement;
    let spa_status = document.getElementById("_spa_") as HTMLInputElement
    let laundry_status = document.getElementById("_laundry_") as HTMLInputElement
    let pool_status = document.getElementById("_pool_") as HTMLInputElement;

    if (gym_status.checked) {
      facilities.push('gym')
    }

    if (courtyard_status.checked) {
      facilities.push('courtyard')
    }

    if (spa_status.checked) {
      facilities.push('spa')
    }

    if (laundry_status.checked) {
      facilities.push('laundry')
    }

    if (pool_status.checked) {
      facilities.push('pool')
    }

    return facilities
  }



  async function submitListing(event:any) {
    event.preventDefault()
    console.log(bedrooms)
    var amenities = checkAmenities()
    var facilities = checkFacilities()

    // have to first upload the image, then create a new post object which points to the image

    const file_uploaded = document.getElementById('post-upload') as HTMLInputElement;
    let uploaded_photo = await Middleware.submitFile(file_uploaded, false, '', true, '2300', '42 Gayley Ave', '', '');
    console.log(uploaded_photo)

    if (uploaded_photo.result == 200) {
      let filename = uploaded_photo.fileData.filename;
      console.log(filename)
      let image_id:any = await ApiService.getPostFromFilename(filename)
      let imgs = []
      imgs.push(image_id);
      let upload:any = await ApiService.uploadPost(address, price, distance, rentByDate, localStorage.getItem('username')!, amenities, facilities, bathrooms, bedrooms, imgs);

      console.log(upload)
      if (upload!.status == 200) {
        props.finishedUploading();
        swal("Successfully Uploaded!", "Refresh the page to see your live listing!", "success")
      }
      else {
        swal("Upload Failed", "", "error")
      }
      console.log(image_id!._id)  
    }
  }

  function close() {
    props.finishedUploading();
  }

  return (

    <div className='form-box'>
      <div className='title'>
        <h1 className='head'>Add A Listing</h1>
        </div>
      <form className='form' onSubmit={submitListing}>
        <div className='input-div_'>
        <label htmlFor="Address" >Address</label>
          <input onChange={updateAddress} required placeholder="Enter Address" id="Address" />
        </div>
        <div className='input-div_'>
        <label htmlFor="Price">Price</label>
          <input onChange={updatePrice} required placeholder="Enter Price" id="Price" />
        </div>
        <div className='input-div_'>
          <label htmlFor="Distance">Distance To Campus</label>
          <input onChange={updateDistance} required placeholder="Enter Distance" id="Distance" />
        </div>
        <div className='input-div_'>
        <label htmlFor="RentBy">Rent By Date </label>
          <input onChange={updateRentBy} required placeholder="Enter Last Date" id="RentBy" />
        </div>

        <div className='input-div_'>
        <label htmlFor="Bedrooms">Bedrooms</label>
          <input onChange={updateBedrooms} required placeholder="No. Of Bedrooms" id="Bedrooms" /> 
        </div>
        <div className='input-div_'>
        <label htmlFor="Bathrooms">Bathrooms</label>
          <input onChange={updateBathrooms} required placeholder="No. Of Bathrooms" id="Bathrooms" /> 
        </div>

        <div className='list'>
        <div className='input-div_'>
          <input type="checkbox" id='_furnished_'></input>
          <label htmlFor="_furnished_"> Fully Furnished</label><br></br>

          <input type="checkbox" id="_appliances_" value="appliances" name="appliances"></input>
          <label htmlFor="_appliances_"> Appliances Included</label><br></br>

          <input type="checkbox" id="_balcony_" value="balcony" name="balcony"></input>
          <label htmlFor="_balcony_"> Balcony</label><br></br>

          <input type="checkbox" id="_parking_" value="parking" name="parking"></input>
          <label htmlFor="_parking_"> Parking</label><br></br>

          <input type="checkbox" id="_hardwood_" value="hardwood" name="hardwood" ></input>
          <label htmlFor="_hardwood_"> Hardwood</label><br></br>
        </div>
        
        <div className='input-div_'>
        <input type="checkbox" id="_gym_" value="gym" name="gym"></input>
          <label htmlFor="_gym_"> Gym</label><br></br>

          <input type="checkbox" id="_courtyard_" value="courtyard" name="courtyard"></input>
          <label htmlFor="_courtyard_"> Courtyard</label><br></br>

          <input type="checkbox" id="_spa_" value="spa" name="spa"></input>
          <label htmlFor="_spa_"> Spa</label><br></br>

          <input type="checkbox" id="_laundry_" value="laundry" name="laundry"></input>
          <label htmlFor="_laundry_"> Laundry Room</label><br></br>

          <input type="checkbox" id="_pool_" value="pool" name="pool"></input>
          <label htmlFor="_pool_"> Swimming Pool</label><br></br>
        </div>
    </div>
        <div className='input-div_'>
        <label htmlFor="Pictures" id="picture-label">Pictures</label>
          <input id="post-upload" name="file-input" type="file" />
        </div>
       <input type="submit" value="Submit" className='btn'/>
       <button onClick={close} className='btn'>Close</button>
      </form>
    </div>
  )

}

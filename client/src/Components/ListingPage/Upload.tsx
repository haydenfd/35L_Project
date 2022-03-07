import { useState } from 'react'
import React from 'react'
import Middleware from '../Middleware/Middleware'
import ApiService from '../../service'

export default function Upload() {

  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [distance, setDistance] = useState(0)
  const [rentByDate, setRentByDate] = useState('')
  const [seller, setSeller] = useState('')
  const [amenities, setAmenities] = useState([])
  const [bathrooms, setBathrooms] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [images, setImages] = useState([]) //confused about this

  async function submitListing(event:any) {
    event.preventDefault()
    console.log("SUBMITTING!!!")
    // have to first upload the image, then create a new post object which points to the image



    const file_uploaded = document.getElementById('post-upload') as HTMLInputElement;
    let uploaded_photo = await Middleware.submitFile(file_uploaded, false, '', true, '2300', '42 Gayley Ave', '', '');
    console.log(uploaded_photo)

    if (uploaded_photo.result == 200) {
      let filename = uploaded_photo.filename;
      let image_id:any = await ApiService.getPostFromFilename(filename)
      var upload_obj = {}

      console.log(image_id!._id)  
    }


    // ADDING POST W/ IMAGE ID WILL GO HERE

  }


  return (
    <div>
      <title>Add A New Listing</title>
  <form onSubmit={submitListing}>
        {/* <label>Address</label>
        <input required placeholder="Enter Address"/>
        <label>Price</label>
        <input required placeholder="Enter Price" />
        <label>Distance To Campus</label>
        <input required placeholder="Enter Distance" />
        <label>Rent By Date</label>
        <input required placeholder="Enter Last Date" />
        <label>Seller</label>
        <input required placeholder="Seller Name" />
        <label>Amenities</label>
        <input required placeholder="Amenities" />
        <label>Bedrooms</label>
        <input required placeholder="No. Of Bedrooms" />  
        <label>Bathrooms</label>
        <input required placeholder="No. Of Bathrooms" /> 
        <label>Pictures</label>
        <input required placeholder="Add Image Here" />   */}
        <input id="post-upload" name="file-input" type="file" />
        <input type="submit" name="submit"></input>

      {/* <button> Submit </button> */}
      </form>
  </div>
  )

}

import { useState } from 'react'
import React from 'react'
import './upload.css'

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


  return (
    <div className='form-box'>
      <h1>Add A Listing</h1>
      <form className='form'>
        <div className='input-div'>
        <label htmlFor="Address" >Address</label>
          <input required placeholder="Enter Address" id="Address" />
        </div>
        <div className='input-div'>
        <label htmlFor="Price">Price</label>
          <input required placeholder="Enter Price" id="Price" />
        </div>
        <div className='input-div'>
        <label htmlFor="Distance">Distance To Campus   </label>
          <input required placeholder="Enter Distance" id="Distance" />
        </div>
        <div className='input-div'>
        <label htmlFor="RentBy">Rent By Date </label>
          <input required placeholder="Enter Last Date" id="RentBy" />
        </div>
        <div className='input-div'>
        <label htmlFor="Seller">Seller</label>
          <input required placeholder="Seller Name" id="Seller" />
        </div>
        <div className='input-div'>
        <label htmlFor="Amenities">Amenities</label>
          <input required placeholder="Amenities" id="Amenities" />
        </div>
        <div className='input-div'>
        <label htmlFor="Bedrooms">Bedrooms</label>
          <input required placeholder="No. Of Bedrooms" id="Bedrooms" /> 
        </div>
        <div className='input-div'>
        <label htmlFor="Bathrooms">Bathrooms</label>
          <input required placeholder="No. Of Bathrooms" id="Bathrooms" /> 
        </div>
        <div className='input-div'>
        <label htmlFor="Pictures">Pictures</label>
          <input required placeholder="Add Image Here" id="Pictures" /> 
        </div>
       <input type="submit" value="Submit" className='btn'/>
      </form>
    </div>
  )

}

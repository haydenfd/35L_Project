import { useState } from 'react'
import React from 'react'

export default function Upload() {

  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [distance, setDistance] = useState(0)
  const [rentByDate, setRentByDate] = useState('')
  const [seller, setSeller] = useState('')
  const [amenities, setAmenities] = useState([])
  const [bathrooms, setBathrooms] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [images, setImages] = useState("") //confused about this


  return (
  <form>



  </form>
  )

}

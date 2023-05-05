import React from 'react'
import axios from 'axios'
const GetAdress = () => {
    const mapUrl = "https://www.google.com/maps/dir/?api=1&destination=מגדלאולימפיה,RamatGan,TA,Israel"
  const getAdress =async(a,b)=>{
  const nearLocation = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${a},${b}&key=AIzaSyA09eagZpZ4rKfC1V39Au6x79HxXR441Os&language=iw`)
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 

    }
  }
  function showPosition(position) {
    getAdress(position.coords.latitude,position.coords.longitude)
  }
  return (
    <div>
      <button onClick={()=>{getLocation()}}>Use geo location</button>

    </div>
  )
}

export default GetAdress

// AIzaSyA09eagZpZ4rKfC1V39Au6x79HxXR441Os
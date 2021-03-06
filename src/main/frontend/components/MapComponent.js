import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
 height: '100%'
};

const  MapComponent = props => {
  const [latitude, setLatitude] = useState(47.618800);
  const [longitude, setLongitude] = useState(-122.329330);
  const { address, city, state, zipCode, name } = props;
  
  // prep location with %20 for spaces
  
  let googleApiKey = process.env.GOOGLE_API_KEY;
  let mqApiKey = process.env.MAP_Q_API_KEY;

  const fetchCoordinates = async () => {
    let location = `${address}, ${city}, ${state} ${zipCode}`
    
    try {
      const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${mqApiKey}&location=${location}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const locationData = await response.json();
      setLatitude(locationData.results[0].locations[0].latLng.lat)
      setLongitude(locationData.results[0].locations[0].latLng.lng)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };


  useEffect(() => {
    fetchCoordinates();
  }, []);

  return (
    <LoadScript
      googleMapsApiKey= {googleApiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: latitude, lng: longitude }}
        zoom={16}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker 
          key={ latitude + longitude }
          position={{ lat: latitude, lng: longitude }}
          label={name}
        />
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent)


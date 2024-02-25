import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
const containerStyle = {
    
    width: '100%',
    height: '350px',
    margin: '0 auto',
  
  };
  
  function Map({center}) {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAGqX7DAlgi0sORju9bmDw6ztiFnpLyZR8"
    })
  
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center}></Marker>
          <></>
        </GoogleMap>
    ) : <></>
  }
  
  export default React.memo(Map)
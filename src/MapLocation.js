// MapWithMarker.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { TextField, Button, Container } from '@mui/material';

const MapWithMarker = () => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
  };
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };
  const defaultMarkerPosition = {
    lat: 13.765031507553774,
    lng: 100.53828781553166,
   

  }
  const defaultCenter = {
    lat: 5.77434,
    lng: 105.22908,
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  const handleGetLocation = () => {
    if (markerPosition) {
      setLatitude(markerPosition.lat.toFixed(6));
      setLongitude(markerPosition.lng.toFixed(6));
    }
  };

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  return (
    <Container>
      <LoadScript
        googleMapsApiKey="AIzaSyD_2jab3S89AIco5pDXevyDOYOKctbI5Jk"
      >
        <GoogleMap
        mapContainerStyle={mapStyles}
        
        
          center={defaultCenter}
          zoom={15}
          onClick={handleMapClick}
        >
          {markerPosition && (
            <Marker
              position={defaultMarkerPosition}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </GoogleMap>
      </LoadScript>

      <TextField
        label="Latitude"
        value={latitude}
        fullWidth
        disabled
      />
      <TextField
        label="Longitude"
        value={longitude}
        fullWidth
        disabled
      />
      <Button onClick={handleGetLocation} variant="contained" color="primary">
        Get Location
      </Button>
    </Container>
  );
};

export default MapWithMarker;

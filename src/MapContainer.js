// MapContainer.js
import React,{useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({latData,lngData}) => {
  console.log(typeof latData)
  console.log(typeof lngData)
  var latNumber = parseFloat(latData)
  var lngNumber = parseFloat(lngData)
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: latNumber,
    lng: lngNumber,
  };

  const markers = [
    { position: { lat: latNumber, lng: lngNumber}, title: 'Marker 1' },
    
    // Add more markers as needed
  ];
  const [zoom, setZoom] = useState(10); // Initial zoom level

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD_2jab3S89AIco5pDXevyDOYOKctbI5Jk"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
          />
        ))}
      </GoogleMap>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button onClick={() => handleZoomChange(zoom + 1)}>Zoom In</button>
        <button onClick={() => handleZoomChange(zoom - 1)}>Zoom Out</button>
      </div>
    </LoadScript>
  );
};

export default MapContainer;

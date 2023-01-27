import React from "react";
import GoogleMapReact from 'google-map-react';
import './map.css'

const Marker = ({ marker }) => <span id='marker' class="material-symbols-outlined">{marker}</span>

export default function Map() {
  const defaultProps = {
    center: {
      lat: -33.85672,
      lng: 151.21529
    },
    zoom: 13
  };

  return (
    // Important! Always set the container height explicitly
    <section id ='map'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,0" />
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={-33.85672}
          lng={151.21529}
          marker="location_on"
        />
      </GoogleMapReact>
    </section>
  );
}

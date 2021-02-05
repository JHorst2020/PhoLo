import React from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import MapPin from "./MapPin.js"

const Map = styled.div`
  width: 300px;
  height: 100vh;
  padding: 0px;
  border: 1px solid transparent;
  position: relative;
`;

const MapComponentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 30px 20px;
`;


const MapContainer = styled.div`
  max-width: 100%;
  height: 800px;
  padding: 0px;
  display: flex;
  border: 1px solid transparent;
  // margin-bott0m: 100px;
`;

const GoogleMap = () => {
  // const locationMarks = useSelector((state) => state.locations.locationlist);

  let lat = useSelector((state) => state.photo.searchLocation[0]);
  let lng = useSelector((state) => state.photo.searchLocation[1]);
  let radius = useSelector((state) => state.photo.searchLocation[2])
  let locations = useSelector((state) => state.photo.locations);
  let radiusToZoom = Math.round(14-Math.log(radius)/Math.LN2)

  return (
    <MapComponentContainer>
      <MapContainer>
        <Map>
          <GoogleMapReact 
            bootstrapURLKeys={{
              // key: `${process.env.REACT_APP_GOOGLE_API}`,
              key: `${process.env.REACT_APP_GOOGLE_API_DEVELOPMENT}`,
              
            }}
            defaultCenter={{
              lat: lat,
              lng: lng,
            }}
            defaultZoom={radiusToZoom}
          >
            {locations.map(location => (<MapPin lat={location.latitude} lng={location.longitude} />)
            )}
          </GoogleMapReact>
        </Map>
      </MapContainer>
    </MapComponentContainer>
  );
};

export default GoogleMap;

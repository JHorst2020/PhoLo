import React, {useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import MapPin from "./MapPin.js"
import {updateMapBounds} from "../../store/map"
import {updateSearchCoord} from "../../store/photo"

const Map = styled.div`
  width:100%;
  height: 100%;
  padding: 0px;
  border: 1px solid transparent;
  position: relative;
  
`;

const MapComponentContainer = styled.div`
  // display: flex;
  // align-items: flex-start;
  // padding: 30px 20px;
  height:100%;
  width:100%;
`;


const MapContainer = styled.div`
  padding: 0px;
  // display: flex;
  border: 1px solid transparent;
  width: 100%;
  height: 100%;
  min-width:300px;
`;

const GoogleMap = () => {
  // const locationMarks = useSelector((state) => state.locations.locationlist);
  const dispatch = useDispatch()
  let lat = useSelector((state) => state.photo.searchLocation[0]);
  let lng = useSelector((state) => state.photo.searchLocation[1]);
  let radius = useSelector((state) => state.photo.searchLocation[2])
  let locations = useSelector((state) => state.photo.locations);
  let radiusToZoom = Math.round(14-Math.log(radius)/Math.LN2)
  let latBounds
  let lngBounds
  let center
  const handleMapChange = (e) => {
    console.log(e)
    latBounds = Math.abs((e.marginBounds.sw.lat - e.marginBounds.ne.lat)*0.49);
    lngBounds = Math.abs((e.marginBounds.sw.lng - e.marginBounds.ne.lng)*0.5);
    center = e.center
    // console.log("this is center    ",center )
    dispatch(updateMapBounds({mapBounds: [latBounds, lngBounds], mapFocus: center}))
  }
  return (
    <MapComponentContainer>
      <MapContainer>
        <Map>
          <GoogleMapReact 
            bootstrapURLKeys={{
              key: `${process.env.REACT_APP_GOOGLE_API}`,
              // key: `${process.env.REACT_APP_GOOGLE_API_DEVELOPMENT}`,
              
            }}
            center={{
              lat: lat,
              lng: lng,
            }}
            zoom={radiusToZoom}
            onChange={handleMapChange}
            locations
            
          >
            {locations.map(location => (<MapPin location={location} key={location.id} id={location.id} lat={location.latitude} lng={location.longitude} photoUrl={location.photoUrl} />)
            )}
          </GoogleMapReact>
        </Map>
      </MapContainer>
    </MapComponentContainer>
  );
};

export default GoogleMap;

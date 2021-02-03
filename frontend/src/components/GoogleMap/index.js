import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

const Map = styled.div`
  width: 80%;
  height: 400px;
  padding: 0px;
  border: 1px solid transparent;
`;

const MapComponentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 30px 100px;
`;

const Header = styled.span`
  font-size: 1rem;
  color: #999;
  font-weight: 700;
  margin-right: 20px;
  margin-top: 20px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  padding: 0px;
  display: flex;
  border: 1px solid transparent;
  margin-bott0m: 100px;
`;

const PinContainer = styled.div`
  background-color: #3f51b5;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  border: 3px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const GoogleMap = () => {
//   const locationMarks = useSelector((state) => state.locations.locationlist);

//   let latitude = useSelector((state) => state.locations.searchLocation[0]);
//   let longitude = useSelector((state) => state.locations.searchLocation[1]);

  return (
    <MapComponentContainer>
      <MapContainer>
        <Map>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: `${process.env.REACT_APP_GOOGLE_API}`,
            }}
            defaultCenter={{
              lat: 36,
              lng: -116,
            }}
            defaultZoom={13}
          >
           
              <PinContainer
                lat="36"
                lng="-116"
              ></PinContainer>
           
          </GoogleMapReact>
        </Map>
      </MapContainer>
    </MapComponentContainer>
  );
};

export default GoogleMap;

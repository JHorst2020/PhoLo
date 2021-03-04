import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getNearbyPhotos} from "../../store/photo"
import "./ImageThumb.css"
import ViewSinglePhoto from "../ViewSinglePhoto"
import noPics from "../../assets/noPic.gif"

const ImageThumb = () => {
    const dispatch = useDispatch()
    const searchLocation = useSelector((state) => state.photo.searchLocation)
    const searchLocationName = useSelector((state) => state.photo.searchLocationName)
    const locations = useSelector((state) => state.photo.locations)
    const searchDateRange = useSelector((state) => state.photo.searchDateRange)
    const mapBounds = useSelector((state) => state.map.mapBounds)
    const mapCenter = useSelector((state) => state.map.mapFocus)
   
  
    useEffect(() => {
        let payload = {searchLat: mapCenter.lat, searchLng: mapCenter.lng, radius: searchLocation[2], dateRangeStart: searchDateRange[0], dateRangeEnd: searchDateRange[1], latBounds: mapBounds[0], lngBounds: mapBounds[1]}
        dispatch(getNearbyPhotos(payload))
    }, [mapBounds,searchDateRange])
    if(locations.length > 0){
      return (
        <>
          <div style={{marginLeft:"15px"}}>
            <div className="text-location-name">{searchLocationName}</div>
            <div className="text-location-dates">
              Dates: {searchDateRange[0]} to {searchDateRange[1]}
            </div>
          </div>
          <div className="ImageThumb__photo-container">
            {locations.map((location) => (
              <ViewSinglePhoto location={location} />
            ))}
          </div>
        </>
      );
      
    }
return (
  <div style={{marginLeft:"15px"}}>
    <div className="text-location-name">{searchLocationName}</div>
    <div className="text-location-dates" style={{marginBottom:"15px"}}>
      Between {searchDateRange[0]} and {searchDateRange[1]}
    </div>
    <div style={{marginBottom:"10px"}}>Try a different date range, or enter a different location.</div>
    <div>
      <img className="noPicZone" src={noPics} alt="no pics" />
    </div>
  </div>
);
}

export default ImageThumb
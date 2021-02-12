import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getNearbyPhotos} from "../../store/photo"
import "./ImageThumb.css"
import LazyLoad from "react-lazyload"
import ViewSinglePhoto from "../ViewSinglePhoto"
import noPics from "../../assets/noPic.gif"
import noPics2 from "../../assets/noPic2.gif"

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
        // let payload = {searchLat: 87, searchLng: -84, radius: 3}
        // console.log(payload)
        dispatch(getNearbyPhotos(payload))
    }, [mapBounds])
    if(locations.length > 0){
      return (
        <>
          <div>
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
  <div>
    <div className="text-location-name">{searchLocationName}</div>
    <div className="text-location-dates">
      Between {searchDateRange[0]} and {searchDateRange[1]}
    </div>
    {/* <div>Nothing cool I guess.... </div> */}
    <div>
      <img className="noPicZone" src={noPics} alt="no pics" />
    </div>
  </div>
);
}

export default ImageThumb
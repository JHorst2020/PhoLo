import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getNearbyPhotos} from "../../store/photo"
import "./ImageThumb.css"
import LazyLoad from "react-lazyload"
import ViewSinglePhoto from "../ViewSinglePhoto"

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
    
return (
  <>
    <span>
      <h2>{searchLocationName}</h2>
      <h4>Between {searchDateRange[0]} and {searchDateRange[1]}</h4>
    </span>
    <div className="ImageThumb__photo-container">
        {locations.map((location) => (
          <ViewSinglePhoto location={location} />
                ))}
    </div>
  </>
);
}

export default ImageThumb
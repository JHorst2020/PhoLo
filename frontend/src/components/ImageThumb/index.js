import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getNearbyPhotos} from "../../store/photo"
import "./ImageThumb.css"
import LazyLoad from "react-lazyload"

const ImageThumb = () => {
    const dispatch = useDispatch()
    const searchLocation = useSelector((state) => state.photo.searchLocation)
    const locations = useSelector((state) => state.photo.locations)
    const searchDateRange = useSelector((state) => state.photo.searchDateRange)

    useEffect(() => {
        let payload = {searchLat: searchLocation[0], searchLng: searchLocation[1], radius: searchLocation[2], dateRangeStart: searchDateRange[0], dateRangeEnd: searchDateRange[1]}
        // let payload = {searchLat: 87, searchLng: -84, radius: 3}
        console.log(payload)
        dispatch(getNearbyPhotos(payload))
    }, [])
    
return (
  <>
    <div className="ImageThumb__photo-container">
        {locations.map((location) => (
            <div key={location.id} className="ImageThumb__photo">
              <LazyLoad>
            <img src={location.photoThumbUrl} alt="nature" />
            </LazyLoad>
          </div>
        ))}
    </div>
  </>
);
}

export default ImageThumb
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPhotos } from "../../store/photo";
import "../ImageThumb/ImageThumb.css"
import LazyLoad from "react-lazyload";
import ViewSinglePhoto from "../ViewSinglePhoto";


const MyPhotoThumb = () => {
  const searchLocationName = useSelector((state) => state.photo.searchLocationName)
  const searchLocation = useSelector((state) => state.photo.searchLocation);
  const mapBounds = useSelector((state) => state.map.mapBounds);
  
  const searchDateRange = useSelector((state) => state.photo.searchDateRange)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const locations = useSelector((state) => state.photo.locations);

  useEffect(() => {
    dispatch(getMyPhotos(user.id));
  }, [mapBounds]);
 
  return (
    <>
      <div style={{marginLeft:"15px"}}>
        {/* <div className="text-location-name">{searchLocationName}</div> */}
        <div className="text-location-name">All of My Photos</div>
        <div className="text-location-dates">
          No date range
        </div>
        {/* <div className="text-location-dates">
          Between {searchDateRange[0]} and {searchDateRange[1]}
        </div> */}
      </div>
      <div className="ImageThumb__photo-container">
        {locations.map((location) => (
          <ViewSinglePhoto location={location} />
        ))}
      </div>
    </>
  );
};

export default MyPhotoThumb;

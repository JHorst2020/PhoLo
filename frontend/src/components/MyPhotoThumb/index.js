import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPhotos } from "../../store/photo";
import "../ImageThumb/ImageThumb.css"
import ViewSinglePhoto from "../ViewSinglePhoto";


const MyPhotoThumb = () => {
  const mapBounds = useSelector((state) => state.map.mapBounds);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const locations = useSelector((state) => state.photo.locations);

  useEffect(() => {
    dispatch(getMyPhotos(user.id));
  }, [mapBounds]);
 
  return (
    <>
      <div style={{marginLeft:"15px"}}>
        <div className="text-location-name">All of My Photos</div>
        <div className="text-location-dates">
          No date range
        </div>
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

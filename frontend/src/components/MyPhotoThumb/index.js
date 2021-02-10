import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPhotos } from "../../store/photo";
import "../ImageThumb/ImageThumb.css"
import LazyLoad from "react-lazyload";
import ViewSinglePhoto from "../ViewSinglePhoto";


const MyPhotoThumb = () => {
  const searchLocationName = useSelector((state) => state.photo.searchLocationName)
  const searchDateRange = useSelector((state) => state.photo.searchDateRange)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const locations = useSelector((state) => state.photo.locations);

  useEffect(() => {
    dispatch(getMyPhotos(user.id));
  }, []);
 
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
};

export default MyPhotoThumb;

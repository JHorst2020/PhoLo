import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPhotos } from "../../store/photo";
import "../ImageThumb/ImageThumb.css"
import LazyLoad from "react-lazyload";
import ViewSinglePhoto from "../ViewSinglePhoto";

const MyPhotoThumb = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const locations = useSelector((state) => state.photo.locations);

  useEffect(() => {
    dispatch(getMyPhotos(user.id));
  }, []);
 
  return (
    <>
      <div className="ImageThumb__photo-container">
        {locations.map((location) => (
          <ViewSinglePhoto location={location} />
        ))}
      </div>
    </>
  );
};

export default MyPhotoThumb;

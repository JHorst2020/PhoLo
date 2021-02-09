import GoogleMap from "../components/GoogleMap";
import MyPhotoThumb from "../components/MyPhotoThumb";
import SearchBar from "../components/SearchBar";
import {useSelector} from "react-redux"


const MyPhotos= () => {

  return (
    <>
      <div>This is my photos</div>
      <SearchBar />
      <div className="Home__home-container">
        <div>
          <GoogleMap />
        </div>

        <div>
          <MyPhotoThumb />
        </div>
      </div>
    </>
  );
};

export default MyPhotos;
import GoogleMap from "../components/GoogleMap";
import MyPhotoThumb from "../components/MyPhotoThumb";

const MyPhotos= () => {
  return (
    <div style={{display:"flex", flexWrap:"wrap"}}>
      <div className="Home__home-container" style={{ display: "flex", width:"100%"}}>
        <div style={{ flex: "1", height: "80%", width:"100%" }}>
          <GoogleMap />
        </div>
        <div style={{ flex: "3", height: "100%", overflow: "scroll", width:"100%" }}>
          <MyPhotoThumb />
        </div>
      </div>
    </div>
  );
};

export default MyPhotos;
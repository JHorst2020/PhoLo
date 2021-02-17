import GoogleMap from "../components/GoogleMap";
import ImageThumb from "../components/ImageThumb";
import SearchBar from "../components/SearchBar";
import {useSelector} from "react-redux"


const Home = () => {
  return (
    <div style={{ height:"100vh", backgroundColor: "#f8f8ff", flexWrap:"wrap"}}>
      {/* <SearchBar /> */}
      <div className="Home__home-container" style={{ display: "flex"}}>
        <div style={{ flex: "1", height: "100%" }}>
          <GoogleMap />
        </div>

        <div style={{ flex: "5", height: "100%", overflow: "scroll" }}>
          <ImageThumb />
        </div>
      </div>
    </div>
  );
};

export default Home;

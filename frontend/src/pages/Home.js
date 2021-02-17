import GoogleMap from "../components/GoogleMap";
import ImageThumb from "../components/ImageThumb";
import SearchBar from "../components/SearchBar";
import {useSelector} from "react-redux"


const Home = () => {
  return (
    <div style={{ display:"flex", flexWrap:"wrap"}}>
      {/* <SearchBar /> */}
      <div className="Home__home-container" style={{ display: "flex", width:"100%"}}>
        <div style={{ flex: "1", height: "80%", width:"100%" }}>
          <GoogleMap />
        </div>

        <div style={{ flex: "4", height: "100%", overflow: "scroll", width:"100%" }}>
          <ImageThumb />
        </div>
      </div>
    </div>
  );
};

export default Home;

import GoogleMap from "../components/GoogleMap";
import ImageThumb from "../components/ImageThumb";
import SearchBar from "../components/SearchBar";
import {useSelector} from "react-redux"


const Home = () => {
  return (
    <>
      {/* <SearchBar /> */}
      <div className="Home__home-container">
        <div>
          <GoogleMap  />
        </div>

        <div>
          <ImageThumb />
        </div>
      </div>
    </>
  );
};

export default Home;

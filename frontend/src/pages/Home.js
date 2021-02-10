import GoogleMap from "../components/GoogleMap";
import ImageThumb from "../components/ImageThumb";
import SearchBar from "../components/SearchBar";
import {useSelector} from "react-redux"


const Home = () => {
  const reloadProp = useSelector((state) => state.photo.searchLocation)
  return (
    <>
      
      <SearchBar />
      <div className="Home__home-container">
        <div>
          <GoogleMap reloadProp={reloadProp}/>
        </div>

        <div>
          <ImageThumb />
        </div>
      </div>
    </>
  );
};

export default Home;

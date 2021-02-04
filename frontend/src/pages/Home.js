import GoogleMap from "../components/GoogleMap";
import ImageThumb from "../components/ImageThumb";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <div>Home component!</div>
      <SearchBar />
      <div className="Home__home-container">
        <div>
          <GoogleMap />
        </div>

        <div>
          <ImageThumb />
        </div>
      </div>
    </>
  );
};

export default Home;

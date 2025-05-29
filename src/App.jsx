import NavBar from "./components/navBar";
import CityAndTime from "./components/cityAndTime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {

  const [cityName, setCityName] = useState("");
  const [lat, setlat] = useState(null);
  const [lon, setlon] = useState(null);

  const handleCitySearch = (city) => {
    setCityName(city);
    setlat(null);
    setlon(null);
  }

  const handleLocationFetch = (latitude, longitude) => {
    setlat(latitude);
    setlon(longitude);
    setCityName("");
  }

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="w-full h-full">
        <NavBar onCitySearch={handleCitySearch} onLocationFetch={handleLocationFetch} />
      </div>
      <div>
        <CityAndTime cityName={cityName} lat={lat} lon={lon} setlat={setlat} setlon={setlon} />
      </div>



    </div>
  );
}

export default App;
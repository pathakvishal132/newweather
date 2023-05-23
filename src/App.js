
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const Key = "61a1b6c3c1af3643d3220bef02306e58";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    let cn = cityName;
    if (!cn) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cn +
      "&appid=" +
      Key;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const InputHandle = (input) => {
    console.log("value", input.target.value);
    setInputCity(input.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="header">Enter Place !</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={InputHandle}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            
            <h5 className="weathorCity">{data?.name}</h5>
            <h5 className="weathorCity">Desc:{data?.weather && data.weather.length > 0 && data.weather[0].description}</h5>
            <h6 className="weathorTemprature">
              {((data?.main?.temp) - 273.15).toFixed(2)}°C
            </h6>
            
            <h6 className="weatherVisibility">Visibility :{data?.visibility}</h6>
            <h6 className="weatherHumidity">
              Humidity: {data?.main?.humidity}%
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

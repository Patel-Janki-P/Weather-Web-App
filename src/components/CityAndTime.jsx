import Sun from "../assets/sun.png";
import Clock from "./clock";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import sunny from "../assets/sunny.png";
import humidity from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import pressure from "../assets/pressure.png";
import UV from "../assets/uv.png";
import ForeCast from "./ForeCast";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CityAndTime = ({cityName, lat, lon, setlat, setlon}) => {
    
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [uvIndex, setUVIndex] = useState(null);

    const fetchData = async (overrideLat, overrideLon) => {
        try {
            const encodedCity = encodeURIComponent(cityName);
            let url;

            if (encodedCity){
                url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&&appid=6b6c6bdc8e7ecefc82ef5b02b7aa04c2`;
            }else if (overrideLat && overrideLon) {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${overrideLat}&lon=${overrideLon}&units=metric&appid=6b6c6bdc8e7ecefc82ef5b02b7aa04c2`;
            }else if (lat && lon) {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&appid=6b6c6bdc8e7ecefc82ef5b02b7aa04c2`;
            }else {
                toast.error("No city name or coordinates provided");
            }

            const currentWeather = await axios.get(url);
            setWeatherData(currentWeather.data);

            const { coord } = currentWeather.data;
            setlat(coord.lat);
            setlon(coord.lon);

            const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&&appid=6b6c6bdc8e7ecefc82ef5b02b7aa04c2`);
            setForecastData(forecast.data);

            const uv = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=6b6c6bdc8e7ecefc82ef5b02b7aa04c2`);
            setUVIndex(uv.data.value);

        
        } catch (error) {   
            console.log("Error fetching data:", error);
        }
    }
    
    useEffect(() => {
        if (!cityName &&(!lat || !lon)) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setlat(latitude);
                    setlon(longitude);
                    fetchData(latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation Error:", error);
                    toast.error("Location Access Denied. Please enter a city manually.");
                }
            );
        }
        else {
            fetchData(lat, lon);
        }
    }, [cityName, lat, lon]);

    if (!weatherData || !forecastData) {
        return <div className="flex items-center justify-center text-white text-2xl md:text-6xl">Loading....</div>
    }

    const { main, weather, sys, wind } = weatherData;
    const { list } = forecastData;

    const weatherIconurl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png` 

    return (
        <>
            <div className="flex flex-col xl:flex-row gap-6 m-4">
                {/* left section: city and time */}
                <div className="w-1/3 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-bold">{cityName || weatherData.name}</h1>
                    <img src={Sun} alt="WeatherImage" className="w-24 select-none" />
                    <Clock />
                </div>


                {/* Right section: weather details */}
                <div className="flex-grow h-auto w-2/3 md:h-72 bg-gray-400 shadow-2xl rounded-lg text-black p-4 flex flex-col justify-around md:flex-row items-center md:items-stretch gap-4">
                    {/* temperature, sunrise and sunset */}
                    <div className="flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4">
                        <h1 className="text05xl md:text-7xl font-bold">{main.temp}&#8451;</h1>
                        <p className="items-center">
                            Feels Like: <span className="text-lg md:text-xl ml-2 font-bold">{main.feels_like}&#8451;</span>
                        </p>
                        <div className="flex xl:flex-col md:flex-row items-center gap-4">
                            <div className="flex items-center gap-2">
                                <img src={sunrise} alt="sunrise" className="h-8 md:h-10 select-none" />
                                <div className="text-center">
                                    <h6>SunRise</h6>
                                    <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()} AM</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <img src={sunset} alt="sunset" className="h-8 md:h-10 select-none" />
                                <div className="text-center">
                                    <h6>SunSet</h6>
                                    <p>{new Date(sys.sunset * 1000).toLocaleTimeString()} PM</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* main weather details */}
                    <div className="flex flex-col justify-center items-center">
                        <img src={weatherIconurl} alt="weather icon" className="w-36 h-36 md:w-52 md:h-52 select-none" />
                        <p className="font-bold text-xl md:text-3xl">{[weather[0].description]}</p>
                    </div>

                    {/* additional weather details */}
                    <div className="md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4">
                        <div className="flex flex-col items-center gap-2">
                            <img src={humidity} alt="humidity" className="h-8 md:h-10 select-none" />
                            <p>{main.humidity}%</p>
                            <h6>Humidity</h6>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <img src={windIcon} alt="wind speed" className="h-8 md:h-10 select-none" />
                            <p>{wind.speed} km/hr</p>
                            <h6>Wind Speed</h6>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <img src={pressure} alt="pressure" className="h-8 md:h-10 select-none" />
                            <p>{main.pressure} hpa</p>
                            <h6>Pressure</h6>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <img src={UV} alt="uv" className="h-8 md:h-10 select-none" />
                            <p>{uvIndex !== null ? uvIndex : 'N/A'}</p>
                            <h6>UV</h6>
                        </div>
                    </div>
                </div>
            </div>

            <ForeCast forecast= {list}/>
        </>

    );
}

export default CityAndTime;
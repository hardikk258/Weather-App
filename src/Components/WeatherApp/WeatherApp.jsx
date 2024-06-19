import React, { useState } from 'react'
import './WeatherApp.css';
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'


// const WeatherApp = () => {

//   const apiKey = "763c7fdae1cff6ae41e74a3e6e107ec5"
//   const element = document.getElementsByClassName('cityInput');
//   const [wicon, setwicon] = useState(cloud_icon)
//   const [humidity, sethumidity] = useState('64%')
//   const [wind, setwind] = useState('18 Km/hr')
//   const [temperature, settemperature] = useState('24°C')
//   const [location, setlocation] = useState('London')

//   const search = async ()=>{
//     if(element[0].value === ""){
//       return 0;
//     }
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
//     let response = await fetch(url);
//     if (!response.ok) {
//       sethumidity("");
//       setwind("");
//       settemperature("" );
//       setlocation(); 
//     }
//     let data = await response.json();
//     console.log("API response:", data);

//     sethumidity( data.main.humidity + "%" );
//     setwind( data.wind.speed + "Km/hr" );
//     settemperature( data.main.temp + "°C" );
//     setlocation( data.name );

//     if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
//       setwicon(clear_icon);
//     }
//     else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
//       setwicon(cloud_icon);
//     }
//     else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
//       setwicon(drizzle_icon);
//     }
//     else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
//       setwicon(rain_icon);
//     }
//     else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
//       setwicon(snow_icon);
//     }
//     else{
//       setwicon(clear_icon)
//     }
//   }
const WeatherApp = () => {
  const apiKey = "763c7fdae1cff6ae41e74a3e6e107ec5";
  const [wicon, setwicon] = useState(cloud_icon);
  const [humidity, setHumidity] = useState('64%');
  const [wind, setWind] = useState('18 Km/hr');
  const [temperature, setTemperature] = useState('24°C');
  const [location, setLocation] = useState('London');

  const search = async () => {
    const cityInput = document.getElementsByClassName('cityInput')[0];
    if (cityInput.value === "") {
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${apiKey}`;
    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      let data = await response.json();
      
      setHumidity(data.main.humidity + "%");
      setWind(data.wind.speed + "Km/hr");
      setTemperature(data.main.temp + "°C");
      setLocation(data.name);

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setwicon(clear_icon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setwicon(cloud_icon);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setwicon(drizzle_icon);
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setwicon(rain_icon);
      } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setwicon(snow_icon);
      } else {
        setwicon(clear_icon);
      }
    }
    catch (error) {
      setHumidity('');
      setWind('');
      setTemperature('');
      setLocation('Invalid Location');
      setwicon(clear_icon);
    }
  }

  return (
    <div className='container'>

      <div className="top-bar">
        <input type="text" className='cityInput' placeholder='Enter City Name' />
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>

      <div className="weather-temp">
        {temperature}
      </div>
      <div className="weather-location">
        {location}
      </div>

      <div className="data-container">

          <div className="element">
            <img src={humidity_icon} alt="" className='icon'/>
            <div className="data">
                <div className="humidity-percent">{humidity}</div>
                <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className='icon'/>
            <div className="data">
                <div className="wind-rate">{wind}</div>
                <div className="text">Wind Speed</div>
            </div>
          </div>

      </div>

    </div>
  )
}

export default WeatherApp

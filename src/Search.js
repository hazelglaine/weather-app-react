import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96771e971243152d6b8948878c26adde&units=metric`;
    axios.get(url).then(updateWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function updateWeather(response) {
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  let form = (
    <form className="InputForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter a city..." onChange={updateCity} />
      <input className="Button SearchButton" type="submit" value="Search" />
      <input
        className="Button CurrentButton"
        type="submit"
        value="Current"
        id="SearchCurrent"
      />
    </form>
  );

  if (loaded) {
    return (
      <div className="Overview">
        {form}
        <div className="Details" style={{ textAlign: "left" }}>
          <h1>{city.charAt(0).toUpperCase() + city.slice(1)}</h1>
          <h3>Friday 11:14</h3>
          <h3>
            {weather.description.charAt(0).toUpperCase() +
              weather.description.slice(1)}
          </h3>
        </div>
        <div className="Parameters flexbox-container">
          <div className="TempStatus flexbox-container">
            <img
              className="WeatherIcon"
              src={weather.icon}
              alt="weather icon"
            />
            <p>
              <span className="Temp">{Math.round(weather.temperature)}</span>{" "}
              <span className="Unit">℃</span>
            </p>
          </div>
          <div className="DescStatus">
            <ul>
              <li>Precipitation: {weather.humidity}%</li>
              <li>Wind: {Math.round(weather.wind)} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return form;
  }
}

import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState(null);
  const [loader, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);
}

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
    <input type="submit" value="Search" />
    <input type="submit" value="Current" id="SearchCurrent" />
  </form>
);

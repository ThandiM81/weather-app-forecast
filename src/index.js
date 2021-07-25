let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="forecast-date">${formatDay(day.dt)}</div>
    <img src =
    "http://openweathermap.org/img/wn/${
      day.weather[0].icon
    }@2x.png" alt="forecast-icon" width = 80px />
    <div class="forecast-temps">
      <span class="forecast-temp-max"> ${Math.round(day.temp.max)}° </span>
      <span class="forecast-temp-min"> ${Math.round(day.temp.min)}° </span>
    </div>
  </div>

`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c0e5a5c3b664f47b5456256e176f47e9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let icon = document.querySelector("#iconNow");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemp = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let temperatureShown = document.querySelector("#tempDisplay");
  temperatureShown.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${day} ${date} ${month}`;

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = `Last updated at ${hours}:${minutes}`;

  let description = response.data.weather[0].description;
  let currentDescriptor = document.querySelector("#current");
  currentDescriptor.innerHTML = `${description}`;

  let precipitation = Math.round(response.data.main.temp);
  let currentPrec = document.querySelector("#rain");
  currentPrec.innerHTML = `Precipitation: ${precipitation}%`;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumid = document.querySelector("#humid");
  currentHumid.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Windspeed: ${wind} km/h`;

  getForecast(response.data.coord);
}
function showPlace(position) {
  let apiKey = "c0e5a5c3b664f47b5456256e176f47e9";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPlace);
}
let button = document.querySelector("#location-search");
button.addEventListener("click", showPosition);

function search(city) {
  let apiKey = "c0e5a5c3b664f47b5456256e176f47e9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-entry");
  search(city.value);
}

let button1 = document.querySelector("#search-city");
button1.addEventListener("click", handleSubmit);

search("Harare");

function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-stats-value");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElementOne = document.querySelector("#city-search-one");
  cityElementOne.innerHTML = response.data.city;
  let cityElementTwo = document.querySelector("#city-search-two");
  cityElementTwo.innerHTML = response.data.city;
  let conditionsElement = document.querySelector("#condition-description");
  conditionsElement.innerHTML = capitalizeFirstLetter(
    response.data.condition.description
  );
  let windSpeedElement = document.querySelector("#current-wind-speed");
  windSpeedElement.innerHTML = response.data.wind.speed;
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let date = new Date(response.data.time * 1000);

  let dateTimeElement = document.querySelector("#current-date-time");
  dateTimeElement.innerHTML = formatedDate(date);

  let iconElement = document.querySelector("#current-stats-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  getForecastData(response.data.city);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatedDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "23e75f7acb80e43d1aa43c2eod7017bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");

  searchCity(searchInput.value);
}

let citySearchElement = document.querySelector("#city-search-form");
citySearchElement.addEventListener("submit", changeCity);

searchCity("Riga");

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById("embed-iframe");
  const options = {
    width: "63%",
    height: "90",
    uri: "spotify:playlist:37i9dQZF1DX4wta20PHgwo",
  };

  const callback = (EmbedController) => {};
  IFrameAPI.createController(element, options, callback);
};

function getForecastData(city) {
  let apiKeyForecast = "23e75f7acb80e43d1aa43c2eod7017bt";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyForecast}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
  console.log(apiUrlForecast);
}

function formatDayForForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";
  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="row day-one">
            <div class="col-sm-2">${formatDayForForecast(day.time)}</div>
            <div class="col-sm-3"><strong>${Math.round(
              day.temperature.maximum
            )}°C</strong>|${Math.round(day.temperature.minimum)}°C</div>
            <div class="col-sm-3">${day.wind.speed}m/sec</div>
            <div class="col-sm-2"><img src="${
              day.condition.icon_url
            }" class="icon-url"/></div>
            <div class="col-sm-2">${day.condition.description}</div>
          </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

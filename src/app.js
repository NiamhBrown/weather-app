let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];
let day = document.querySelector("#day");
day.innerHTML = currentDay;

let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let time = document.querySelector("#time");
time.innerHTML = `${currentHour}:${currentMinute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayAffirmation() {
  let affirmation = [
    "I have control over my life and get to choose how things play out.",
    "You have the ability to create + become anything you desire.",
    "Everyday I make positive decisions that further align me with my goals.",
    "Do not settle for mediocre. You are not mediocre.",
    "I trust the process and the timing of my life.",
    "Nothing is too good or too big for you.",
    "Everyday I am attracting the right people, opportunities and resources to achieve my big goals.",
  ];
  let affirmationContent = document.querySelector("#daily-affirmation-content");
  affirmationContent.innerHTML = `${affirmation[currentDate.getDay()]}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-day">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
                class="weather-forecast-icon"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-foreacast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="weather-foreacast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp-value");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Brighton");
displayAffirmation();

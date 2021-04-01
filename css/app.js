// Time

function formatDate(timestamp) {

let now = new Date(timestamp);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }

return `${day}, ${hour}:${minutes}`;
}

// Temperature conversion 


function toFahrenheit(event) {
    event.preventDefault();
    let temp = document.querySelector(".temp");
    let ctofFormula = Math.round(celsiusTemperature * 1.8 + 32);
    temp.innerHTML = ctofFormula;
    document.getElementById("cel").style.color = "#cecece";
    document.getElementById("far").style.color = "#838383";
}

let fahrenheit = document.querySelector(".temp-fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);


function toCelsius(event) {
    event.preventDefault();
    let temp = document.querySelector(".temp");
    temp.innerHTML = celsiusTemperature;
    document.getElementById("far").style.color = "#cecece";
    document.getElementById("cel").style.color = "#838383";
}

let celsius = document.querySelector(".temp-celsius");
celsius.addEventListener("click", toCelsius);

let celsiusTemperature = null;

// Show weather data for chosen city 


function showCityData(response) {
    let cityTemp = document.querySelector(".temp");
    cityTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
    celsiusTemperature = `${Math.round(response.data.main.temp)}`;
    let cityName = document.querySelector("#h1city");
    cityName.innerHTML = response.data.name;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed * 3.6)
    let dateElement = document.querySelector("h3");
    dateElement.innerHTML = `Last updated: ${formatDate(response.data.dt * 1000)}`;
    let code = response.data.weather[0].icon;
    let url = `http://openweathermap.org/img/wn/${code}@2x.png`;
    let icon1 = document.getElementById("icon-1");
    icon1.src = url;
    icon1.alt = response.data.weather[0].description;
}



function getCityData(city) {
  
    let apiKey = "6c12bf653a5233b9ac28d0707b11b7e6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showCityData);
}

// City via search form

function handleSubmit(event) {
    event.preventDefault();
    let input = document.querySelector("#search-city-form");
    getCityData(input.value);  
}

let searchCityTemp = document.querySelector(".d-flex");

searchCityTemp.addEventListener("submit", handleSubmit);


// City via current location button

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCityData);
}

function getCurrentPosition() {
navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");

button.addEventListener("click", getCurrentPosition);


// Default city

getCityData("Amsterdam");
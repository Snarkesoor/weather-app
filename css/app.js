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


// Show weather data for chosen city 


function showCityData(response) {
    let cityTemp = document.querySelector(".temp-conversion");
    cityTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;
    let cityName = document.querySelector("#h1city");
    cityName.innerHTML = response.data.name;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed * 3.6)
    let dateElement = document.querySelector("h3");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

// City via search form

function getCityData(event) {
    event.preventDefault();
    let input = document.querySelector("#search-city-form");
    let city = input.value;    
    let apiKey = "6c12bf653a5233b9ac28d0707b11b7e6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showCityData);
}

let searchCityTemp = document.querySelector(".d-flex");

searchCityTemp.addEventListener("submit", getCityData);


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


// Temperature conversion

let tempConversion = document.querySelector(".temp-conversion");


let fahrenheit = document.querySelector(".temp-fahrenheit");
function toFahrenheit(event) {
    event.preventDefault();
    let ctofFormula = 15 * 1.8 + 32;
    tempConversion.innerHTML = `${ctofFormula}° `;
    document.getElementById("cel").style.color = "#cecece";
    document.getElementById("far").style.color = "#838383";
}

fahrenheit.addEventListener("click", toFahrenheit);


let celsius = document.querySelector(".temp-celsius");
function toCelsius(event) {
    event.preventDefault();
    let ftocFormula = Math.round((59 - 32) * .5556);
    tempConversion.innerHTML = `${ftocFormula}° `;
    document.getElementById("far").style.color = "#cecece";
    document.getElementById("cel").style.color = "#838383";
}

celsius.addEventListener("click", toCelsius);

//
let h3 = document.querySelector("h3");

let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }

h3.innerHTML = `${day}, ${hour}:${minutes}`;

//

let h1 = document.querySelector("h1");

function replaceCity(event) {
    event.preventDefault();
    let input = document.querySelector("#search-city-form");
    h1.innerHTML = input.value;
}    

let searchCity = document.querySelector(".d-flex");

searchCity.addEventListener("submit", replaceCity);

//

let tempConversion = document.querySelector(".temp-conversion");


let fahrenheit = document.querySelector(".temp-fahrenheit");
function toFahrenheit(event) {
    event.preventDefault();
    let ctofFormula = 15 * 1.8 + 32;
    tempConversion.innerHTML = `${ctofFormula} `;
}

fahrenheit.addEventListener("click", toFahrenheit);


let celsius = document.querySelector(".temp-celsius");
function toCelsius(event) {
    event.preventDefault();
    let ftocFormula = Math.round((59 - 32) * .5556);
    tempConversion.innerHTML = `${ftocFormula} `;
}

celsius.addEventListener("click", toCelsius);

//

function showTemperature(response) {
    let cityTemp = document.querySelector(".temp-conversion");
    cityTemp.innerHTML = Math.round(response.data.main.temp);
}



function getTemperature() {
    let input = document.querySelector("#search-city-form");
    let city = input.value;
    let apiKey = "6c12bf653a5233b9ac28d0707b11b7e6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let searchCityTemp = document.querySelector(".d-flex");

searchCityTemp.addEventListener("submit", getTemperature);

//


function showCityAndTemperature(response) {
    let cityTemp = document.querySelector(".temp-conversion");
    cityTemp.innerHTML = Math.round(response.data.main.temp);
    console.log(response);

    let cityName = document.querySelector("h1");
    cityName.innerHTML = response.data.name;
}


function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCityAndTemperature);
}

function getCurrentPosition() {
navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");

button.addEventListener("click", getCurrentPosition);
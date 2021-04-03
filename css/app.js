// Time (header)

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

// Date (forecast)

function formatDay(timestamp) {

let date = new Date(timestamp * 1000)

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]   
let day = days[date.getDay()];

let dayNumber = date.getDate();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let month = months[date.getMonth()];
 

return `${day} ${dayNumber} ${month}:`;

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


function showForecast(response) {
        console.log(response);
    let forecast = document.querySelector("#forecast");

    // Current temperature
    let cityTempChange = `${Math.round(response.data.current.temp)}`;
    console.log(cityTempChange);

    // Current weather icon
    let code = response.data.current.weather[0].icon;
    let url = `http://openweathermap.org/img/wn/${code}@2x.png`;
    let icon1 = document.getElementById("icon-1");
    icon1.src = url;
    icon1.alt = response.data.current.weather[0].description;

        let forecastHTML = `          <div class="row">
            <div class="col-3">
              <p class="date-big">Today:</p>
              <p class="temp-big">
                <img src="${icon1.src}" id="icon-1" alt="${icon1.alt}" width="50px"></img><br /><span class="temp"
                  >${cityTempChange}</span>°             
              </p>
            </div>`;

    // Temperature forecast

    let prediction = response.data.daily;

   prediction.forEach(function (forecastDay, index) {
       if (index < 5) {
            forecastHTML = forecastHTML + `<div class="col" id="future-weather">

                  <p class="date">${formatDay(forecastDay.dt)}</p>
                  <p class="temp-small">
                  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="${forecastDay.weather[0].description}" width="50px"></img><br /><span class="temps"
                  >${Math.round(forecastDay.temp.day)}</span>°</p>
              </div>` }
    } ) 

               forecastHTML = forecastHTML + `</div>`
    forecast.innerHTML = forecastHTML;  
}




function getForecast(coordinates) {
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let apiKey = "6c12bf653a5233b9ac28d0707b11b7e6";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,alerts}&appid=${apiKey}&units=metric`
    axios.get(url).then(showForecast);
}


function showCityData(response) {
    celsiusTemperature = `${Math.round(response.data.main.temp)}`;
    let cityName = document.querySelector("#h1city");
    cityName.innerHTML = response.data.name;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed * 3.6)
    let dateElement = document.querySelector("h3");
    dateElement.innerHTML = `Last updated: ${formatDate(response.data.dt * 1000)}`;

    getForecast(response.data.coord);
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


const searchInputEl = document.getElementById('searchInput');
const searchIconEl = document.getElementById('searchIcon');
const apiKey = "bb82b83521967c3f72e89d7eb6fea979";

async function getWeatherDetails(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(url);
    console.log(response.status);
    if (response.status == 404) {
        document.querySelector('.error_message').style.display = "block";
    } else {
        const weatherData = await response.json();
        console.log(weatherData);
        displayWeather(weatherData);
    }
}

function displayWeather(weatherData) {
    const tempEl = document.getElementById('temp');
    const cityEl = document.getElementById('city');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('windSpeed');
    const weatherImageEl = document.getElementById('weatherImage');
    const weatherEl = document.getElementById('weather');

    tempEl.innerText = Math.round(weatherData.main.temp);
    cityEl.innerText = weatherData.name;
    humidityEl.innerText = weatherData.main.humidity;
    windSpeedEl.innerText = weatherData.wind.speed;
    weatherEl.innerText = weatherData.weather[0].main;

    const weather = weatherData.weather[0].main;

    if (weather === "Clear") {
        weatherImageEl.src = "images/clear.png";
    } else if (weather === "Clouds") {
        weatherImageEl.src = "images/clouds.png";
    } else if (weather === "Drizzle") {
        weatherImageEl.src = "images/drizzle.png";
    } else if (weather === "Mist") {
        weatherImageEl.src = "images/mist.png";
    } else if (weather === "Rain") {
        weatherImageEl.src = "images/rain.png";
    } else if (weather === "Snow") {
        weatherImageEl.src = "images/snow.png";
    } else if (weather === "Wind") {
        weatherImageEl.src = "images/wind.png";
    }

    const weatherDisplay = document.querySelector('.weather');
    const container = document.querySelector('.container');
    container.style.height = "600px";
    weatherDisplay.style.display = "block";
}

searchIconEl.addEventListener("click", () => {
    searchInput = searchInputEl.value;
    if (searchInput === "" || !isNaN(searchInput)) {
        document.querySelector('.error_message').style.display = "block";
    } else {
        document.querySelector('.error_message').style.display = "none";
        getWeatherDetails(searchInput);
    }
});

document.getElementById('searchInput').addEventListener('focus', function () {
    document.querySelector('.error_message').style.display = "none";
});
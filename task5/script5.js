const apiKey = '0d73b56dfd34d8895281a7aa85c30c3b'; // Your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        method: 'GET',
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        displayWeather(response);
    }).fail(function () {
        alert("City not found. Please try again.");
    });
}

function displayWeather(response) {
    const weatherInfo = document.getElementById("weather-info");
    const temp = response.main.temp;
    const feelsLike = response.main.feels_like;
    const tempMin = response.main.temp_min;
    const tempMax = response.main.temp_max;
    const humidity = response.main.humidity;
    const pressure = response.main.pressure;
    const windSpeed = response.wind.speed;
    const windDirection = response.wind.deg;
    const description = response.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
        <div class="weather-item">
            <h2>City: ${response.name}, ${response.sys.country}</h2>
            <img class="weather-icon" src="${icon}" alt="${description}">
            <p>Temperature: ${temp}°C</p>
            <p>Feels Like: ${feelsLike}°C</p>
            <p>Min Temp: ${tempMin}°C</p>
            <p>Max Temp: ${tempMax}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Wind Direction: ${windDirection}°</p>
            <p>Weather: ${description}</p>
        </div>
    `;
}
function createDate(date) {
    let weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
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
        "December"
    ];

    let weekDay = weekDays[date.getDay()];
    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    let sentence = `${weekDay}, ${day} ${month} ${year}`;

    return sentence;
}

function createHour(date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let sentence = `${hour}:${minutes}`;
    return sentence;
}

function displayDate() {
    let day = createDate(new Date());
    let hour = createHour(new Date());
    let currentDay = document.querySelector("#current-day");
    let currentHour = document.querySelector("#current-hour");

    currentDay.innerHTML = day;
    currentHour.innerHTML = hour;
}

displayDate();

let celsiusButton = document.querySelector("#celsius-button");

celsiusButton.addEventListener("click", function () {
    let temperatureDisplayed = document.querySelector("#temperature-displayed");

    temperatureDisplayed.innerHTML = "27ºC";
});

let farenheitButton = document.querySelector("#fahrenheit-button");

farenheitButton.addEventListener("click", function () {
    let temperatureDisplayed = document.querySelector("#temperature-displayed");

    temperatureDisplayed.innerHTML = "80ºF";
});

function displayData(response) {
    let cityName = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let feelsLike = Math.round(response.data.main.feels_like);
    let wind = Math.round(response.data.wind.speed);
    let humidity = Math.round(response.data.main.humidity);
    console.log(temperature, feelsLike, wind, humidity);

    let cityDisplayed = document.querySelector("#city-displayed");
    let temperatureDisplayed = document.querySelector("#temperature-displayed");
    let feelsLikeDisplayed = document.querySelector("#feels-displayed");
    let windDisplayed = document.querySelector("#wind-displayed");
    let humidityDisplayed = document.querySelector("#humidity-displayed");

    cityDisplayed.innerHTML = cityName;
    temperatureDisplayed.innerHTML = `${temperature}ºC`;
    feelsLikeDisplayed.innerHTML = `Feels like ${feelsLike}ºC`;
    windDisplayed.innerHTML = `Wind ${wind} km/h`;
    humidityDisplayed.innerHTML = `Humidity ${humidity}%`;
}

function searchCity(response) {
    let city = document.querySelector("#city-input").value;

    let apiKey = "dc8dede1ef33bea8aaa397f04b2d3b55";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(url);
    if (!city) {
        alert("Please insert a City");
    } else {
        axios.get(url).then(displayData);
    }
}

function getCurrentLocation(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let apiKey = "dc8dede1ef33bea8aaa397f04b2d3b55";

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
  `;
    console.log(url);

    axios.get(url).then(displayData);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
});

function displayInitialData(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let apiKey = "dc8dede1ef33bea8aaa397f04b2d3b55";

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
  `;
    console.log(url);

    axios.get(url).then(displayData);
}

navigator.geolocation.getCurrentPosition(displayInitialData);
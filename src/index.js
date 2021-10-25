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



function displayData(response) {
    console.log(response.data)


    let cityName = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let feelsLike = Math.round(response.data.main.feels_like);
    let wind = Math.round(response.data.wind.speed);
    let humidity = Math.round(response.data.main.humidity);
    let conditions = response.data.weather[0].main;
    let description = response.data.weather[0].description;
    let icon = response.data.weather[0].icon;

    let cityDisplayed = document.querySelector("#city-displayed");
    let temperatureDisplayed = document.querySelector("#temperature-displayed");
    let feelsLikeDisplayed = document.querySelector("#feels-displayed");
    let windDisplayed = document.querySelector("#wind-displayed");
    let humidityDisplayed = document.querySelector("#humidity-displayed");
    let conditionsDisplayed = document.querySelector("#weather-conditions");

    //Convert temperature Buttons // 

    let celsiusButton = document.querySelector("#celsius-button");
    let farenheitButton = document.querySelector("#fahrenheit-button");

    //Data display// 

    cityDisplayed.innerHTML = cityName;
    temperatureDisplayed.innerHTML = `${temperature}ºC`;
    feelsLikeDisplayed.innerHTML = `Feels like ${feelsLike}ºC`;
    windDisplayed.innerHTML = `Wind ${wind} km/h`;
    humidityDisplayed.innerHTML = `Humidity ${humidity}%`;
    conditionsDisplayed.innerHTML = `Current conditions: ${description.charAt(0).toUpperCase() + description.slice(1)}`;



    celsiusButton.addEventListener("click", function () {
        let temperatureDisplayed = document.querySelector("#temperature-displayed");

        temperatureDisplayed.innerHTML = `${temperature}ºC`;
        feelsLikeDisplayed.innerHTML = `Feels like ${feelsLike}ºC`;

    });

    farenheitButton.addEventListener("click", function () {
        let temperatureDisplayed = document.querySelector("#temperature-displayed");

        temperatureDisplayed.innerHTML = `${Math.round(temperature * 1.8 +32)}ºF`;
        feelsLikeDisplayed.innerHTML = `Feels like ${Math.round(feelsLike * 1.8 +32)}ºF`;

    });

    displayImage(icon);
    if (temperature < 0) {
        freezingTemperature()
    } else if (temperature <= 12 && temperature > 0) {
        coldTemperature()
    } else if (temperature > 12 && temperature <= 25) {
        mediumTemperature();
    } else if (temperature > 25) {
        hotTemperature();
    }

}

function searchCity() {
    let city = document.querySelector("#city-input").value;

    let apiKey = "dc8dede1ef33bea8aaa397f04b2d3b55";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

    axios.get(url).then(displayData);
}


function hotTemperature() {

    document.body.style.background = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";

    ;

    document.querySelector(".app-container").style.borderColor = "#cd4545";

    let h2 = document.querySelectorAll('h2');

    h2.forEach(element => {
        element.style.color = "#cd4545";
    });

    let h3 = document.querySelectorAll('h3');
    h3.forEach(element => {
        element.style.color = "#cd4545";
    });

    let h4 = document.querySelectorAll('h4');
    h4.forEach(element => {
        element.style.color = "#fff";
    });

    let h5 = document.querySelectorAll('h5');
    h5.forEach(element => {
        element.style.color = "#cd4545";
    });

    let button = document.querySelectorAll(".button");
    button.forEach(element => {
        element.style.backgroundColor = "#cd4545";
        element.style.borderColor = "#cd4545"
        element.addEventListener("mouseenter", function (event) {

            event.target.style.color = "#cd4545";
            event.target.style.backgroundColor = "#fff";


        });

        element.addEventListener("mouseleave", function (event) {

            event.target.style.color = "#fff";
            event.target.style.backgroundColor = "#cd4545";


        });

    });

    document.querySelector("#city-input").style.borderColor = "#cd4545";







}

function mediumTemperature() {

    document.body.style.background = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";


    document.querySelector(".app-container").style.borderColor = "#404969";

    let h2 = document.querySelectorAll('h2');

    h2.forEach(element => {
        element.style.color = "#404969";
    });

    let h3 = document.querySelectorAll('h3');
    h3.forEach(element => {
        element.style.color = "#404969";
    });

    let h4 = document.querySelectorAll('h4');
    h4.forEach(element => {
        element.style.color = "#404969";
    });

    let h5 = document.querySelectorAll('h5');
    h5.forEach(element => {
        element.style.color = "#404969";
    });

    let button = document.querySelectorAll(".button");
    button.forEach(element => {
        element.style.backgroundColor = "#ff7f50";
        element.style.borderColor = "#ff7f50"
        element.addEventListener("mouseenter", function (event) {

            event.target.style.color = "#ff7f50";
            event.target.style.backgroundColor = "#fff";


        });

        element.addEventListener("mouseleave", function (event) {

            event.target.style.color = "#fff";
            event.target.style.backgroundColor = "#ff7f50";


        });

    });

    document.querySelector("#city-input").style.borderColor = "#404969";
}



function coldTemperature() {


    document.body.style.background = "linear-gradient(178deg, rgba(201, 234, 252, 0.51) 14.9%, rgba(139, 192, 216, 0.73) 80%)"

    document.querySelector(".app-container").style.borderColor = "#056fc5";

    let h2 = document.querySelectorAll('h2');

    h2.forEach(element => {
        element.style.color = "#056fc5";
    });

    let h3 = document.querySelectorAll('h3');
    h3.forEach(element => {
        element.style.color = "#056fc5";
    });

    let h4 = document.querySelectorAll('h4');
    h4.forEach(element => {
        element.style.color = "#056fc5";
    });

    let h5 = document.querySelectorAll('h5');
    h5.forEach(element => {
        element.style.color = "#056fc5";
    });

    let button = document.querySelectorAll(".button");
    button.forEach(element => {
        element.style.backgroundColor = "#056fc5";
        element.style.borderColor = "#056fc5"
        element.addEventListener("mouseenter", function (event) {

            event.target.style.color = "#056fc5";
            event.target.style.backgroundColor = "#fff";


        });

        element.addEventListener("mouseleave", function (event) {

            event.target.style.color = "#fff";
            event.target.style.backgroundColor = "#056fc5";


        });

    });

    document.querySelector("#city-input").style.borderColor = "#056fc5";


}

function freezingTemperature() {

    document.body.style.background = "linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)";

    ;

    document.querySelector(".app-container").style.borderColor = "#393e46";

    let h2 = document.querySelectorAll('h2');

    h2.forEach(element => {
        element.style.color = "#393e46";
    });

    let h3 = document.querySelectorAll('h3');
    h3.forEach(element => {
        element.style.color = "#393e46";
    });

    let h4 = document.querySelectorAll('h4');
    h4.forEach(element => {
        element.style.color = "#929aab";
    });

    let h5 = document.querySelectorAll('h5');
    h5.forEach(element => {
        element.style.color = "#393e46";
    });

    let button = document.querySelectorAll(".button");
    button.forEach(element => {
        element.style.backgroundColor = "#393e46";
        element.style.borderColor = "#393e46"
        element.addEventListener("mouseenter", function (event) {

            event.target.style.color = "#393e46";
            event.target.style.backgroundColor = "#fff";


        });

        element.addEventListener("mouseleave", function (event) {

            event.target.style.color = "#fff";
            event.target.style.backgroundColor = "#393e46";


        });

    });

    document.querySelector("#city-input").style.borderColor = "#393e46";

}

function displayImage(icon) {

    let image = document.querySelector("#current-weather-image");
    image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    // if (conditions === "clear") {
    //     image.src = "src/images/1530392_weather_sun_sunny_temperature_icon.png"
    // }
    // if (conditions === "snow") {
    //     image.src = "src/images/1530370_weather_clouds_hail_hailstone_snow_icon.png"
    // }
    // if (conditions === "clouds") {
    //     image.src = "src/images/cloudy+fog+foggy+weather+icon-1320196634478143974_512.png"
    // }
    // if (conditions === "rain") {
    //     image.src = "src/images/1530362_weather_clouds_cloudy_forecast_rain_icon.png"
    // }
    // if (conditions === "thunder") {
    //     image.src = "src/images/1530363_weather_clouds_night_storm_icon.png"
    // }

}



navigator.geolocation.getCurrentPosition(displayInitialData);
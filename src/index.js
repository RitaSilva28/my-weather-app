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

    let sentence = `Last updated: ${hour}:${minutes}`;
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


function formatDay(timestamp) {

    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return weekDays[day]

}

function displayForecast(response) {
    console.log(response.data.daily)
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = "";
    let forecast = response.data.daily
    forecast.shift();

    forecast.forEach(function (forecastDay, index) {
        let minTemp = Math.round(forecastDay.temp.min);
        let maxTemp = Math.round(forecastDay.temp.max);
        let icon = forecastDay.weather[0].icon;

        forecastHTML = forecastHTML + `	
						<div class="col">
							<h5 class="week-day">${formatDay(forecastDay.dt)}</h5>
							<img
								class="weekday-temp-image"
								src="https://openweathermap.org/img/wn/${icon}@2x.png"
								alt="cloudy weather icon"
							/>
							<h3 class="weekday-max-temp">${maxTemp}º</h3>

							<h4 class="weekday-min-temp">${minTemp}º</h4>
					
					</div>`;
    })





    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {

    let apiKey = "dc8dede1ef33bea8aaa397f04b2d3b55";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(displayForecast);



}


function displayData(response) {
    console.log(response.data)

    getForecast(response.data.coord);


    let cityName = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let feelsLike = Math.round(response.data.main.feels_like);
    let wind = response.data.wind.speed;
    let humidity = Math.round(response.data.main.humidity);
    let description = response.data.weather[0].description;
    let icon = response.data.weather[0].icon;

    let cityDisplayed = document.querySelector("#city-displayed");
    let temperatureDisplayed = document.querySelector("#temperature-displayed");
    let feelsLikeDisplayed = document.querySelector("#feels-displayed");
    let windDisplayed = document.querySelector("#wind-displayed");
    let humidityDisplayed = document.querySelector("#humidity-displayed");
    let conditionsDisplayed = document.querySelector("#weather-conditions");


    //Data display// 


    cityDisplayed.innerHTML = cityName;
    temperatureDisplayed.innerHTML = `${temperature}ºC`;
    feelsLikeDisplayed.innerHTML = `Feels like ${feelsLike}ºC`;
    windDisplayed.innerHTML = `Wind ${wind} km/h`;
    humidityDisplayed.innerHTML = `Humidity ${humidity}%`;
    conditionsDisplayed.innerHTML = `Current conditions: ${description.charAt(0).toUpperCase() + description.slice(1)}`;






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

let cityInput = document.querySelector("#city-input")
cityInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchCity();
    }
});

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

}



navigator.geolocation.getCurrentPosition(displayInitialData);
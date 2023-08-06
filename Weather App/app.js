// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0


//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");                  //Selection of elements using Javascript querySelector.
const tempElement = document.querySelector(".temperature-value p");           //Argument - class-name.
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//APP DATA
const weather = {};                                                           //We create objects to store API Data.
weather.temperature = {
    unit: "celsius"
}

//APP CONSTS AND VARS
const KELVIN = 273;
//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//CHECK IF BROWSER SUPPORTS GEOLOCATION 
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser dosen't Support Geolocation</p>";
}

//SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";                                  //Element is made visible.
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//GET WEATHER FROM API PROVIDER 

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;    //API Link to fetch weather details

    fetch(api)                                                                      //Requesting the API.
        .then(function (response) {
            let data = response.json();                                            //data - object
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);         //Conversion of temp into Celsius.
            weather.description = data.weather[0].description;                       //0 is the index of array weather.
            weather.iconId = data.weather[0].icon;                                 //Fetching temp
            weather.city = data.name;                                              //Fetching city
            weather.country = data.sys.country;                                    //Fetching country
        })
        .then(function () {
            displayWeather();                                                      //Update the weather.
        })

    //DISPLAY WEATHER TO UI                                                             //Function is defined.
    function displayWeather() {
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;            //Here, we change the innerHTML of each element based on the data 
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;         // and ${object,property}
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;

    }

    // C to F conservation 

    function celsiusToFahrenheit(temperature) {                                        //Function.
        return (temperature * 9 / 5) + 32;                                             //Conversion of temp into Fahrenheit.
    }

    //WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
    tempElement.addEventListener("click", function () {                                 //On click, it changes the temp to Fahrenheit.
        if (weather.temperature.value === undefined) return;

        if (weather.temperature.unit == "celsius") {
            let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit)
            tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
            weather.temperature.unit == "fahrenheit";
        }
        else {
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
            weather.temperature.unit == "celsius"
        }
    })
}


//ICON
//TEMP AND UNIT
//DESCRIPTION
//LOCATION

// In HTML, we have created a container to contain all the elements.
// We have the following elements - 
// Name of the app, notifications, icon, temperature value, temperature description and location.
// While executing we will change our page's inner HTML by the API response.

//To change HTML using javascript, we need to create the elements (Line 6)

//We store data of API using an object. (Line 12)

//According to the data, we change the innerHTML of the page by using the elements we created and the objects which store data. (Line 69)

//We will use this again and again so we define a function. (Line 67)

//The API returns the temperature in Kelvin , so we convert it in Celsius. (Line 57)

//Conversion to Fahrenheit. (Line 78)

//We check whether the user ha sclicked, so we return the temp in Fahrenheit units. (Line 83)

//To find users location, we use the geographic coordinates.

//We use Get Current Position to get the location of the user. It has 2 arguments - SetPosition and showError. (Line 25)
//Set Position is for getting the latitude and longitude and ShowError is for getting the error. (Line 33 and 41)
//Set Position also uses the getWeather function. (Line 48)

//We use openWeatherMap API to fetch weather data. Line 49 fetches the weather details.

//The function get Weather completes the part of fetching , calculation , updation of the weather in the page (Line 59 , Line 57 , Line 64).
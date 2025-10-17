document.addEventListener("DOMContentLoaded", () => {
  // First of all, we will grab all the elements with their id's so that it will be convenient.

  const cityInput = document.getElementById("city-input");
  const getWeatherbtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityTemperature = document.getElementById("temperature");
  const cityTemperatureDescription = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const information = document.getElementById("visible");
  const box1 = document.getElementById("first");
  const box2 = document.getElementById("second");
  const box3 = document.getElementById("third");
  const box4 = document.getElementById("fourth");
  const box5 = document.getElementById("fifth");
  const rain = document.getElementById("hello");

  const API_KEY = "e56c6c9cc6e50c059b168ea1b2dd509d"; // gonna store the api key since we are going to need that a lot here, so storing it in another variable will be convenient.

  /* OK, so what we want to do :-  we want that when someone clicks the button, I have to grab some data.
   */
  getWeatherbtn.addEventListener("click", () => {
    information.classList.remove("appear");
  });

  getWeatherbtn.addEventListener("click", async () => {
    // whenever someone clicks on the button, I want to grab the city input data in the input field.(in simpler terms what we are writing in the input field).

    const city = cityInput.value.trim(); // so that extra space is removed.
    if (!city) return; // if no input is given it will return. note to remember "" or empty strings are considered a false value in javascript.

    // We are gonna now make functions to fetch the weather data and display the weather data, since right now we have no way to make the web requests.

    /*
ALWAYS REMEMBER THESE TWO THINGS WHENEVER YOU ARE MAKING A WEB REQUEST ---
    1. The server may throw some error 
    2. The server is always in another continent
*/

    // therefore we are gonna use try&catch.

    try {
      const weatherdata = await fetchWeatherdata(city);
      displayWeatherData(weatherdata);

      // we are going to fetch the weather data from the server and store it in the variable named 'weatherdata', we will then call the function displayWeatherData.
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherdata(city) {
    // gets the weather data on the provided city.

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url); // this is an object(datatype) and it is a promise.
      console.log(typeof response);
      console.log("RESPONSE:", response);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("ERROR:", err.message);
      return { error: err.message };
    }
  }

  function displayWeatherData(data) {
    // displays the data.
    console.log(data);

    const { main, weather, visibility, wind } = data; // the "name", "main" and "weather" is taken from the displayweatherdata object. you can check it in the console if you log "data".

    cityTemperature.textContent = main.temp + `°`;
    cityTemperatureDescription.textContent =
      weather[0].description;

    box1.textContent = `Max Temp: ${main.temp_max}`;
    box2.textContent = `Min Temp: ${main.temp_min}`;
    box3.textContent = `Visibility: ${visibility}`;
    box4.textContent = `feels like: ${main.feels_like}`;
    box5.textContent = `Wind speed: ${wind.speed} knots`;

    const weatherClassMap = {
      Rain: "rainy",
      Sunny: "sunny",
      Haze: "haze",
      Clouds: "clouds",
      Clear: "clear",
      Snow: "snow",
    };

    rain.className = ""; // clear all old, rain here refers to body.(its theid)
    rain.classList.add(weatherClassMap[weather[0].main] || "default");

    //unlocking the display because right now it wont display on the webpage.
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden"); // we will remove the hidden class from the weatherInfo to get
    errorMessage.classList.add("hidden");
  }
});

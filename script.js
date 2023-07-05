const apiKey = "06749fe30c18e7dfb4329c7f75e760bc";
var currentWeatherEl = document.querySelector("#current-weather");
var fiveDayEl = document.querySelector("#five-day");
var searchButton = document.querySelector("#search-btn");
var historyBlock = document.querySelector("#hist");
var savedCities = [ ]

//set the API key as a function to use for all API calls
// use async functions for the weather APIs
//use dayjs to format the date
//dayjs(data.dt_txt).format("M/D h:mm a")
//save search history
//need the get coordinates api
//need the current weather api (replace locationo I think with weather)
//var date = dayjs(data.dt_txt).format("M/D h:mm a");

function renderHistory (cityInfo){
  var historyItem = JSON.parse(localStorage.getItem("history"))
  historyBlock.innerHTML = ""
    if (historyItem) {
      for (let i = 0; i < historyItem.length; i++) {
        var historyEl = document.createElement("button")
        historyEl.innerHTML = historyItem[i].name
        historyBlock.appendChild(historyEl);
        historyEl.addEventListener("click", function() {
          var newInput = document.getElementById("city-input")
          newInput.value = historyItem[i].name
          getCoordinates();
          
              })
        
          }
        
        }
      
      }

  


function getForecast(lat, lon){
    const api = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
        fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
          // var dayOne = data.list[0]
        
          
          for (var i = 0; i < data.list.length; i=i+8) {
            var forecastBlock = document.createElement('div');
            var dateEl = document.createElement('div');
            var forecastDate = data.list[i].dt_txt;
            var today = dayjs(forecastDate).format("dddd, MM-DD-YYYY");
            dateEl.textContent = today;
            var tempEl = document.createElement('div');
            var forecastTemp = 'Temp: ' + data.list[i].main.temp + '\u00B0F'
            tempEl.textContent = forecastTemp;
            var windEl = document.createElement('div');
            var forecastWind = 'Wind: ' + data.list[i].wind.speed + 'mph'
            windEl.textContent = forecastWind;
            forecastBlock.appendChild(dateEl);
            forecastBlock.appendChild(tempEl);
            forecastBlock.appendChild(windEl);
            forecastBlock.classList.add("forecast");
            forecastBlock.classList.add("card");

            fiveDayEl.appendChild(forecastBlock);
            
          }
        
          });
        } else {
          alert("Error");
        }
      });
};
function getCurrentWeather (lat, lon){
 const api = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
 fetch(api).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
      var currentWeatherBlock = document.createElement('div');
      var nameEl = document.createElement('div');
      nameEl.textContent = data.name
      var feelEl = document.createElement('div');
      var feelsLike = 'Feels Like: ' + data.main.feels_like + '\u00B0F'
      feelEl.textContent = feelsLike;
      var tempEl = document.createElement('div');
      var currentTemp = 'Current Temp: ' + data.main.temp + '\u00B0F'
      tempEl.textContent = currentTemp;
      var windEl = document.createElement('div');
      var windSpeed = 'Wind: ' + data.wind.speed + 'mph';
      windEl.textContent = windSpeed;
      currentWeatherEl.appendChild(currentWeatherBlock);
      currentWeatherBlock.appendChild(nameEl);
      currentWeatherBlock.appendChild(feelEl);
      currentWeatherBlock.appendChild(tempEl);
      currentWeatherBlock.appendChild(windEl);
      currentWeatherBlock.classList.add("current");
      currentWeatherBlock.classList.add("card");
      })
    }
})
};

//need to make a function that saves the city name and coordinates to local storage

function setHistory (cityInput, lat, lon) {
  let cityInfo = {
    "name":cityInput,
    "lat":lat,
    "lon":lon
  }
  savedCities.push(cityInfo)
   localStorage.setItem("history", JSON.stringify(savedCities));
};


//changed this to https
function getCoordinates(){
    var cityInput = document.getElementById("city-input").value 
    const api = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + apiKey
    currentWeatherEl.innerHTML = ""
    fiveDayEl.innerHTML = ""
        //get value from input
    fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
         var lat = data[0].lat
         var lon = data[0].lon
         getForecast(lat, lon)
         getCurrentWeather(lat, lon)
         setHistory(cityInput, lat, lon)
         renderHistory()
         
          });
        } else {
          alert("Please type a city");
        }
        
      });
}


searchButton.addEventListener("click", getCoordinates);
//For each button I want this function to take the innerHTML of the button
//which is the name from local storage, and also the lat and long for that
//name and put that info back into the getCoordinates function and display it



  
  


const apiKey = "06749fe30c18e7dfb4329c7f75e760bc";

var currentWeatherEl = document.querySelector("#current-weather");
var fiveDayEl = document.querySelector("#five-day");
var searchButton = document.querySelector("#search-btn");
 
//set the API key as a function to use for all API calls
// use async functions for the weather APIs
//use dayjs to format the date
//dayjs(data.dt_txt).format("M/D h:mm a")
//save search history
//need the get coordinates api
//need the current weather api (replace locationo I think with weather)
//var date = dayjs(data.dt_txt).format("M/D h:mm a");

function getForecast(lat, lon){
    const api = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
        fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
          var dayOne = data.list[0]
          console.log(dayOne);
          
          for (var i = 0; i < data.list.length; i=i+8) {
            var forecastBlock = document.createElement('div');
            var dateEl = document.createElement('div');
            dateEl.textContent = data.list[i].dt_txt;
            var tempEl = document.createElement('div');
            tempEl.textContent = 'Temp:' + data.list[i].main.temp
            var windEl = document.createElement('div');
            windEl.textContent = 'Wind:' + data.list[i].wind.speed
            forecastBlock.appendChild(dateEl);
            forecastBlock.appendChild(tempEl);
            forecastBlock.appendChild(windEl);
            fiveDayEl.appendChild(forecastBlock)
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
      feelEl.textContent = data.main.feels_like;
      var tempEl = document.createElement('div');
      tempEl.textContent = data.main.temp;
      var windEl = document.createElement('div');
      windEl.textContent = data.wind.speed;
      currentWeatherEl.appendChild(currentWeatherBlock);
      currentWeatherBlock.appendChild(nameEl);
      currentWeatherBlock.appendChild(feelEl);
      currentWeatherBlock.appendChild(tempEl);
      currentWeatherBlock.appendChild(windEl);
      console.log(data);
      })
    }
})
};
    

function getCoordinates(){
    var cityInput = document.getElementById("city-input").value 
    const api = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + apiKey
        //get value from input
    fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
         var lat = data[0].lat
         var lon = data[0].lon
         getForecast(lat, lon)
         getCurrentWeather(lat, lon)
         var stateEl = document.createElement('div');
         //include the state next to the city
         console.log(data);
          });
        } else {
          alert("Please type a city");
        }
        
      });
}


searchButton.addEventListener("click", getCoordinates);

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


function getForecast(lat, lon){
    const api = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
        fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
         
          var dayOne = data.list[0]
          var dayTwo = data.list[8]
          var dayThree = data.list[16]
          var dayFour = data.list[24]
          var dayFive = data.list[32]
          console.log(dayOne);
          for (var i = 0; i < data.list.length; i=i+8) {
            var wrapper = document.createElement('div');

            var dateEl = document.createElement('div');
            dateEl.textContent = 'Date: ' + data.list[i].dt_txt;
            var tempEl = document.createElement('div');
            tempEl.textContent = 'Temp:' + data.list[i].main.temp
            var windEl = document.createElement('div');
            windEl.textContent = 'Wind:' + data.list[i].wind.speed
            wrapper.appendChild(dateEl);
            wrapper.appendChild(tempEl);
            wrapper.appendChild(windEl);
            fiveDayEl.appendChild(wrapper)
          }
          });
        } else {
          alert("Please type a city");
        }
      });
};

function getCoordinates(){
    var cityInput = document.getElementById("city-input").value 
    const api = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + apiKey
        //get value from input
    fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
         var lat = data[0].lat
         var lon = data[0].lon
         getForecast(lat, lon)
          });
        } else {
          alert("Please type a city");
        }
      });
}


searchButton.addEventListener("click", getCoordinates);

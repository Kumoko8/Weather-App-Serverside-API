const apiKey = "06749fe30c18e7dfb4329c7f75e760bc"

//set the API key as a function to use for all API calls
// use async functions for the weather APIs
//use dayjs to format the date
//dayjs(data.dt_txt).format("M/D h:mm a")
//save search history
//need the get coordinates api
//need the current weather api (replace locationo I think with weather)

var searchButton = $("#search-btn")

searchButton.addEventListener('click', function (){});


async function getForecast(){
    const api = "api.openweathermap.org/data/2.5/weather?q=" + location + apiKey
}
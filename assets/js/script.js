var searchBut= $("#searchBtn");
var APIKey= 'e16523d04c63d1ae7214ce72c3259465'
var city= $('#city')
const icons= $('#currentIcon')
const temp= $('#temp');
const wind= $('#wind');
const humid= $('#humid');
const uv= $('#uv');

$(searchBut).on('click', function (event) {
    event.preventDefault();
    var searchedCity= $('#enterCity').val().trim();
    var geoAPI= 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&appid=e16523d04c63d1ae7214ce72c3259465';
    fetch(geoAPI)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            var long = data[0].lon;
            var lat = data[0].lat;
            var WeatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&exclude=hourly,minutely&appid=' + APIKey;
            $(city).text(data[0].name + ', ' + data[0].state)

            fetch(WeatherAPI)
                .then(response => response.json())
                .then(function (data) {
                    console.log(data);
                    $(icons).attr("src", 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png');
                    $(uv).text('UV index: ' + data.current.uvi);
                    $(temp).text('Temp: ' + data.current.temp + '\u00B0' + 'F');
                    $(wind).text('Wind: ' + data.current.wind_speed + 'MPH');
                    $(humid).text('Humidity: ' + data.current.humidity + '%');

                for(i = 1; i < 6; i++) {
                    var 
                }
                })
        })
})

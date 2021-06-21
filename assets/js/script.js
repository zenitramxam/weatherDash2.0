var searchBut= $("#searchBtn");
var APIKey= 'e16523d04c63d1ae7214ce72c3259465'
var city= $('#city')
const icon= $('#currentIcon')
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

            localStorage.setItem('city', JSON.stringify(searchedCity));

            var long = data[0].lon;
            var lat = data[0].lat;
            var WeatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&exclude=hourly,minutely&appid=' + APIKey;
            $(city).text(data[0].name + ', ' + data[0].state)

            fetch(WeatherAPI)
                .then(response => response.json())
                .then(function (data) {
                    console.log(data);
                    $(icon).attr("src", 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png');
                    $(uv).text('UV index: ' + data.current.uvi);
                    $(temp).text('Temp: ' + data.current.temp + '\u00B0' + 'F');
                    $(wind).text('Wind: ' + data.current.wind_speed + 'MPH');
                    $(humid).text('Humidity: ' + data.current.humidity + '%');

                for(i = 1; i < 6; i++) {
                  icon[i]= document.getElementById('icon' + i);
                    $(icon[i]).attr("src", 'https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png');
                  temp[i]= document.getElementById('temp' + i);
                    $(temp[i]).text('Temp: ' + data.daily[i].temp.day + '\u00B0' + 'F');
                  wind[i]= document.getElementById('wind' + i);
                    $(wind[i]).text('Wind: ' + data.daily[i].wind_speed + 'MPH');
                  humid[i]= document.getElementById('humid' + i)
                    $(humid[i]).text('Humidity: ' + data.daily[i].humidity + '%');
                  var date= document.getElementById('date' + i);
                  $(date).text(moment().add(i, 'days').format('l'));
                }
                })
        })
});
/*
$(searchBut).on('click', function(event) {
    event.preventDefault();
      var createButton = document
})
*/
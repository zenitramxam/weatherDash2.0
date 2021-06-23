var searchBut= $("#searchBtn");
var APIKey= 'e16523d04c63d1ae7214ce72c3259465'
var city= $('#city')
const icon= $('#currentIcon')
const temp= $('#temp');
const wind= $('#wind');
const humid= $('#humid');
const uv= $('#uv');
//var searchedCity= $('#enterCity');
/*
var cities= [];
cities.push(JSON.parse(localStorage.getItem('previous')));
localStorage.setItem("previous", JSON.stringify(cities));
//cityhiss();
/*
renderCities();
/*
function renderCities() {
  var lastCity= JSON.parse(localStorage.getItem("cities"));
  if (lastCity !== null) {
    console.log(cities)
  }
}
/*
var preCities= localStorage.getItem("city");
console.log(preCities)
localStorage.setItem("cities2", JSON.stringify())
*/
var searchedCity= $('#enterCity').val().trim();


$(searchBut).on('click', function (event) {
    event.preventDefault();
    var searchedCity= $('#enterCity').val().trim();
    let citiesArr= [];
    let cities= {searchedCity};
    
    if(!localStorage.getItem('Previous')) {
      citiesArr.push(cities);
      localStorage.setItem('Previous', JSON.stringify(citiesArr));
      JSON.parse(localStorage.getItem('Previous'));
      
    } else {
      citiesArr = JSON.parse(localStorage.getItem('Previous'));
      citiesArr.push(cities);
      localStorage.setItem('Previous', JSON.stringify(citiesArr));
      JSON.parse(localStorage.getItem("Previous"));
      
    }
    /*
    localStorage.setItem('cities', JSON.stringify(searchedCity))
  
    var storeCity= localStorage.getItem('cities');
    var butt = document.createElement('button');
    butt.innerHTML = storeCity
    butt.setAttribute('id', 'newBut')
    document.getElementById("areaa").appendChild(butt);
    */
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
                    $(icon).attr("src", 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png');
                    $(uv).text('UV index: ' + data.current.uvi);
                    $(temp).text('Temp: ' + data.current.temp + '\u00B0' + 'F');
                    $(wind).text('Wind: ' + data.current.wind_speed + 'MPH');
                    $(humid).text('Humidity: ' + data.current.humidity + '%');

                for(i = 1; i < 6; i++) {
                  icon[i]= $('#icon' + i);
                    $(icon[i]).attr("src", 'https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png');
                  temp[i]= $('#temp' + i);
                    $(temp[i]).text('Temp: ' + data.daily[i].temp.day + '\u00B0' + 'F');
                  wind[i]= $('#wind' + i);
                    $(wind[i]).text('Wind: ' + data.daily[i].wind_speed + 'MPH');
                  humid[i]= $('#humid' + i)
                    $(humid[i]).text('Humidity: ' + data.daily[i].humidity + '%');
                  var date= $('#date' + i);
                  $(date).text(moment().add(i, 'days').format('l'));
                }
                })
        })
});


$('#past').on("click", function() {
    alert("this action has not yet been completed")
})
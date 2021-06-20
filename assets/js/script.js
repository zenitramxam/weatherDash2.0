var searchBut= $("#searchBtn");
var APIKey= 'e16523d04c63d1ae7214ce72c3259465'
var city= $('#city')

$(searchBut).on('click', function (event) {
    event.preventDefault();
    var searchedCity= $('#enterCity').val().trim();
    var geoAPI= 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&appid=e16523d04c63d1ae7214ce72c3259465';
    fetch(geoAPI)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            var long= data[0].lon;
            var lat= data[0].lat;
            var searchWeath = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&exclude=hourly,minutely&appid' + APIKey;
            $(city).text(data[0].name + ', ' + data[0].state)
        })
})

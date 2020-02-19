 function searchCity() {
    if (this.id === "search-button") {
        var cityName = $("#city-search").val();
        var newLi = $("<li>");
        newLi.append("<button>" + $("#city-search").val() + "</button>");
        $("#recent-search").prepend(newLi);
    }else {
        var cityName = $(this).text();
    }
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&ctn=5&appid=e17b00c614d03406b9f9fd051281337c";
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function(response) {
         var newCity = $("<div>");
         newCity.append($("<h3>" + response.name + "</h3>"));
         newCity.append($("<p>" + moment().format("MMM Do YYYY") + "</p>"));
         newCity.append($("<img src='https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>"));
         var tempF = Math.ceil((response.main.temp - 273.15) * 9/5 + 32);
         newCity.append($("<p> Temperature (F): " + tempF + "</p>"));
         newCity.append($("<p> Humidity: " + response.main.humidity + "</p>"));
         newCity.append($("<p> Wind: " + response.wind.speed + " MPH</p>"));
         $("#main-section").prepend(newCity);
         newCity.attr("class", "city-weather");
     });
};

$("#aside-search").on("click", "button", searchCity);
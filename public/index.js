var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);
  
  var countries = [];

  var container = document.getElementById('main-map');
  var center = {lat: 56.49, lng: -4.2};
  var mainMap = new MapWrapper(container, center, 5);
  mainMap.addMarker(center);

  var selectBox = document.querySelector('select');
  selectBox.onchange = handleSelectChanged;
  var geoButton = document.querySelector('#geo-button');
  geoButton.onclick = geoFindMe;
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function() {
  if (this.status != 200) return;

  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateList(countries);
}

var populateList = function(allCountries) {
  var select = document.getElementById('country-list');
  for (i = 0; i < allCountries.length; i++) {
    var option = document.createElement('option');
    var country = allCountries[i];
    option.innerText = country.name;
    option.value = i;
    select.appendChild(option);
  }
}

var handleSelectChanged = function( event ) {
  console.log( event.target.value );
  var country = countries[event.target.value];
  var pTag = document.querySelector('#select-result');
  pTag.innerText = "Country: " + country.name + "\nCapital city: " + country.capital + "\nPopulation: " + country.population;
  var countrystring = JSON.stringify(country);
  localStorage.selection = countrystring;
  var container = document.getElementById('main-map');
  var latitude  = country.latlng[0];
  var longitude = country.latlng[1];

  container.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

  var location = {lat: latitude, lng: longitude};
  var mainMap = new MapWrapper(container, location, 5);
  mainMap.addMarker(location);
}

var geoFindMe = function() {
  var container = document.getElementById('main-map');
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    container.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var location = {lat: latitude, lng: longitude};
    var mainMap = new MapWrapper(container, location, 10);
    mainMap.addMarker(location);
  }
  function error() {
    container.innerHTML = "Unable to retrieve your location";
  }
  container.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}

// var mapCountryLocation = function(event) {
//   console.log(event.target.value);
// }

window.onload = app;
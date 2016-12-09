var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all'
  makeRequest(url, requestComplete);
  var countries = [];

  var selectBox = document.querySelector('select');
  selectBox.onchange = handleSelectChanged;
}

var makeRequest = function(url, callback) {
  //create a new XMLHttpRequest
  var request = new XMLHttpRequest();
  // open the request and tell it what method we want to use
  request.open("GET", url);
  // set the callback we want to run when complete
  request.onload = callback;
  // send the request
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
    option.innerText = "Country: " + country.name;
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
}


window.onload = app;
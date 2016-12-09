var MapWrapper = function(container, center, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addMarker: function(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
  },

  addClickEvent: function() {
    google.maps.event.addListener(this.googleMap, 'click', function(event) {
      // var easyPosition = event.latLng;
      var position = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      this.addMarker(position);
    }.bind(this));
  }
}
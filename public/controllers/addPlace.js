angular.module('MyApp')
  .controller('AddPlaceCtrl', ['$scope', '$alert', 'PlaceService', function($scope, $alert, PlaceService) {
    var lat;
    var lon;
    $scope.addPlace = function() {
      PlaceService.savePlace({
          name: $scope.name,
          description: $scope.description,
          timeOpen: $scope.timeOpen,
          timeClose: $scope.timeClose, 
          latitude: lat,
          longitude: lon,
          user: $scope.currentUser
      });
    };
    var currentMarker;
    function initialize() {

      var markers = [];
      
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      currentMarker = new google.maps.Marker({
        position: new google.maps.LatLng(23.634501,-102.552784),
        map: map,
        draggable:true
      });
      var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(14.5333037, -118.36443),
          new google.maps.LatLng(32.7187629, -86.7105711));
      map.fitBounds(defaultBounds);

      // Create the search box and link it to the UI element.
      var input = /** @type {HTMLInputElement} */(
          document.getElementById('pac-input'));
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {

          // Create a marker for each place.

          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
            icon: 'images/icon-marker.png'
          });
          marker.content = "<div style='line-height: 1.35; overflow: hidden; white-space: nowrap;'><strong>"+place.name+"</strong></div>";
          var infowindow = new google.maps.InfoWindow();
          google.maps.event.addListener(marker, 'click', (function(marker, currentMarker) {  
           return function() {  
              infowindow.setContent(this.content);
              infowindow.open(this.getMap(), currentMarker);
              currentMarker.setPosition(this.position);
              lat = currentMarker.position.k;
              lon = currentMarker.position.B;
             //console.log(currentMarker);
           }  
         })(marker, currentMarker)); 
          google.maps.event.addListener(currentMarker, 'dragstart', function() { 
            infowindow.close(); 
          } );
          if(i==0){
            console.log(place);
            currentMarker.setPosition(marker.position);
            lat = currentMarker.position.k;
            lon = currentMarker.position.B;
            infowindow.close();
          }

          markers.push(marker);

          bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
      });

      // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.
      google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
    }
    $(document).ready(function(){
      initialize();
    })
    
  }]);

angular.module('MyApp')
  .controller('MapCtrl', ['$scope', '$rootScope', 'Place', function($scope, $rootScope, Place) {
    /*$scope.map = {center: {latitude: 24.0, longitude: -102.3667 }, zoom: 5 };
    $scope.options = {scrollwheel: true};

    $scope.pMarkers = [];


    var createMarker = function(info, i, idKey){

        //console.log(info);

         var ret = new google.maps.Marker({
            latitude: info.latitude,
            longitude: info.longitude,
            title: info.name,
            content: info.description,
            link: '/location/'+info._id,
            show: false
        });

        ret.onClick = function() {
            console.log("Click");
            ret.show = !ret.show;
            console.log(ret.title+"\n"+ret.content+"\nshowWindow: "+ ret.show);
        };
        

        ret["id"] = i;
        console.log(ret["id"]+ " "+i);

        return ret;

    }

    var markerList = [];
    

   var places = Place.query(function(){
        
        for (i = 0; i < places.length; i++){
            console.log(places[i]);
            markerList.push(createMarker(places[i], i, places[i]._id));

        }
    });

   var delay=10;//1 seconds
    setTimeout(function(){console.log("wait");
 $scope.pMarkers = markerList;},delay); 
*/  var markers = [];
    var infowindow = new google.maps.InfoWindow();
    function createMarker(place, map){
        var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: new google.maps.LatLng(place.latitude, place.longitude)
          });
          marker.content = "<div style='line-height: 1.35; overflow: hidden; white-space: nowrap;'>"+
                                "<strong>"+place.name+"</strong>"+
                                "<p>"+place.description+"</p>"+
                                "<a href='location/"+place._id+"' style='color:red;'>See more details</a>"+
                            "</div>";
          
          google.maps.event.addListener(marker, 'click', function() {  
           
              infowindow.setContent(this.content);
              this.getMap().panTo(this.getPosition());
              infowindow.open(this.getMap(), this);
              this.getMap().setZoom(8);
              
           
         }); 
          markers.push(marker);
    }

    function initialize() {
      
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(24, -102.3667), 
        zoom: 5
      });


      // Create the search box and link it to the UI element.
      var places = Place.query(function(){
        
        for (i = 0; i < places.length; i++){
            createMarker(places[i],map)

        }
    });
    }
    google.maps.event.addDomListener(window, 'load', initialize(location));
  }]);
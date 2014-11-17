angular.module('MyApp')
  .controller('MapCtrl', ['$scope', '$rootScope', 'Place', function($scope, $rootScope, Place) {
    $scope.map = {center: {latitude: 24.0, longitude: -102.3667 }, zoom: 5 };
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
            //$scope.$apply();
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

  


    

   /*$scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }*/

  }]);
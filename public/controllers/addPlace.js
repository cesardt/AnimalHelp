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
    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
    
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          lat = marker.getPosition().lat();
          lon = marker.getPosition().lng();
        }
      }
    };
  }]);

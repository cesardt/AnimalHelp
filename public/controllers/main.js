angular.module('MyApp')
.controller('MainCtrl', ['$scope', function($scope) {
  $scope.redirectTo = function(location){

    window.location = window.location + location;



  }
}]);
angular.module('MyApp')
.controller('LocationDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Place',
	function($scope, $rootScope, $routeParams, Place) {
		Place.get({ _id: $routeParams.id }, function(place) {
			$scope.place = place;
			console.log($scope.place);
			console.log($rootScope.currentUser);
		});
	}]);

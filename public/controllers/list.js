angular.module('MyApp')
.controller('ListCtrl',['$scope', 'Pet', '$rootScope',
	function($scope, Pet, $rootScope){
		
		$scope.pets = Pet.query();

		$scope.filterSpecies = function(species){
			$scope.pets = Pet.query({species: species})
		};

	}]);
angular.module('MyApp')
.controller('ListCtrl',['$scope', 'Pet', '$rootScope',
	function($scope, Pet, $rootScope){

		$scope.allSpecies = ['Dog', 'Cat', 'Ferret','Cathy Perry'];

		$scope.species = "";
		
		$scope.pets = Pet.query();
		$scope.filterBySpecies = function(species){
			$scope.pets = Pet.query({species: species})
		};

	}]);
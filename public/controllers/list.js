angular.module('MyApp')
.controller('ListCtrl',['$scope', 'Pet', '$rootScope',
	function($scope, Pet, $rootScope){
		
		$scope.allSpecies = ['Dog', 'Cat', 'Ferret','Cathy Perry'];
		$scope.sizes = ['Very Small','Small','Medium','Large','Very Large'];

		$scope.species = "";
		$scope.size = "";
		
		$scope.pets = Pet.query();

		$scope.filter = function(){
			$scope.pets = Pet.query({species: $scope.species, size: $scope.size});
		}
	}]);
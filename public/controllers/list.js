angular.module('MyApp')
.controller('ListCtrl',['$scope', 'Pet', 'City','$rootScope',
	function($scope, Pet, City, $rootScope){
		
		$scope.allSpecies = ['Dog', 'Cat', 'Ferret','Cathy Perry'];
		$scope.sizes = ['Very Small','Small','Medium','Large','Very Large'];
		$scope.states =["Aguascalientes",
						"Baja California",
						"Baja California Sur",
						"Campeche",
						"Coahuila de Zaragoza",
						"Colima",
						"Chiapas",
						"Chihuahua",
						"Distrito Federal",
						"Durango",
						"Guanajuato",
						"Guerrero",
						"Hidalgo",
						"Jalisco",
						"Mexico",
						"Michoacan de Ocampo",
						"Morelos",
						"Nayarit",
						"Nuevo Leon",
						"Oaxaca",
						"Puebla",
						"Queretaro",
						"Quintana Roo",
						"San Luis Potosi",
						"Sinaloa",
						"Sonora",
						"Tabasco",
						"Tamaulipas",
						"Tlaxcala",
						"Veracruz de Ignacio de la Llave",
						"Yucatan",
						"Zacatecas"];
		
		$scope.pets = Pet.query();

		$scope.filter = function(){
			var city = '';
			if($scope.city){
				city = $scope.city.city;
			}
			$scope.pets = Pet.query({species: $scope.species, size: $scope.size, state: $scope.state, city: city});
		}

		$scope.filterCities = function(){
			$scope.cities = City.query({state : $scope.state});
			$scope.pets = Pet.query({state: $scope.state});
		}

	}]);
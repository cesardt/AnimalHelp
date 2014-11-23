var pictures;
angular.module('MyApp')
  .controller('AddPetCtrl', ['$scope', '$alert', 'PetService', 'City' ,'$rootScope',  function($scope, $alert, PetService, City, $rootScope) {
    var user = $rootScope.currentUser;
    var pictures = [];

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


    $scope.onFileSelect = function($files) {
      pictures = $files;
    }
    $scope.addPet = function() {
 
      PetService.savePet({
          name: $scope.name,
          species: $scope.species,
          description: $scope.description,
          size: $scope.size,
          city: $scope.city.city,
          state: $scope.state,
          user: user,
          pictures: pictures
      }); 
    };

    $scope.filterCities = function(){
      $scope.cities = City.query({state : $scope.state});
    }

  }]);
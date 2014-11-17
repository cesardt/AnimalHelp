angular.module('MyApp')
  .controller('AddPetCtrl', ['$scope', '$alert', 'PetService', '$rootScope', 'FileUploader', function($scope, $alert, PetService, $rootScope, FileUploader) {
var user = $rootScope.currentUser;
$scope.pictures = new FileUploader();
    $scope.addPet = function() {

      PetService.savePet({
          name: $scope.name,
          species: $scope.species,
          description: $scope.description,
          size: $scope.size,
          location: $scope.location,
          user: user,
          pictures: $scope.pictures.queue
      }); 
    };
  }]);
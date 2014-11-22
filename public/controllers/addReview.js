var pictures;
angular.module('MyApp')
  .controller('AddReviewCtrl', ['$scope', '$alert', 'PetService', '$rootScope',  function($scope, $alert, PetService, $rootScope) {
    var user = $rootScope.currentUser;
    var pictures = [];
    $scope.onFileSelect = function($files) {
      pictures = $files;
      console.log(pictures);
    }
    $scope.addPet = function() {

      PetService.savePet({
          name: $scope.name,
          species: $scope.species,
          description: $scope.description,
          size: $scope.size,
          location: $scope.location,
          user: user,
          pictures: pictures
      }); 
    };
  }]);
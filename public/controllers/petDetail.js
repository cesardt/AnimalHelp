angular.module('MyApp')
  .controller('PetDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Pet',
    function($scope, $rootScope, $routeParams, Pet) {
      Pet.get({ _id: $routeParams.id }, function(pet) {
        $scope.pet = pet;
      });

    }]);

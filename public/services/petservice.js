angular.module('MyApp')
  .factory('PetService', ['$http', '$location', '$rootScope', '$alert',
    function($http, $location, $rootScope, $alert) {

      return {
        savePet: function(pet) {
          console.log(pet.pictures);
          return $http.post('/api/addPet', pet)
            .success(function() {

              $location.path('/list');

              $alert({
                title: 'Success!',
                content: 'Your pet has been added.',
                placement: 'top-right',
                type: 'success',
                duration: 3
              });
            })
            .error(function(response) {
              $alert({
                title: 'Error!',
                content: response.data,
                placement: 'top-right',
                type: 'danger',
                duration: 3
              });
            });
        }
      };
    }]);

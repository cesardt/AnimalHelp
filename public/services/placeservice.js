angular.module('MyApp')
  .factory('PlaceService', ['$http', '$location', '$rootScope', '$alert',
    function($http, $location, $rootScope, $alert) {

      return {
        savePlace: function(name) {
          return $http.post('/api/addPlace', name)
            .success(function() {
              $location.path('/map');

              $alert({
                title: 'Success!',
                content: 'Your location has been added.',
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

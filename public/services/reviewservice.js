angular.module('MyApp')
.factory('ReviewService', ['$http', '$location', '$rootScope', '$alert', '$upload',
 function($http, $location, $rootScope, $alert, $upload) {

  return {
    saveReview: function(review) {

      return $http.post('/api/addReview', review)
      .success(function(id) {

        $location.path('/map');

        $alert({
          title: 'Success!',
          content: 'Your review has been added.',
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

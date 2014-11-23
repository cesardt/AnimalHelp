angular.module('MyApp')
  .factory('Mail', ['$http', '$alert', '$location', '$resource', function($http, $alert, $location, $resource) {
    return {
    	sendMail: function(content) {
        console.log(content);
        var id = content.pet._id;
        return $http.post('/api/mail', content)
        .success(function(data) {
          $location.path('/list');
          $alert({
            title: 'Cheers!',
            content: 'Adoption request sent',
            placement: 'top-right',
            type: 'success',
            duration: 3
          });
        })
        .error(function() {
          $alert({
            title: 'Error!',
            content: 'Could not send mail',
            placement: 'top-right',
            type: 'danger',
            duration: 3
          });
        });
      }
    };
  }]);
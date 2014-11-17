angular.module('MyApp')
.controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.login = function() {
    Auth.login({
      email: $scope.email,
      password: $scope.password
    });
  };

  
  $scope.fblogin = function() {
    FB.login(function(response) {
      if (response.authResponse) {

        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.email + '.');
          Auth.login({

            email:  response.email,
            password: 'yoloswag'
            
          });

        });

      }
      else {
        console.log('User cancelled login or did not fully authorize.');
      }
    },{scope: 'public_profile,email,user_about_me'}
    );

  };
}]);

angular.module('MyApp')
.controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
	$scope.signup = function() {
		Auth.signup({
			email: $scope.email,
			password: $scope.password
		});
		


	};
	$scope.fbsignup = function() {
		FB.login(function(response) {
			if (response.authResponse) {

				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function(response) {
					console.log('Good to see you, ' + response.email + '.');
					Auth.signup({

						email:  response.email,
						password: 'yoloswag',
						isFacebook: true
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

angular.module('MyApp')
.controller('UserDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'User', 'Pet','Review',
	function($scope, $rootScope, $routeParams, User, Pet,Review) {
		User.get({ _id: $routeParams.id }, function(user) {
			console.log(user._id);

			$scope.user = user;
			$scope.pets = Pet.query({user: user._id});
			$scope.reviews = Review.query({user: user._id});


		});
	}]);
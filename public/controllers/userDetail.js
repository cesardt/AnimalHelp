angular.module('MyApp')
.controller('UserDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'User', 'Pet','Review','Place',
	function($scope, $rootScope, $routeParams, User, Pet, Review, Place) {
		$scope.places = [];
		$scope.generalRating = 0;
		User.get({ _id: $routeParams.id }, function(user) {
			console.log(user._id);

			$scope.user = user;
			$scope.pets = Pet.query({user: user._id});
			Review.query({user: user._id}, function(response){
				
				$scope.reviews = response;
				for (var i = $scope.reviews.length - 1; i >= 0; i--) {
					var email;
					
					Place.get({_id: $scope.reviews[i].place}, (function(i){
						return function(response){
							$scope.places[i] = response;
							console.log($scope.places);
						}
					})(i)); 


				};
			});

		});
	}]);
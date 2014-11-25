angular.module('MyApp')
.controller('ModifyUserCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 'User', 'ModifyService',
	function($scope, $location, $rootScope, $routeParams, User, ModifyService) {
		var id;
		$scope.pictures = [];
		$scope.onFileSelect = function($files) {
      		$scope.pictures = $files;
      		console.log($files);
      	}	
		User.get({ _id: $routeParams.id }, function(user) {
			$scope.user = user;
			$scope.residence = user.residence;
			$scope.name = user.name;
			console.log(user._id);
			id = user._id;
			if(id != $rootScope.currentUser._id){
				$location.path('/user/'+$rootScope.currentUser._id);
			}

		});
		
		$scope.modify = function() {
	      	ModifyService.modify({
	      	  	id: id,
	          	name: $scope.name,
	          	residence:$scope.residence,
	          	pictures: $scope.pictures
	      	}); 
	    };

	}]);
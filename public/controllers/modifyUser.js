angular.module('MyApp')
.controller('ModifyUserCtrl', ['$scope', '$location', '$rootScope', '$routeParams', 'User', 'ModifyService',
	function($scope, $location, $rootScope, $routeParams, User, ModifyService) {
		var id;
		User.get({ _id: $routeParams.id }, function(user) {
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
          residence:$scope.residence


      }); 
    };

	}]);
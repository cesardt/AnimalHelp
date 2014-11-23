angular.module('MyApp')
.controller('ModifyUserCtrl', ['$scope', '$rootScope', '$routeParams', 'User', 'ModifyService',
	function($scope, $rootScope, $routeParams, User, ModifyService) {
		User.get({ _id: $routeParams.id }, function(user) {
			console.log(user._id);

		});
		
		$scope.modify = function() {
 		
      ModifyService.modify({
          name: $scope.name,
          residence:$scope.residence


      }); 
    };

	}]);
angular.module('MyApp')
  .controller('UserDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'User',
    function($scope, $rootScope, $routeParams, User) {
      User.get({ _id: $routeParams.id }, function(user) {
      	 //console.log(user._id);
        $scope.user = user;
      });
 		console.log(User.query)
    }]);

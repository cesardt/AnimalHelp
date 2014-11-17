angular.module('MyApp')
  .controller('UserDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'User',
    function($scope, $rootScope, $routeParams, User) {
      User.get({ _id: $routeParams.id }, function(user) {
        $scope.user = user;
      });
    }]);

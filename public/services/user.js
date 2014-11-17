angular.module('MyApp')
  .factory('User', ['$resource', function($resource) {
    return $resource('/api/user/:_id');
  }]);
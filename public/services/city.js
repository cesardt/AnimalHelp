angular.module('MyApp')
  .factory('City', ['$resource', function($resource) {
    return $resource('/api/city');
  }]);
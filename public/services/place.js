angular.module('MyApp')
  .factory('Place', ['$resource', function($resource) {
    return $resource('/api/map/:_id');
  }]);
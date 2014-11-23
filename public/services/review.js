angular.module('MyApp')
  .factory('Review', ['$resource', function($resource) {
    return $resource('/api/review/:_id');
  }]);
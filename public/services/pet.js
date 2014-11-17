angular.module('MyApp')
  .factory('Pet', ['$resource', function($resource) {
    return $resource('/api/lista/:_id');
  }]);
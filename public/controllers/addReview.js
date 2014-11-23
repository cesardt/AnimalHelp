angular.module('MyApp')
.controller('AddReviewCtrl', ['$scope', '$rootScope', '$routeParams', 'Place', 'Review', 'ReviewService',
  function($scope, $rootScope, $routeParams, Place, Review,ReviewService) {
    Place.get({ _id: $routeParams.id }, function(place) {
      $scope.place = place;




    });

    $scope.addReview = function() {
      console.log($scope.stars);
      ReviewService.saveReview({
        title : $scope.title,
        content: $scope.content,
        user: $rootScope.currentUser,
        place: $scope.place,
        stars: $scope.stars

      }); 
    };


  }]);




/* title: String,
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
      stars: Number,
      content: String*/
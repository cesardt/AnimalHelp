angular.module('MyApp')
.controller('LocationDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Place', 'Review','User',
	function($scope, $rootScope, $routeParams, Place,Review,User) {
		var map;
		var geocoder= new google.maps.Geocoder();
		var location;
		$scope.reviewers = [];
		$scope.users = [];
		$scope.generalRating = 0;
		function initialize(location) {
			
		  var mapOptions = {
		    zoom: 16,
		    center: location
		  };
		  map = new google.maps.Map(document.getElementById('map-canvas'),
		      mapOptions);
		  codeLatLng(location);
		}

		function codeLatLng(latlng) {
		    var address;
		    geocoder.geocode({'latLng': latlng}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		        if (results[0]) {
		        	address= results[0].formatted_address;
		        }
		      } else {
		        address = "Cannot get formatted address";
		      }
		      var marker = new google.maps.Marker({
						      position: location,
						      map: map,
						      title: 'Hello World!'
						  });
			var infowindow = new google.maps.InfoWindow({
			    content: address
			});
			infowindow.open(map,marker);
		    });
		  }
		Place.get({ _id: $routeParams.id }, function(place) {
			$scope.place = place;
			$scope.timeOpen = new Date($scope.place.timeOpen);
			$scope.timeOpen = $scope.timeOpen.toLocaleTimeString();
			$scope.timeClose = new Date($scope.place.timeClose);
			$scope.timeClose = $scope.timeClose.toLocaleTimeString();
			console.log($scope.place);
			console.log($rootScope.currentUser);
			location = new google.maps.LatLng($scope.place.latitude, $scope.place.longitude);
			google.maps.event.addDomListener(window, 'load', initialize(location));
			Review.query({place: place._id}, function(response){
				
				$scope.reviews = response;
				console.log($scope.reviews.length);
				for (var i = $scope.reviews.length - 1; i >= 0; i--) {
					$scope.generalRating += parseFloat($scope.reviews[i].stars);
					var email;
					User.get({_id: $scope.reviews[i].user}, (function(i){
						return function(response){
							$scope.users[i] = response;
							$scope.reviewers.push(response._id);
						}
					})(i)); 
					 
					
				};
				$scope.generalRating = $scope.generalRating/$scope.reviews.length;
			});
		});

	}]);

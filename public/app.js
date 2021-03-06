angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap','google-maps'.ns(), 'angularFileUpload'])
.config(function($locationProvider, $routeProvider) {
	
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'MainCtrl'
	})
	.when('/shows/:id', {
		templateUrl: 'views/detail.html',
		controller: 'DetailCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.when('/signup', {
		templateUrl: 'views/signup.html',
		controller: 'SignupCtrl'
	})
	.when('/add', {
		templateUrl: 'views/add.html',
		controller: 'AddCtrl'
	})
	.when('/map', {
		templateUrl: 'views/map.html',
		controller: 'MapCtrl'
	})
	.when('/addPlace', {
		templateUrl: 'views/addPlace.html',
		controller: 'AddPlaceCtrl',
		access: true
	})
	.when('/addReview/:id', {
		templateUrl: 'views/addReview.html',
		controller: 'AddReviewCtrl',
		access: true
	})
	.when('/list', {
		templateUrl: 'views/lista.html',
		controller: 'ListCtrl'
	})
	.when('/location/:id', {
		templateUrl: 'views/location.html',
		controller: 'LocationDetailCtrl'
	})
	.when('/petDetail/:id', {
		templateUrl: 'views/petDetail.html',
		controller: 'PetDetailCtrl'
	})
	.when('/addPet', {
		templateUrl: 'views/addPet.html',
		controller: 'AddPetCtrl',
		access: true
	})
	.when('/user/:id', {
		templateUrl: 'views/user.html',
		controller: 'UserDetailCtrl'
	})
	.when('/modifyUser/:id', {
		templateUrl: 'views/modifyUser.html',
		controller: 'ModifyUserCtrl',
		access: true
	})
	.otherwise({
		redirectTo: '/'
	});

}).run(function($rootScope, $location, $route) {
    $rootScope.$on( "$locationChangeStart", function(event, next, current) {
      if ($rootScope.currentUser == null) {
      	var path = $route.routes[$location.path()];
        if(path){
        	if(path.access){
        		$location.path("/login");
        	}
        }
      }
    });
  });

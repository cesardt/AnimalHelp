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
		controller: 'AddPlaceCtrl'
	})
	.when('/addReview', {
		templateUrl: 'views/addReview.html',
		controller: 'AddReviewCtrl'
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
		controller: 'AddPetCtrl'
	})
	.when('/user/:id', {
		templateUrl: 'views/user.html',
		controller: 'UserDetailCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

});

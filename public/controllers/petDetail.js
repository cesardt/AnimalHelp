angular.module('MyApp')
  .controller('PetDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Pet', 'Mail', 'User',
    function($scope, $rootScope, $routeParams, Pet, Mail, User) {
    	
    	$scope.receiver=null;
        $scope.adopters = [];
     Pet.get({ _id: $routeParams.id }, function(response) {
        $scope.pet = response.pet;
        console.log($scope.pet);
        $scope.pictures = response.pictures;
        for (var i = $scope.pet.adopters.length - 1; i >= 0; i--) {
            User.get({_id: $scope.pet.adopters[i]},function(response){
                $scope.adopters.push(response);
            });
        }
        $scope.adoptionRadios = $scope.pet.adopters[0];
        console.log($scope.adopters);
        User.get({_id: $scope.pet.user}, function(response){
        	$scope.receiver = response;
        	console.log($scope.receiver);
        });
      });
    $scope.otherPets = Pet.query({});
    
    
    $scope.random = function() {
		return 0.5 - Math.random();
	}

	$scope.notMainId = function(element){
		return !element._id.match($scope.pet._id) ? true : false;
	}
    $scope.handleRadio = function(id){
        $scope.adoptionRadios = id;
    }

	$scope.sendMail = function(){
		Mail.sendMail({
			pet: $scope.pet,
			sender: $rootScope.currentUser,
			receiver: $scope.receiver
		});
	}
    $scope.chooseAdopter = function(){
        console.log($scope.adoptionRadios);
    }

    }]);

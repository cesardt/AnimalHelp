angular.module('MyApp')
.factory('ModifyService', ['$http','$location' ,'$alert',
	function($http,$location,$alert) {
		return {
			modify: function(modify) {
				
				return $http.post('/api/modifyUser', modify)
				.success(function(id) {
					$location.path('/');

					$alert({
						title: 'Success!',
						content: 'Your review has been added.',
						placement: 'top-right',
						type: 'success',
						duration: 3
					});


				})
				.error(function(response) {
					$alert({
						title: 'Error!',
						content: response.data,
						placement: 'top-right',
						type: 'danger',
						duration: 3
					});
				});
			}
		};
	}]);
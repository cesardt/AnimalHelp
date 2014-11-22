angular.module('MyApp')
  .factory('PetService', ['$http', '$location', '$rootScope', '$alert', '$upload',
    function($http, $location, $rootScope, $alert, $upload) {

      return {
        savePet: function(pet) {
          var pet = pet;
          console.log(pet);
          return $http.post('/api/addPet', pet)
            .success(function(id) {
              var pictures = pet.pictures;
              for (var i = 0; i < pictures.length; i++) {
                var file = pictures[i];
                console.log("File ")
                console.log(file);
                $upload.upload({
                  url: 'upload/'+id._id, //upload.php script, node.js route, or servlet url
                  //method: 'POST' or 'PUT',
                  //headers: {'header-key': 'header-value'},
                  //withCredentials: true,
                  data: id._id,
                  file: file, // or list of files ($files) for html5 only
                  fileName: ""+i // to modify the name of the file(s)
                  // customize file formData name ('Content-Disposition'), server side file variable name. 
                  //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
                  // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                  //formDataAppender: function(formData, key, val){}
                }).progress(function(evt) {
                  console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                  // file is uploaded successfully
                  console.log(data);
                });
              }
              $location.path('/list');

              $alert({
                title: 'Success!',
                content: 'Your pet has been added.',
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

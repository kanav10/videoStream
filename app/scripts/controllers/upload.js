'use strict';

/**
 * @ngdoc function
 * @name videoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the videoApp
 */
app.controller('UploadCtrl', ["$location", "$firebaseStorage", 'AuthService', '$scope',
    function ($location, $firebaseStorage, AuthService, $scope) {

        var self = this;
        var fileButton = document.getElementById('fileButton');
        self.uploader = document.getElementById('uploader');
        self.status = 0;
        self.video = {
            uid: AuthService.getUserId(),
            title: "",
            uploaded: new Date(),
            url : "",
            user : AuthService.getUser().displayName
        };

        self.disableUpload = true;

        fileButton.addEventListener('change', function (e) {

            self.uploading = true;
            console.log('self.uploading : ' + self.uploading);

            //get file
            var file = e.target.files[0];

            //create a storage ref
            var storageRef = firebase.storage().ref('video/' + file.name);
            //upload a file
            var task = storageRef.put(file);
            //update progress bar
            task.on('state_changed',

                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    self.uploader.value = percentage;
                    $scope.$apply(function () {
                        self.status = '\'' + parseInt(percentage) + '%\'';
                    });

                },
                function error(err) {

                },
                function complete() {
                    var downloadURL = task.snapshot.downloadURL;
                    console.log(downloadURL);

                    $scope.$apply(function () {
                        self.video.url = downloadURL;
                        self.disableUpload = false;
                    });
                }
            );
        });

        self.save = function () {
            self.loading = true;
            console.log(self.video);

            // Get a key for a new Post.
            var newVideoKey = firebase.database().ref().child('videos').push().key;
            var updates = {};
            updates['/videos/' + newVideoKey] = self.video;

            firebase.database().ref().update(updates)
                .then(function () {
                    $scope.$apply(function () {
                        $location.path("/video/" + newVideoKey);
                    });
                });
        };

    }]);

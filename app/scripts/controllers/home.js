'use strict';

/**
 * @ngdoc function
 * @name videoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the videoApp
 */
app.controller('HomeCtrl', function ($firebaseArray, $scope) {
    var self = this;
    self.loading = true;
    self.emtpy = false;
    var ref = firebase.database().ref();

    /**
     * Get Recent Videos
     * @type {[*]}
     */
    self.videos = $firebaseArray(ref.child('videos'));
    self.videos
        .$loaded()
        .then(function () {
            self.loading = false;
            if (self.videos.length === 0) {
                self.empty = true;
            }
        });
});

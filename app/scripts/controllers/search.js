'use strict';
/**
 * @ngdoc function
 * @name videoApp.controller:SearchCtrl
 * @description
 * #SearchCtrl
 * Controller of the videoApp
 */

app.controller('SearchCtrl', function (AuthService, $firebaseArray) {
    var self = this;
    var ref = firebase.database().ref();
    self.user = AuthService.getUser();

    self.loading = {videos: false};
    self.empty = false;

    //search on this field
    self.query = "";


    self.search = function () {
        self.loading.videos = true;
        self.empty = false;
        self.videos = $firebaseArray(ref.child('videos').orderByChild("description").startAt(self.query));
        self.videos
            .$loaded()
            .then(function () {
                self.loading.videos = false;
                if (self.videos.length === 0) {
                    self.empty = true;
                }
            });
    };


});
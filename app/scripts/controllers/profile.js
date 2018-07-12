'use strict';
/**
 * @ngdoc function
 * @name videoApp.controller:AboutCtrl
 * @description
 * #AboutCtrl
 * Controller of the videoApp
 */

app.controller('ProfileCtrl', function (AuthService, $firebaseArray) {
    var self = this;
    var ref = firebase.database().ref();
    self.user = AuthService.getUser();

    self.loading = {videos: true, removing: false};
    self.empty = false;


    /**
     * Get Recent Videos
     * @type {[*]}
     */
    self.videos = $firebaseArray(ref.child('videos').orderByChild("uid").equalTo(AuthService.getUserId()));
    self.videos
        .$loaded()
        .then(function () {
            self.loading.videos = false;
            if (self.videos.length === 0) {
                self.empty = true;
            }
        });

    /**
     * Remove video
     * @param video
     */
    self.remove = function (video) {
        self.loading.removing = true;
        firebase.database().ref("/videos/" + video.key);
        this.videos
            .$remove(video)
            .then(function () {
                console.log("removed");
                self.loading.removing = false;
                if(self.videos.length === 0){
                    self.empty = true;
                }
            })
            .catch(function (error) {
                console.log(error);
                self.loading.removing = false;
            });
    };
});
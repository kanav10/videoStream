'use strict';

/**
 * @ngdoc function
 * @name videoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the videoApp
 */
app.controller('VideoCtrl', function ($routeParams, AuthService, $firebaseObject, $scope, $firebaseArray, $sce) {

    var self = this;
    this.user = AuthService.getUser();
    this.loaded = { video: false, comments: false, commenting: false };
    var ref = firebase.database().ref();

    this.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };

    /**
     * Get Video
     */
    this.video = $firebaseObject(ref.child('videos').child($routeParams.id));
    this.video
        .$loaded()
        .then(function () {
            self.loaded.video = true;
        });

    /**
     * Load comments
     * @type {[*]}
     */
    this.comments = $firebaseArray(ref.child('comments').orderByChild("video").equalTo($routeParams.id));
    this.comments
        .$loaded()
        .then(function () {
            self.comments.loaded = true;
        });


    /*******************************************************************************************************************
     * COMMENTS SECTION
     ******************************************************************************************************************/

    this.commentForm = {};
    this.submitted = false;

    this.newComment = {
        video: $routeParams.id,
        uid: AuthService.getUserId(),
        name: AuthService.getUser().displayName,
        comment: "",
        timeStamp: new Date()
    };

    /**
     * Add new comment
     */
    this.addComment = function () {
        self.loaded.commenting = true;
        self.newComment.timeStamp = Date.now();

        /**skipping validations for now **/
        // if(this.commentForm.$valid){
        //     this.newComment.timeStamp = Date.now();
        //     this.comments.unshift(angular.copy(this.newComment));
        //     this.newComment.comment = "";
        // } else {
        //     this.submitted = true;
        // }

        // Get a key
        var commentKey = firebase.database().ref().child('videos').push().key;
        var updates = {};
        updates['/comments/' + commentKey] = self.newComment;

        firebase.database().ref().update(updates)
            .then(function () {
                $scope.$apply(function () {
                    self.loaded.commenting = false;
                    self.newComment.comment = "";
                });
            });
    };

    /**
     * Remove comment
     * @param comment
     */
    this.remove = function (comment) {
        firebase.database().ref("/comments/" + comment.key);
        this.comments
            .$remove(comment)
            .then(function () {
                console.log("comment removed")
            }).catch(function (error) {
                console.log(error);
            });
    };

});
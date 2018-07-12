/*globals app*/
'use strict';
app.factory('UserService', function ($rootScope, $firebaseAuth, $location, localStorageService) {

    var auth = $firebaseAuth();

    this.set = function(user){

    };

    this.getUser = function () {
        return localStorageService.get("user");
    };

    return this;
});

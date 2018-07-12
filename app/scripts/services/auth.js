/*globals app*/
'use strict';
app.factory('AuthService', function ($rootScope, $firebaseAuth, $location, localStorageService) {

    var auth = $firebaseAuth();

    this.isAuthenticated = function () {
        return localStorageService.get('token') !== null;
    };

    this.logout = function () {
        $rootScope.authenticated = false;
        localStorageService.clearAll();
        $location.path('/login');
    };

    // twitter login
    //error  start from here
    this.signInWithTwitter = function () {

        auth.$signInWithPopup("twitter")
            .then(function (result) {
                localStorageService.set('token', result.credential.accessToken);
                localStorageService.set("user", {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid
                });
                $rootScope.authenticated = true;
                $location.path('/home');

            })
            .catch(function (error) {
                console.log(error);
                alert(error.message);
            });
    };


    this.signInWithGoogle = function () {

        auth.$signInWithPopup("google")
            .then(function (firebaseUser) {
                localStorageService.set('token', firebaseUser.credential.accessToken);
                localStorageService.set("user", firebaseUser.user);
                $rootScope.authenticated = true;
                $location.path('/home');
            })
            .catch(function (error) {
                console.log(error);
                alert(error.message);
            });

    };

    this.signInWithFacebook = function () {

        auth.$signInWithPopup("facebook")
            .then(function (result) {
                localStorageService.set('token', result.credential.accessToken);
                localStorageService.set("user", result.user);
                $rootScope.authenticated = true;
                $location.path('/home');
            })

            .catch(function (error) {
                console.log(error);
                alert(error.message);
            });

    };

    this.getUser = function () {
        return localStorageService.get("user");
    };

    this.getUserId = function () {
        var user =  localStorageService.get("user");
        if(user){
            return user.uid;
        }
    };

    $rootScope.authenticated = this.isAuthenticated() || false;
    return this;
});

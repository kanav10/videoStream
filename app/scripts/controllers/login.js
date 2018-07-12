'use strict';

/**
 * @ngdoc function
 * @name videoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the videoApp
 */
  app.controller('LoginCtrl', function ($location, AuthService) {

    if(AuthService.isAuthenticated()){
      $location.path('/home');
    }

    this.user = {userId : "", password : ""};

    this.login = function(){
        AuthService.login();
    };

    this.signInWithGoogle = function(){
      AuthService.signInWithGoogle();
    };

  });


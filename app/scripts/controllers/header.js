'use strict';
/**
 * @ngdoc function
 * @name videoApp.controller:AboutCtrl
 * @description
 * #AboutCtrl
 * controller of the videoApp
 */
app.controller('HeaderCtrl', function (AuthService, $rootScope) {

   this.logout = function () {
       AuthService.logout();
   };

   this.authenticated = AuthService.isAuthenticated;

  });


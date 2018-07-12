/*globals app,firebase*/
'use strict';

/**
 * @ngdoc overview
 * @name videoApp
 * @description
 * # videoApp
 *
 * Main module of the application.
 */
var app = angular.module('videoProjectApp', [
    'ngAnimate',
    'ngMessages',
    'ngRoute',
    'firebase',
    'LocalStorageModule',
    'ngSanitize'
]);

app.config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'ctrl'
        })
        .when('/upload', {
            templateUrl: 'views/upload.html',
            controller: 'UploadCtrl',
            controllerAs: 'ctrl'
        })
        .when('/video/:id', {
            templateUrl: 'views/video.html',
            controller: 'VideoCtrl',
            controllerAs: 'ctrl'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'ctrl'
        })
        .when('/profile', {
            templateUrl: "views/profile.html",
            controller: 'ProfileCtrl',
            controllerAs: "ctrl"
        })
        .when('/search', {
            templateUrl: "views/search.html",
            controller: 'SearchCtrl',
            controllerAs: "ctrl"
        })
        .otherwise({
            redirectTo: '/home'
        });

    localStorageServiceProvider
        .setPrefix('videoProject');

});


/***********************************************************************************************************************
 * RUN SECTION
 ***********************************************************************************************************************/

app.run(['$rootScope', 'AuthService', '$location',
    function ($rootScope, AuthService, $location) {

        var publicRoutes = ['/login', '/signup'];
        var path;
        var isPublic;
        var isAuthenticated;

        /*******************************
         Private route permission checks
         ********************************/
        $rootScope.$on('$routeChangeStart', function (event) {

            path = $location.path();
            isPublic = publicRoutes.indexOf(path) > -1;
            isAuthenticated = AuthService.isAuthenticated();

            //PRIVATE ROUTES ONLY
            if ((!isPublic) && (!isAuthenticated)) {
                //DENY app use

                $location.path('/');

            }

        });

    }]);
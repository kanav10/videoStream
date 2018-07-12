/*globals app,angular*/
'use strict';

/**
 * @ngdoc directive
 * @name videoApp.directive:abInvoice
 * @description
 */
app.directive('myVideo', ["AuthService", "$location", "$sce",
    function (AuthService, $location, $sce) {
        return {
            scope:{
               video : "="
            },
            templateUrl: 'views/my-video.html',
            restrict: 'E',
            link : function (scope, element, attrs) {
                // scope.preview = attrs.hasOwnProperty('preview');
            },
            controller : function ($scope) {
                $scope.view = function () {
                    $location.path('video/' + $scope.video.$id);
                };
                 $scope.trustSrc = function(src) {
                    return $sce.trustAsResourceUrl(src);
                };
            }
        };
    }]);

/*globals app,angular*/
'use strict';

/**
 * @ngdoc directive
 * @name videoApp.directive:abInvoice
 * @description
 * # abInvoice
 */
app.directive('myLoader', [function () {
        return {
            scope:{
                message : "="
            },
            template: '<div class="col-xs-12" style="margin:8px;">' +
                        '<p class="bg-success my-message">{{message}}...</p>' +
                        '</div>',
            restrict: 'E',
            link : function (scope, element, attrs) {

            },
            controller : function ($scope, $timeout) {

            }
        };
    }]);


// template: '<div class="col-xs-4 col-xs-offset-4">' +
// '<div class="loader"></div>' +
// '<p style="margin-left:10px;margin-top: 10px;font-weight: 700;">{{message}}...</p>' +
// '</div>',
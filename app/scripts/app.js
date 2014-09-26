'use strict';

angular.module('testbedsApp', [
        'ngResource',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/testbeds', {
                templateUrl: 'views/testbeds.html',
                controller: 'TestbedListCtrl'
            })
            .when('/testbeds/:testbedId', {
                templateUrl: 'views/testbed-detail.html',
                controller: 'TestbedDetailCtrl'
            })
            .otherwise({
                redirectTo: '/testbeds'
            });
    });

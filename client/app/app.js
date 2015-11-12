var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){
   //$locationProvider.html5mode(true);
    $routeProvider
        .when('/', {
        templateUrl: '/partials/home',
        controller: 'MainCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
});

app.controller('MainCtrl', function($scope){
    $scope.hello = 'Hi from angular !';
});

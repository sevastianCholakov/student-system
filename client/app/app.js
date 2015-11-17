var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider){
   //$locationProvider.html5mode(true);
    $routeProvider
        .when('/', {
        templateUrl: '/partials/main/home',
        controller: 'MainCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
});


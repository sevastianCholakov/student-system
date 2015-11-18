var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider){
   //$locationProvider.html5mode(true);

    var routeRoleCheck = {
        admin: {
            auth: function (auth) {
                return auth.isAuthorizedForRole('admin');
            }
        }
    };

    $routeProvider
        .when('/', {
        templateUrl: '/partials/main/home',
        controller: 'MainCtrl'
    }).when('/admin/users', {
        templateUrl: '/partials/account/users-list',
        controller: 'UserListCtrl',
        resolve: routeRoleCheck.admin
    }).when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl',
        }
    );

    $routeProvider.otherwise({redirectTo: '/'});
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

     if (rejection === 'Not Authorized') {
         $location.path('/');
     }

   });
});
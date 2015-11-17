app.controller('LoginCtrl', function ($scope, $http, notifier) {
    $scope.login = function (user) {
        $http.post('/login', user).success(function (resp) {
            if (resp.success) {
                notifier.success('Login successful');
            } else {
                notifier.error('Login failed');
            }
        });
    }
});
app.controller('LoginCtrl', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user).then(function (success) {
            if (success) {
                notifier.success('Login successful');
            } else {
                notifier.error('Login failed');
            }
        });
    };

    $scope.signOut = function () {
        auth.logOut().then(function () {
            notifier.success('Logout successfull');
            $scope.user.username = '';
            $scope.user.password = '';
            $location.path('/');
        });
    };
});
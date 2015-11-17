app.controller('LoginCtrl', function ($scope, notifier, identity, auth) {
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
})
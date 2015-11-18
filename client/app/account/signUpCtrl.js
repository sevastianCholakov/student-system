app.controller('SignUpCtrl', function ($scope, auth, notifier) {
    $scope.signup = function (user) {
        auth.sign(user).then(function () {
            notifier.success('Registration successful');
            $location.path('/');
        });
    }
});
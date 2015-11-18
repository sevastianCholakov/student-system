app.controller('SignUpCtrl', function ($scope, auth, notifier) {
    $scope.signup = function (user) {
        auth.sign(user).then(function (success) {
            if (success) {
                notifier.success('Registration successful');
            } else {
                notifier.error('Registration failed');
            }
        });
    }
});
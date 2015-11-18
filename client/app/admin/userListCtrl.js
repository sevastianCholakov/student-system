app.controller('UserListCtrl', function ($scope, userResource) {
    $scope.users = userResource.query();
});
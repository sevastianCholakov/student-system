app.factory('identity', function ($window, userResource) {
    var user;
    if ($window.userObject) {
        user = new userResource();
        angular.extend(user, $window.userObject);
    }

    return {
        currentUser: user,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
        }
    };
});
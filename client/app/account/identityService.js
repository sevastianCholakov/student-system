app.factory('identity', function ($window) {
    var currentUser;
    return {
        currentUser: $window.userObject,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
});
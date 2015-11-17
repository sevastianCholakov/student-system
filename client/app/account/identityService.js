app.factory('identity', function () {
    var currentUser;
    return {
        currentUser: undefined,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    };
});
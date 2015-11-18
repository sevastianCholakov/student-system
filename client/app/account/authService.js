app.factory('auth', function ($http, $q, identity, userResource) {
    return {
      signup: function () {
          var deferred = $q.defer();
          $http.post('/signup', user).success(function (response) {
              if (response.success) {
                  var user = new userResource();
                  angular.extend(user, response.user);
                  identity.currentUser = user;
                  deferred.resolve(true);
              } else {
                  deferred.resolve(false);
              }
          });
          return deferred.promise;
      },
      login: function (user) {
          var deferred = $q.defer();
          $http.post('/login', user).success(function (resp) {
              if (resp.success) {
                  var user = new userResource();
                  angular.extend(user, resp.user);
                  identity.currentUser = user;
                  deferred.resolve(true);
              } else {
                  deferred.resolve(false);
              }
          });

          return deferred.promise;
      },
        logOut: function () {
          var deferred = $q.defer();

          $http.post('/logout').success(function(){
              identity.currentUser = undefined;

              deferred.resolve();
          });

          return deferred.promise;
      },
        isAuthorizedForRole: function (role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            } else {
                return $q.reject('Not Authorized');
            }
        }
    };
});
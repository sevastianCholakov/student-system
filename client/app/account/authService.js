app.factory('auth', function ($http, $q, identity, userResource) {
    return {
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
    };
});
/* global angular */
'use strict';

angular
  .module('hardholderApp')
  .directive('games', function ($http, socket, Auth) {
    return {
      restrict: 'E',
      scope: true,
      link: function (scope, el, attr, form) {
        scope.isLoggedIn = Auth.isLoggedIn;
        $http.get('/api/games')
          .success(function (games) {
            scope.games = games;
            socket.syncUpdates('game', scope.games);
          });

        scope.$on('$destroy', function () {
          socket.unsyncUpdates('game');
        });

        scope.addGame = function () {
          if (scope.newGame.$invalid) {
            return;
          }
          $http.post('/api/games', {
            name: scope.newGame.name
          });
          scope.name = '';
        };
      },
      templateUrl: 'app/games/games.html'
    };
  });

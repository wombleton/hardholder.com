/* global angular */
'use strict';

angular
  .module('hardholderApp')
  .directive('games', function ($http, socket) {
    return {
      restrict: 'E',
      link: function (scope, el) {
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
            name: scope.name
          });
          scope.name = '';
          el[0].blur();
        };
      },
      templateUrl: 'app/games/games.html'
    };
  });

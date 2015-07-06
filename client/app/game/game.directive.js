/* global angular */
'use strict';

angular.module('hardholderApp')
  .directive('game', function (socket, Auth) {
    return {
      templateUrl: 'app/game/game.html',
      restrict: 'E',
      scope: {
        gameId: '@'
      },
      link: function (scope, element, attrs) {
        function getUserData () {
          var user = Auth.getCurrentUser();
          return {
            gameId: scope.gameId,
            userId: user && user._id,
            userName: user && user.name
          };
        }

        socket.socket.on('game:update', function (game) {
          scope.game = game;
        });
        socket.socket.on('room:users', function (users) {
          scope.users = users;
        });

        socket.socket.emit('room:join', getUserData());

        scope.$on('$destroy', function () {
          socket.socket.emit('room:leave');
        });
      }
    };
  });

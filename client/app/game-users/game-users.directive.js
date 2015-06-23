'use strict';

angular.module('hardholderApp')
  .directive('gameUsers', function () {
    return {
      templateUrl: 'app/game-users/game-users.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
'use strict';

angular.module('hardholderApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('create-game', {
        url: '/games/new',
        template: '<new-game></new-game>'
      });
  });

/* global angular */
'use strict';

angular.module('hardholderApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show-game', {
        parent: 'layout',
        url: '/games/:id',
        templateProvider: function ($stateParams) {
          return '<game game-id="' + $stateParams.id + '"><game>';
        }
      });
  });

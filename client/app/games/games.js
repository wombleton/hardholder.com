/* global angular */
'use strict';

angular.module('hardholderApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show-game', {
        url: '/games/:id',
        templateProvider: function ($stateParams) {
          return '<game game-id="' + $stateParams.id + '"><game>';
        }
      });
  });

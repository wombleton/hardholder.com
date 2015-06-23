/* global angular */
'use strict';

angular.module('hardholderApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('layout', {
        abstract: true,
        views: {
          '@': {
            templateUrl: 'app/main/layout.html'
          }
        }
      })
      .state('main', {
        parent: 'layout',
        url: '/',
        template: '<games></games>',
        controller: 'MainCtrl'
      });
  });

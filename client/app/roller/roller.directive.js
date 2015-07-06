/* global angular */
'use strict';

angular.module('hardholderApp')
  .directive('roller', function (_) {
    return {
      templateUrl: 'app/roller/roller.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.roll = {
          skill: 3,
          trait: 0,
          persona: 0,
          extras: 0
        };

        scope.$watch('roll', function () {
          scope.total = scope.roll.skill + scope.roll.trait + scope.roll.persona + scope.roll.extras;
        }, true);

        scope.dice = _.range(1, 10 + 1);
        scope.makeRoll = function () {
          scope.roll.skill = 3;
          scope.building = true;
        };

        scope.skills = [
          'Alchemist',
          'Arcanist',
          'Armourer',
          'Cartographer',
          'Commander',
          'Cook',
          'Criminal',
          'Dungeoneer',
          'Fighter',
          'Haggler',
          'Healer',
          'Hunter',
          'Lore Master',
          'Manipulator',
          'Mentor',
          'Orator',
          'Pathfinder',
          'Rider',
          'Ritualist',
          'Scavenger',
          'Scholar',
          'Survivalist',
          'Theologian',
          'Health',
          'Will',
          'Nature'
        ];
      }
    };
  });

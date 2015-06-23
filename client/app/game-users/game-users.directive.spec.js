'use strict';

describe('Directive: gameUsers', function () {

  // load the directive's module and view
  beforeEach(module('hardholderApp'));
  beforeEach(module('app/game-users/game-users.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<game-users></game-users>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the gameUsers directive');
  }));
});
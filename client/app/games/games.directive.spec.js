'use strict';

describe('Directive: games', function () {

  // load the directive's module and view
  beforeEach(module('hardholderApp'));
  beforeEach(module('app/games/games.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<games></games>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the games directive');
  }));
});
'use strict';

describe('Directive: roller', function () {

  // load the directive's module and view
  beforeEach(module('hardholderApp'));
  beforeEach(module('app/roller/roller.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<roller></roller>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the roller directive');
  }));
});
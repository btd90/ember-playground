import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/flightsv2', function(hooks) {
  setupTest(hooks);

  test('flights v2 route exists', function(assert) {
    let route = this.owner.lookup('route:home/flightsv2');
    assert.ok(route);
  });
});
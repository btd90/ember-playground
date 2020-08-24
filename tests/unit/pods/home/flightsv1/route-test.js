import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/flightsv1', function(hooks) {
  setupTest(hooks);

  test('flights v1 route exists', function(assert) {
    let route = this.owner.lookup('route:home/flightsv1');
    assert.ok(route);
  });
});
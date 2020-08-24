import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/about', function(hooks) {
  setupTest(hooks);

  test('about route exists', function(assert) {
    let route = this.owner.lookup('route:home/about');
    assert.ok(route);
  });
});
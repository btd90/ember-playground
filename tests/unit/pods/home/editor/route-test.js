import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/editor', function(hooks) {
  setupTest(hooks);

  test('editor route exists', function(assert) {
    let route = this.owner.lookup('route:home/editor');
    assert.ok(route);
  });
});
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

module('Integration | Component | map-component', function(hooks) {
  setupRenderingTest(hooks);

  test('map renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('geojson', {});
    this.set('points', A());
    this.set('saveEvent', '');

    // Template block usage:
    await render(hbs`
      {{map-component 
        class="leaflet-container" 
        lat="46" 
        lng="-122" 
        zoom=5 
        geojson=geojson 
        points=points 
        saveEvent=saveEvent 
        drawEnabled=true
      }}
    `);

    assert.ok(this.element.textContent.includes('Voyager Spotify Dark Light All'));
  });
});

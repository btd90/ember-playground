import Component from '@ember/component';
import { set } from '@ember/object';

/**
 * Component to construct a new leaflet layer-group enabling components to be displayed
 * on the map using either display-point or display-box components. Supports leaflet
 * layer-control for toggling.
 *
 * @argument {Object} mapInstance - the parent map instance
 * @argument {String} layerName - the name assigned to the layer group (used for layer-control)
 * @argument {Array} componentOverlays - array for adding other components to map
 */
export default Component.extend({
  init() {
    this._super(...arguments);

    // Store inputs
    let map = this.get('mapInstance');
    let layerName = this.get('layerName');
    let componentOverlays = this.get('componentOverlays');

    // Setup new layer group
    let layerGroupInit = L.layerGroup();
    layerGroupInit.name = layerName;
    set(layerGroupInit, 'name', layerName);

    // Update overlays
    componentOverlays.pushObject(layerGroupInit);

    // Add to map
    layerGroupInit.addTo(map);
    this.set('layerGroupInit', layerGroupInit);
  },

  didInsertElement() {
    this._super(...arguments);
    this.set('layerGroup', this.get('layerGroupInit'));
  },

  willDestroyElement() {
    // Clear existing layer group
    this.set('layerGroup', '');
  },
});

import Component from '@ember/component';

/**
 * EXPECT LAT/LNG/Bounds???
 * Create new L.control????
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
    Ember.set(layerGroupInit, 'name', layerName);

    // Update overlays
    componentOverlays.pushObject(layerGroupInit);

    // Add to map
    layerGroupInit.addTo(map);

    this.set('layerGroupInit', layerGroupInit);

    // // debugger;
    // // map.layerGroups.add(layerGroupInit);


    // L.CustomLayerGroup = L.LayerGroup.extend({
    //   onAdd: function(map) {
    //     this._super(...arguments);
    //   },

    //   onRemove: function(map) {
    //     this._super(...arguments);
    //   }
    // });

    // L.customlayergroup = function (args) {
    //   return new L.CustomLayerGroup(args);
    // }

    // // Add layer to relevant layer group
    // L.customlayergroup({
    // }).addTo(map);
    // this.set('layerGroupInit', L.customlayergroup);

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

import $ from 'jquery';
import DrawControl from 'ember-leaflet-draw/components/draw-control';

/**
 * Override of draw plugin
 * 
 */
export default DrawControl.extend({
  enableDeleting: true,
  enableEditing: true,

  init() {
    this._super(...arguments);
  },

  addToContainer() {
    this._super(...arguments);
  },

  didCreateLayer() {
    this._super(...arguments);
  },

  willDestroy() {
    // remove draw layer from map here?
  },

  // Custom create to handle geojson input - not using for now
  // https://github.com/StevenHeinrich/ember-leaflet-draw/pull/9 
  createLayer() {
    let drawingLayerGroup;
    if (this.get('showDrawingLayer')) {
      drawingLayerGroup = new this.L.FeatureGroup();
      const map = this.get('parentComponent._layer');

      // If supplied, draw initial features onto editable feature group
      let initialFeatures = this.get('initialFeatures'); // L.geoJson()
      if (initialFeatures) {
        initialFeatures.eachLayer(function (layer) {
          this._applyOptionsToLayer(layer);
          layer.addTo(drawingLayerGroup);
        }, this);
      }
      drawingLayerGroup.addTo(map);
    }
    return drawingLayerGroup;
  },

  // Helper method to set layer.options to draw config
  _applyOptionsToLayer(layer) {
    let shapeOptions = {};
    // Currently just uses its own options set, since we can't tell what shape it is (or can we?)
    shapeOptions = this.get('draw.initial.shapeOptions');

    let drawConfig = $.extend({}, layer.options, shapeOptions);
    layer.options = drawConfig;
  },
})

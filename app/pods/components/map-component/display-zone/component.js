import Component from '@ember/component';

/**
 * EXPECT LAT/LNG/Bounds???
 * Create new L.control????
 */
export default Component.extend({
  init() {
    this._super(...arguments);

    //
    // Update layer-control at some point!!! 
    //

    // Store inputs
    let map = this.get('mapInstance');
    let layerName = this.get('layer');
    let absolutePosition = this.get('absolutePosition');
    let position = [this.get('lat'), this.get('lng')];
    let maintainComponentSize = this.get('maintainComponentSize');

    // Create new custom map layer
    // TRY SHIFTING THIS TO OUTSIDE COMPONENT DEFINITION
    L.CustomLayer = L.Layer.extend({
      onAdd: function (map) {
        let pane = map.getPane(this.options.pane);
        this._container = L.DomUtil.create('div');
        this._container.className = layerName;
        this._container.id = layerName;

        // Required to scale overlay correctly on zoom
        this._container.style.position = "absolute";

        // Add container to pane
        pane.appendChild(this._container);

        // Calculate initial position of container with `L.Map.latLngToLayerPoint()`, `getPixelOrigin()` and/or `getPixelBounds()`
        let mapPosition = map.latLngToLayerPoint(position);
       
        if (maintainComponentSize) {
          L.DomUtil.setPosition(this._container, mapPosition);
        } else {
          // TRY ADDING MULTIPLIER TO ZOOM??
          L.DomUtil.setTransform(
            this._container, 
            mapPosition, 
            this._map._zoom
          );
        }
        
        // Add and position children elements if needed

        // CHANGE ABSOLUTE POSITION TO INSTEAD DEAL WITH RESIZING DIV TO MAINTAIN DIV BOUNDS ON ZOOM!!
        map.on('zoomend viewreset', this._update, this, map);
      },

      onRemove: function (map) {
        L.DomUtil.remove(this._container);
        map.off('zoomend viewreset', this._update, this, map);
      },

      _update: function () {
        // Recalculate position of container
        let mapPosition = this._map.latLngToLayerPoint(position);
        
        if (maintainComponentSize) {
          L.DomUtil.setPosition(this._container, mapPosition);
        } else {
          // TRY ADDING MULTIPLIER TO ZOOM??
          L.DomUtil.setTransform(
            this._container, 
            mapPosition, 
            this._map._zoom
          );
        }

        // Add/remove/reposition children elements if needed
      },
    });

    L.customlayer = function (args) {
      return new L.CustomLayer(args);
    }

    L.customlayer({
      layerName: layerName,
      absolutePosition: absolutePosition
    }).addTo(map);
  },

  didInsertElement() {
    this._super(...arguments);
    this.set('layerReady', true);
  },
});

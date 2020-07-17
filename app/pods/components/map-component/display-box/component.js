import Component from '@ember/component';

/**
 * Component to enable a boundary for rendering a component at given
 * bounds on leaflet map.
 *
 * @argument {String} layerId - id used when defining parent element on the map
 * @argument {String} layerGroup - the layerGroup object that the display box is added to
 * @argument {Object} upperLeft - the upper left lat/lng for the bounding
 * @argument {Object} lowerRight - the lower right lat/lng for the bounding
 */
export default Component.extend({
  init() {
    this._super(...arguments);

    // Store inputs
    let layerId = this.get('layerId');
    let layerGroup = this.get('layerGroup');
    let upperLeft = this.get('upperLeft');
    let lowerRight = this.get('lowerRight');
    
    // Create new custom map layer
    L.CustomLayer = L.Layer.extend({
      onAdd: function(map) {
        let pane = map.getPane(this.options.pane);
        let childNodes = pane.childNodes;
        let found = false;

        // Check if child elements already exist
        if(childNodes && !found) {
          // Update position/visibility if child node exists
          for(let i=0; i<childNodes.length; i++) {
            if(childNodes[i].id === layerId) {
              this._update();
              found = true;
              break;
            }
          }
        }
        
        if(!found) {
          // Create new div for new layer
          this._container = L.DomUtil.create('div');
          this._container.className = "leaflet-layer";
          this._container.id = layerId;

          // Required to scale overlay correctly on zoom
          this._container.style.position = "absolute";

          // Add container to pane
          pane.appendChild(this._container);

          // Position container
          this._calculateWidthHeightPosition(map, this._container, upperLeft, lowerRight);

          // Add events
          map.on('zoomstart', this._hide, this, map);
          map.on('zoomend viewreset', this._update, this, map);
        }
      },

      onRemove: function() {
        // Triggered when layer toggled in layer control
        this._hide();
      },

      _update: function() {
        if(this._map) {
          // Re-position container
          this._calculateWidthHeightPosition(this._map, this._container, upperLeft, lowerRight);
        }
      },

      _hide: function() {
        // Hide the element before position calculation
        this._container.style.visibility = "hidden";
      },

      _calculateWidthHeightPosition(map, container, upperLeft, lowerRight) {
        // Calculate initial points of container
        let mapUpperLeft = map.latLngToLayerPoint(upperLeft);
        let mapLowerRight = map.latLngToLayerPoint(lowerRight);
        let containerWidth = Math.abs(mapUpperLeft.x - mapLowerRight.x)
        let containerHeight = Math.abs(mapUpperLeft.y - mapLowerRight.y);

        // Use above points to calculate width/height of element
        container.style.width = containerWidth.toString() + "px";
        container.style.height = containerHeight.toString() + "px";

        // Set the updated position
        L.DomUtil.setPosition(container, mapUpperLeft);

        // Show the element once position calculated
        container.style.visibility = "visible";
      }
    });

    L.customlayer = function (args) {
      return new L.CustomLayer(args);
    }

    // Add layer to relevant layer group
    L.customlayer({
      layerId: layerId
    }).addTo(layerGroup);
  },

  didInsertElement() {
    this._super(...arguments);
    this.set('layerReady', true);
  },
});

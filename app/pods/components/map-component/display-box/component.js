import Component from '@ember/component';

/**
 * Component to enable a boundary for rendering a component at given
 * bounds on leaflet map.
 *
 * @argument {String} layerId - id used when defining parent element on the map
 * @argument {String} layerGroup - the layerGroup object that the display box is added to
 * @argument {Number} upperLeft - the upper left lat/lng for the bounding
 * @argument {Number} lowerRight - the lower right lat/lng for the bounding
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
          this._container.style.visibility = "visible";

          // Add container to pane
          pane.appendChild(this._container);

          // Calculate initial points of container
          let mapUpperLeft = map.latLngToLayerPoint(upperLeft);
          let mapLowerRight = map.latLngToLayerPoint(lowerRight);
          let containerWidth = Math.abs(mapUpperLeft.x - mapLowerRight.x)
          let containerHeight = Math.abs(mapUpperLeft.y - mapLowerRight.y);

          // Use above points to calculate width/height of element
          this._container.style.width = containerWidth.toString() + "px";
          this._container.style.height = containerHeight.toString() + "px";
        
          // Set the updated position
          L.DomUtil.setPosition(this._container, mapUpperLeft);
          
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
        // Recalculate position of container
        if(this._map) {                
          // Calculate initial points of container
          let mapUpperLeft = this._map.latLngToLayerPoint(upperLeft);
          let mapLowerRight = this._map.latLngToLayerPoint(lowerRight);
          let containerWidth = Math.abs(mapUpperLeft.x - mapLowerRight.x)
          let containerHeight = Math.abs(mapUpperLeft.y - mapLowerRight.y);

          // Use above points to calculate width/height of element
          this._container.style.width = containerWidth.toString() + "px";
          this._container.style.height = containerHeight.toString() + "px";

          // Set the updated position
          L.DomUtil.setPosition(this._container, mapUpperLeft);

          // Show the element once position calculated
          this._container.style.visibility = "visible";
        }
      },

      _hide: function() {
        // Hide the element before position calculation
        this._container.style.visibility = "hidden";
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

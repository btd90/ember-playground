import Component from '@ember/component';

/**
 * Component to enable a location for rendering a component at a given
 * lat/lng on leaflet map.
 *
 * @argument {String} layerId - id used when defining parent element on the map
 * @argument {String} layerGroup - the layerGroup object that the display point is added to
 * @argument {Number} lat - latitude for top-left corner where component will render
 * @argument {Number} lng - longitude for top-left corner where component will render
 */
export default Component.extend({
  init() {
    this._super(...arguments);

    // Store inputs
    let layerId = this.get('layerId');
    let layerGroup = this.get('layerGroup');
    let position = [this.get('lat'), this.get('lng')];
    
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
          this._container.style.visibility = "visible";

          // Add container to pane
          pane.appendChild(this._container);

          // Calculate initial position of container
          let mapPosition = map.latLngToLayerPoint(position);
        
          // Set the updated position
          L.DomUtil.setPosition(this._container, mapPosition);
          
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
          let mapPosition = this._map.latLngToLayerPoint(position);
      
          // Set the updated position
          L.DomUtil.setPosition(this._container, mapPosition);

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

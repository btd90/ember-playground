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

        // Required to scale correctly on zoom
        this._container.style.position = "absolute";

        // Add container to pane
        pane.appendChild(this._container);

        // this._disableLeafletRounding();

        // Try placing a marker and using that as position???


        // Calculate initial position of container with `L.Map.latLngToLayerPoint()`, `getPixelOrigin()` and/or `getPixelBounds()`
        let mapPosition = map.latLngToLayerPoint(position);
        // let mapPosition = map.project(position, map._zoom);
        // debugger;

        // let test =  {x: 26.333333333333258, y: 35.4770169430887};

        // let zoom = this._map._zoom;
        // let layerOrigin = this._map.layerPointToLatLng([0, 0]);
        // let projectedPoint = this._map.project(L.latLng(position), zoom);
        // let projectedOrigin = this._map.project(layerOrigin, zoom);
        // let mapPosition = projectedPoint._subtract(projectedOrigin);

        // this._enableLeafletRounding();

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
        // this._disableLeafletRounding();
        // let test =  {x: 26.333333333333258, y: 35.4770169430887};

        // Recalculate position of container
        let mapPosition = this._map.latLngToLayerPoint(position);
        // console.log(position);

        // IS IT WORTH PERSUEING THIS??
        // REVISIT ONCE EVERYTHING ELSE IS WORKING?
        // this._enableLeafletRounding();


        // let zoom = this._map._zoom;
        // let layerOrigin = this._map.layerPointToLatLng([0, 0]);
        // let projectedPoint = this._map.project(L.latLng(position), zoom);
        // let projectedOrigin = this._map.project(layerOrigin, zoom);
        // let mapPosition = projectedPoint._subtract(projectedOrigin);
        // debugger;

        if (maintainComponentSize) {
          // LAT changes while zooming!!!
          // SEE COMMENT ABOVE
          L.DomUtil.setPosition(this._container, mapPosition);
        } else {
          // TRY ADDING MULTIPLIER TO ZOOM??
          L.DomUtil.setTransform(
            this._container, 
            mapPosition, 
            this._map._zoom
          );
        }


        // // L.DomUtil.setPosition(this._container, mapPosition);
        // debugger;
        // L.DomUtil.setTransform(
        //   this._container, 
        //   mapPosition, 
        //   this._map._zoom
        // );
        // debugger;

        // Add/remove/reposition children elements if needed
      },

      _disableLeafletRounding: function(){
        this._leaflet_round = L.Point.prototype._round;
        L.Point.prototype._round = function(){ return this; };
      },

      _enableLeafletRounding: function(){
        L.Point.prototype._round = this._leaflet_round;
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

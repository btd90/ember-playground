// import MapComponent from '../component';
import Component from '@ember/component';
import {
  observer,
  computed,
} from '@ember/object';

/**
 * EXPECT LAT/LNG/Bounds???
 * Create new L.control????
 */
// export default MapComponent.extend({
export default Component.extend({
  init() {
    this._super(...arguments);

    // Update control 
    let map = this.get('mapInstance');
    let layerName = this.get('layer');
    let absolutePosition = this.get('absolutePosition');
    let position = [this.get('lat'), this.get('lng')];

    // create new control
    // let control = L.control();


    // Using custom layer
    //
    // TEST IT HERE!!
    //

    // Using control
    // L.Control.Watermark = L.Control.extend({
    //   onAdd: function (map) {
    //     let img = L.DomUtil.create('img');

    //     img.src = 'assets/images/building.png';
    //     img.style.width = '50px';

    //     return img;
    //   },

    //   onRemove: function (map) {
    //     // Nothing to do here
    //   }
    // });

    // L.control.watermark = function (opts) {
    //   return new L.Control.Watermark(opts);
    // }

    // L.control.watermark({
    //   position: 'bottomleft'
    // }).addTo(map);

    L.CustomLayer = L.Layer.extend({
      onAdd: function (map) {
          let pane = map.getPane(this.options.pane);
          this._container = L.DomUtil.create('div');
          this._container.className = layerName;
          this._container.id = layerName;

          pane.appendChild(this._container);
    
          // Calculate initial position of container with `L.Map.latLngToLayerPoint()`, `getPixelOrigin()` and/or `getPixelBounds()`
          let mapPosition = map.latLngToLayerPoint(position);
          L.DomUtil.setPosition(this._container, mapPosition);
    
          // Add and position children elements if needed
    
          // CHANGE ABSOLUTE POSITION TO INSTEAD DEAL WITH RESIZING DIV TO MAINTAIN DIV BOUNDS ON ZOOM!!
          if (absolutePosition) map.on('zoom viewreset', this._update, this, map);
      },
    
      onRemove: function(map) {
          L.DomUtil.remove(this._container);
          if (absolutePosition) map.off('zoom viewreset', this._update, this, map);
      },
    
      _update: function() {
          // Recalculate position of container
          let mapPosition = this._map.latLngToLayerPoint(position);
          L.DomUtil.setPosition(this._container, mapPosition);   
  
          // Add/remove/reposition children elements if needed
      }
    });
    
    L.customlayer = function (args) {
      return new L.CustomLayer(args);
    }

    L.customlayer({
      layerName: layerName,
      absolutePosition: absolutePosition
    }).addTo(map);

    return L.customlayer;
  },

  didInsertElement() {
    this._super(...arguments);
    this.set('layerReady', true);
  },

  // test: computed('map', function () {
  //     debugger;
  //     let map = this.get('map');
  //     return map;
  // }),
});

// L.CustomLayer = L.Layer.extend(args, {
//   onAdd: function (map) {
//       let pane = map.getPane(this.options.pane);
//       debugger;
//       this._container = L.DomUtil.create(layerName);

//       pane.appendChild(this._container);

//       // Calculate initial position of container with `L.Map.latLngToLayerPoint()`, `getPixelOrigin()` and/or `getPixelBounds()`

//       // L.DomUtil.setPosition(this._container, point);
//       L.DomUtil.setPosition(this._container, [0, 0]);

//       // Add and position children elements if needed

//       if (absolutePosition) map.on('zoomend viewreset', this._update, this);
//   },

//   onRemove: function(map) {
//       L.DomUtil.remove(this._container);
//       if (absolutePosition) map.off('zoomend viewreset', this._update, this);
//   },

//   _update: function() {
//       // Recalculate position of container
//       debugger;

//       L.DomUtil.setPosition(this._container, point);        

//       // Add/remove/reposition children elements if needed
//   }
// });

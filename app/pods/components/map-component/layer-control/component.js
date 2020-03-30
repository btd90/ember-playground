import LayerControl from 'ember-leaflet-layer-control/components/layer-control';
import {
  computed
} from '@ember/object';

/**
 * Override of layer control plugin
 * 
 */
export default LayerControl.extend({

  layers: computed.alias('_target.childComponents'),
  baseLayers: computed.filter('layers', function(layer, index, arry) {
    return layer.baselayer;
  }),
  mapLayers: computed.filter('layers', function(layer, index, arry) {
    return !layer.baselayer && layer.attrs.name;
  }),

  computeMapLayers: computed('mapLayers.length', function() {
    let mapLayers = this.get('mapLayers');
    let desired = mapLayers.filter(function(layer) {
      return layer.attrs.name === 'DynamicPoints';
    });
    debugger;

    if(desired.length) {
      //let map = this.get('_layer');
      //let map = L.map();
      let instance = this._layer;
      let mapInstance = instance._map;


      ///
      /// TRY FETCHING MAPLAYERS FROM 'map'???
      ///

      //let test = L.markerClusterGroup();
      let test = L.layerGroup();
      test.addLayer(desired.get(0)._layer);

      let overlayMaps = {
        "Dynamic Points": test
      };

      //map.addLayer(test);
      //map.addOverlay(overlayMaps);


      // remove the current control panel
      //mapInstance.removeControl(mapInstance._controlContainer);
      debugger;
      L.control.layers({}, overlayMaps).addTo(mapInstance);



      // add one with the cities
      //let citiesControl = L.control.layers({}, overlayMaps).addTo(L.map);
  
      //L.control.layers({}, overlayMaps).addTo(map);
      //L.control.layers().addOverlay(desired.get(0));


      //
      // TO REMOVE CONTROL
      // let map = this._layer._map
      // map.removeControl(map._controlContainer)
      //
    }


    return this.get('mapLayers.length');
  }),

  computeBaseLayers: computed('baseLayers.length', function() {
    return this.get('baseLayers.length');
  }),

  init() {
    this._super(...arguments);
    console.log("init");
  },

  didReceiveAttrs() {
    this._super(...arguments);
    console.log("didReceiveAttrs");
  },

  didInsertParent() {
    this._super(...arguments);
    console.log("didInsertParent");
  },

  didRender() {
    this._super(...arguments);
    console.log("didRender");
  },

  didUpdate() {
    this._super(...arguments);
    console.log("didUpdate");
  },

  didUpdateAttrs() {
    this._super(...arguments);
    console.log("didUpdateAttrs");
  },

  rerender() {
    this._super(...arguments);
    console.log("rerender");
  },

  willDestroy() {
    debugger;
    this._super(...arguments);
    console.log("willDestroy");
  },

  willRender() {
    this._super(...arguments);
    console.log("willRender");
  },

  willUpdate() {
    debugger;
    this._super(...arguments);
    console.log("willUpdate");
  },

});
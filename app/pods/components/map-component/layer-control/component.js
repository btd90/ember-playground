import LayerControl from 'ember-leaflet-layer-control/components/layer-control';
import {
  computed,
} from '@ember/object';
import { A } from '@ember/array';

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

  computeMapLayers: computed('mapLayers.length', 'baseLayers.length', function() {
    // Get all current layers and map instance
    let mapLayers = this.get('mapLayers');
    let baseLayers = this.get('baseLayers');
    let instance = this._layer;

    // Update them if valid
    if(instance && mapLayers.length && baseLayers.length) {
      let currentLayers = instance._layers;

      debugger;
      let map = instance._map;

      // Add all current basemaps
      let baseMaps = {};
      baseLayers.forEach(function(value){
        //baseMaps[value.name] = value._layer._layer
      });
      
      // Add all current layers
      let overlayMaps = {};
      mapLayers.forEach(function(value){
        instance.addOverlay(value._layer, value.name)
        //overlayMaps[value.name] = value._layer
      });

      // let curr = L.control.layers();
      // curr.addOverlay(mapLayers.get(0)._layer, "test");
      //instance.addOverlay(mapLayers.get(0)._layer, "test")

      // PARTIALLY REMOVES EXISTING
      //mainInstance._layersLink.remove()
      //map._controlCorners.topright.remove()
      // ADD REPLACEMENT

      // Create new layer control
      //let testControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

      debugger;
      
    }


    return this.get('mapLayers.length');
  }),

  computeMapLayers1: computed('mapLayers.length', function() {
    let mapLayers = this.get('mapLayers');

    //current layers on map
    let mainInstance = this._layer;
    if(mainInstance && mapLayers.length > 0) {
      let mapLayerz = mainInstance._layers;
      let mapIns = mainInstance._map;
      let test1 = A();


      let obj = {};

      // mapLayers.forEach(function(value, key){
      //     obj[key] = value
      // });
      mapLayers.forEach(function(value, key){
          obj[value.name] = value._layer
      });
      // for(let i=0; i<mapLayers.length; i++) {
      //   let curr = mapLayers[i];
      //   obj[curr.name]: curr._layer,
      // }

      // for(let i=0; i<mapLayerz.length; i++) {
      //   test1.push(mapLayerz[i].layer);
      // }
      let overlayMaps = {
        "a": mapLayers.get(3)._layer,
        "1": mapLayerz[0].layer,
        "2": mapLayerz[1].layer,
        "3": mapLayerz[2].layer,
        "4": mapLayerz[3].layer,
      };

      mainInstance._layerControlInputs.addObject({
        "a": mapLayerz[1].layer,
      });

      // PARTIALLY REMOVES EXISTING
      //mainInstance._layersLink.remove()
      //mapIns._controlCorners.topright.remove()
      // ADD REPLACEMENT
      L.control.layers({}, obj).addTo(mapIns);
    }





    let desired = mapLayers.filter(function(layer) {
      return layer.attrs.name === 'DynamicPoints';
    });

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
      instance._layerControlInputs.addObject(overlayMaps);

      //map.addLayer(test);
      //map.addOverlay(overlayMaps);


      // remove the current control panel
      //mapInstance.removeControl(mapInstance._controlContainer);
      //mapInstance._controlCorners.topright.remove()
      debugger;
      //L.control.layers({}, overlayMaps).addTo(mapInstance);



      // add one with the cities
      //let citiesControl = L.control.layers({}, overlayMaps).addTo(L.map);
  
      //L.control.layers({}, overlayMaps).addTo(map);
      //L.control.layers().addOverlay(desired.get(0));


      //
      // TO REMOVE CONTROL
      // let map = this._layer._map
      // map.removeControl(map._controlContainer)
      //
      // TO REMOVE JUST LAYER CONTROL
      // map._controlCorners.topright.remove()
      //
      // OR (probably better approach)
      // this._layer._layersLink.remove()
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
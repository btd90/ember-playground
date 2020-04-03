import LayerControl from "ember-leaflet-layer-control/components/layer-control";
import { computed, observer } from "@ember/object";
import { isEmpty } from '@ember/utils';
import { A } from "@ember/array";

/**
 * Override of layer control plugin
 */
export default LayerControl.extend({
  renderTrigger: false,
  layers: computed.alias("_target.childComponents"),
  baseLayers: computed.filter("layers", function(layer, index, arry) {
    return layer.baselayer;
  }),
  mapLayers: computed.filter("layers", function(layer, index, arry) {
    return !layer.baselayer && layer.attrs.name;
  }),

  // testState: computed.mapBy('mapLayers', '_state'),

  // test1: observer('testState', function() {
  //   debugger;
  //   let testStates = this.get('testState');
  //   // return new Date();
  //   // if(testStates.length) {
  //     return this.get('mapLayers');
  //   // }
  // }),



  // test111: computed('mapLayers.length', function() {
  //   let test = A();
  //   debugger;
  //   this.get('mapLayers').forEach(map => {
  //     // let testA = Ember.copy(map);
  //     // console.info(testA);
  //     test.push(map);
  //     // if(map._state === 'inDOM') {
  //     //   test.push(map);
  //     // }
  //   })
  //   return test;
  //   // if(this.get('mapLayers').length) {
      
  //   //   return this.get('mapLayers').mapBy('_state');
  //   // }
  // }),

  // test2: observer('test111', function() {
  //   console.log(this.get('test111'));
  // }),

  // layerStates: computed.oneWay('mapLayers.@each._state', function() {
  //   let mapLayers = this.get('mapLayers');

  //   //filter instead and ensure no results
  //   let layerCheck = mapLayers.filter(function(layer) {
  //     if(layer.name && layer._layer) {
  //       if(layer._state === 'inDOM') {
  //         console.info(layer._state);
  //         return true;
  //       }
  //     }
  //  });

  //  debugger;

  //   if(layerCheck.length === mapLayers.length) {
  //     return mapLayers;
  //   } else {
  //     return new Date();
  //   }

  //   // mapLayers.forEach(layer => {
  //   // });

  // }),

  //compute all the way down
  // firstLevel: computed.mapBy('mapLayers._layer', )


  // let grandparents = { some complex object }
 
  // _aliveParents: computed.mapBy(‘grandparent.parents’, ‘alive’)
   
  // _aliveParentsAge: computed.mapBy(‘_aliveParents’, ‘age’)
   
  // finalResults: computed(‘_aliveParentsAge.@each.isDoubleDigits’, function() {}


  // test: Ember.observer('computeMapLayers', function(){
  //   this.get('computeMapLayers');
  //   console.info("AA");
  // }).on('willRender'),

  // test22: observer('computeMapLayers', function() {
  //   console.log(this.get('computeMapLayers'));
  // }),

  computedLayers: computed(
    "mapLayers.length",
    "baseLayers.length",
    function() {
      // Get all current layers and map instance
      let mapLayers = this.get("mapLayers");
      let baseLayers = this.get("baseLayers");
      let instance = this._layer;

      // Update them if valid
      if (instance && mapLayers.length && baseLayers.length) {
        let currentLayers = instance._layers;
        let currentBaseLayers = currentLayers
          .filter(layer => !layer.overlay)
          .mapBy("name");
        let currentMapLayers = currentLayers
          .filter(layer => layer.overlay)
          .mapBy("name");

        // Add missing map layers
        mapLayers.filter(function(value) {
          if (!currentMapLayers.includes(value.name) && value._layer) {
            instance.addOverlay(value._layer, value.name);
          }
        });

        // Add missing base layers
        baseLayers.filter(function(value) {
          if (!currentBaseLayers.includes(value.name)) {
            instance.addBaseLayer(value._layer._layer, value.name);
          }
        });

        // Remove from layer control if no longer on map
        currentLayers.filter(function(value) {
          if (
            !mapLayers.mapBy("name").includes(value.name) &&
            !baseLayers.mapBy("name").includes(value.name)
          ) {
            instance.removeLayer(value.layer);
          }
        });
      }
      // return this.get("mapLayers.length");
    }
  ),

  computeMapLayers1: computed("mapLayers.length", function() {
    let mapLayers = this.get("mapLayers");

    //current layers on map
    let mainInstance = this._layer;
    if (mainInstance && mapLayers.length > 0) {
      let mapLayerz = mainInstance._layers;
      let mapIns = mainInstance._map;
      let test1 = A();

      let obj = {};

      // mapLayers.forEach(function(value, key){
      //     obj[key] = value
      // });
      mapLayers.forEach(function(value, key) {
        obj[value.name] = value._layer;
      });
      // for(let i=0; i<mapLayers.length; i++) {
      //   let curr = mapLayers[i];
      //   obj[curr.name]: curr._layer,
      // }

      // for(let i=0; i<mapLayerz.length; i++) {
      //   test1.push(mapLayerz[i].layer);
      // }
      let overlayMaps = {
        a: mapLayers.get(3)._layer,
        "1": mapLayerz[0].layer,
        "2": mapLayerz[1].layer,
        "3": mapLayerz[2].layer,
        "4": mapLayerz[3].layer
      };

      mainInstance._layerControlInputs.addObject({
        a: mapLayerz[1].layer
      });

      // PARTIALLY REMOVES EXISTING
      //mainInstance._layersLink.remove()
      //mapIns._controlCorners.topright.remove()
      // ADD REPLACEMENT
      L.control.layers({}, obj).addTo(mapIns);
    }

    let desired = mapLayers.filter(function(layer) {
      return layer.attrs.name === "DynamicPoints";
    });

    if (desired.length) {
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

    return this.get("mapLayers.length");
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

    // debugger;
    // this.get('test111');
    // this.get('computeMapLayers');
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
    this._super(...arguments);
    console.log("willDestroy");
  },

  willRender() {
    this._super(...arguments);
    console.log("willRender");
  },

  willUpdate() {
    this._super(...arguments);
    console.log("willUpdate");
  }
});

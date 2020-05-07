import LayerControl from "ember-leaflet-layer-control/components/layer-control";
import { computed } from "@ember/object";
import {
  A
} from '@ember/array';

/**
 * Override of layer control plugin to handle updating layer/basemap list
 */
export default LayerControl.extend({

  init() {
    this._super(...arguments);
    // this.set('imageLayerName', 'Images');
    // this.set('videoLayerName', 'Videos');
    // this.set('imageOverlaysGroup', L.layerGroup());
    // this.set('videoOverlaysGroup', L.layerGroup());
  },

  layers: computed.alias("_target.childComponents"),
  baseLayers: computed.filter("layers", function(layer) {
    return layer.baselayer;
  }),
  mapLayers: computed.filter("layers", function(layer) {
    return !layer.baselayer && layer.attrs.name;
  }),

  computedLayers: computed(
    "mapLayers.length",
    "baseLayers.length",
    "imageOverlays.count",
    "videoOverlays.count",
    function() {
      // Get all current layers and map instance
      let mapLayers = this.get("mapLayers");
      let baseLayers = this.get("baseLayers");
      let imageOverlays = this.get("imageOverlays");
      let videoOverlays = this.get("videoOverlays");
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

        // Image overlays
        if (imageOverlays.count > 0) {
          let imageOverlaysGroup = imageOverlays.overlayGroup;
          let layerName = imageOverlays.overlayName;

          // Add missing images to overlay
          // imageOverlays.forEach(overlay => {
          //   if (!imageOverlaysGroup.hasLayer(overlay)) {
          //     overlay.addTo(imageOverlaysGroup);
          //   }
          // });

          // Add Image overlay if not present 
          // if (!currentLayers.mapBy('name').includes(layerName)) {
            // debugger;
          instance.addOverlay(imageOverlays.overlayGroup, imageOverlays.overlayName);
          // }
          // debugger;
          // instance.addBaseLayer(imageOverlaysGroup);
          // imageOverlaysGroup.addTo(instance);
        }

        // Video overlays
        if (videoOverlays.count > 0) {
            instance.addOverlay(videoOverlays.overlayGroup, videoOverlays.overlayName);
        }
      }
    }
  ),
});


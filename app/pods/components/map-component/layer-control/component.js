import LayerControl from "ember-leaflet-layer-control/components/layer-control";
import { computed } from "@ember/object";
import {
  isEmpty,
} from '@ember/utils';

/**
 * Override of layer control plugin to handle updating layer/basemap list
 */
export default LayerControl.extend({
  layers: computed.alias("parentComponent.childComponents"),
  baseLayers: computed.filter("layers", function(layer) {
    return layer.baselayer;
  }),
  mapLayers: computed.filter("layers", function(layer) {
    return !layer.baselayer && layer.attrs.name;
  }),
  otherOverlays: computed.filter("layers", function(layer) {
    return layer.imageOverlays && layer.videoOverlays;
  }),

  computedLayers: computed(
    "mapLayers.length",
    "baseLayers.length",
    "componentOverlays.length",
    "imageOverlays.count",
    "videoOverlays.count",
    function() {
      // Get all current layers and map instance
      let mapLayers = this.get("mapLayers");
      let baseLayers = this.get("baseLayers");
      let componentOverlays = this.get("componentOverlays");
      let imageOverlays = this.get('imageOverlays');
      let videoOverlays = this.get('videoOverlays');
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

        // Add additional component overlays to layer control
        componentOverlays.filter(function(value) {
          if (value.name && !isEmpty(value._layers) && !currentMapLayers.includes(value.name)) {
            instance.addOverlay(value, value.name);
          }
        });

        // Add additional image overlays
        if(imageOverlays && imageOverlays.count > 0 && !currentMapLayers.includes(imageOverlays.overlayName)) {
          instance.addOverlay(imageOverlays.overlayGroup, imageOverlays.overlayName);
        }
        
        // Add additional video overlays
        if(videoOverlays && videoOverlays.count > 0 && !currentMapLayers.includes(videoOverlays.overlayName)) {
          instance.addOverlay(videoOverlays.overlayGroup, videoOverlays.overlayName);
        }

        // Remove from layer control if no longer on map
        currentLayers.filter(function(value) {
          let currentLayer = value.layer;
          if (
            !mapLayers.mapBy("name").includes(value.name) &&
            !baseLayers.mapBy("name").includes(value.name) &&
            !componentOverlays.mapBy("name").includes(value.name) &&
            !(imageOverlays && imageOverlays.overlayName === value.name) &&
            !(videoOverlays && videoOverlays.overlayName === value.name)
          ) {
            instance.removeLayer(currentLayer);
          }
        });
      }
    }
  ),
});


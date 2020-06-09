import LayerControl from "ember-leaflet-layer-control/components/layer-control";
import { computed } from "@ember/object";

/**
 * Override of layer control plugin to handle updating layer/basemap list
 */
export default LayerControl.extend({
  layers: computed.alias("_target.childComponents"),
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
    "otherOverlays.@each.{imageOverlays,videoOverlays}",
    function() {
      // Get all current layers and map instance
      let mapLayers = this.get("mapLayers");
      let baseLayers = this.get("baseLayers");
      let otherOverlays = this.get("otherOverlays");
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

        // Add additional missing overlays to layer control
        otherOverlays.filter(function(value) {
          // Add missing image overlay
          if (value.imageOverlays.count && !currentMapLayers.includes(value.imageOverlays.overlayName)) {
            instance.addOverlay(value.imageOverlays.overlayGroup, value.imageOverlays.overlayName);
          }

          // Add missing video overlay
          if (value.videoOverlays.count && !currentMapLayers.includes(value.videoOverlays.overlayName)) {
            instance.addOverlay(value.videoOverlays.overlayGroup, value.videoOverlays.overlayName);
          }
        });

        // Remove from layer control if no longer on map
        currentLayers.filter(function(value) {
          if (
            !mapLayers.mapBy("name").includes(value.name) &&
            !baseLayers.mapBy("name").includes(value.name) &&
            !otherOverlays.mapBy('imageOverlays.overlayName').includes(value.name) &&
            !otherOverlays.mapBy('videoOverlays.overlayName').includes(value.name) 
          ) {
            instance.removeLayer(value.layer);
          }
        });
      }
    }
  ),
});


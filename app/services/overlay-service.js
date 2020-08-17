import Service from '@ember/service';
import { computed } from "@ember/object";
/**
 * Service to aid overlays on map.
 */
export default Service.extend({

  init() {
    this._super(...arguments);
    this.set('leaflet', window.L)

    this.set('got', 
      this.get('leaflet').tileLayer('https://cartocdn-gusc.global.ssl.fastly.net//ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png', {
      zIndex: 1
    }));
  },

  // Compute corner lat/lng for overlay
  _computeOuterLatLng: function (map, originLatLng, xCoOrd, yCoOrd) {
    // Convert LatLng into container pixel position
    let originPoint = map.latLngToContainerPoint(originLatLng);

    // Add image pixel dimensions
    let nextCornerPoint = originPoint.add({
      x: xCoOrd,
      y: yCoOrd
    });

    // Convert back into LatLng
    return map.containerPointToLatLng(nextCornerPoint);
  },

  // Updates original image overlays object with new overlay
  updateImageOverlay: function (map, imageOverlaysGroup, originLatLng, xCoOrd, yCoOrd, url) {
    // Compute opposite corner lat/lng
    let nextCornerLatLng = this._computeOuterLatLng(map, originLatLng, xCoOrd, yCoOrd);

    // Add building to images layer
    let overlay = this.get('leaflet').imageOverlay(
      url, [originLatLng, [nextCornerLatLng.lat, nextCornerLatLng.lng]], {
        interactive: true
      });
    overlay.addTo(imageOverlaysGroup);

    // Add updated layer group to map
    map.addLayer(imageOverlaysGroup);

    // Add click handler to overlay
    let imageElement = overlay.getElement();
    imageElement.addEventListener('click', this.imageClick, this);

    return imageOverlaysGroup;
  },

  // Click action for image overlays
  imageClick: function ( /* image */ ) {
    // unused
  },

  // Updates original video overlays object with new overlay
  updateVideoOverlay: function (map, videoOverlaysGroup, originLatLng, xCoOrd, yCoOrd, url) {
    // Compute opposite corner lat/lng
    let nextCornerLatLng = this._computeOuterLatLng(map, originLatLng, xCoOrd, yCoOrd);

    // Add takeoff to videos layer
    let overlay = this.get('leaflet').videoOverlay(
      url, [originLatLng, [nextCornerLatLng.lat, nextCornerLatLng.lng]], {
        interactive: true
      });
    overlay.addTo(videoOverlaysGroup);

    // Add updated layer group to map, and update videoOverlays object
    map.addLayer(videoOverlaysGroup);

    // Add click handler to overlay
    let videoElement = overlay.getElement();
    videoElement.addEventListener('click', this.videoClick, this);

    return videoOverlaysGroup;
  },

  // Click action for video overlays
  videoClick: function (video) {
    video.target.play();
  },

  mexicoSVG: computed(function() {
    let leaflet = this.get('leaflet');
    return {
      "layerId": "mexicoLayer",
      "startLocation": "bottomLeft",
      "endLocation": "topRight",
      "upperBoundary": leaflet.latLng(71,20),
      "lowerBoundary": leaflet.latLng(9,83),
      "upperBoundaryMarker": leaflet.latLng(9,20),
      "lowerBoundaryMarker": leaflet.latLng(71,83),
      "stroke": "black",
      "strokeWidth": "1",
    }
  }),

  antarcticaSVG: computed(function() {
    let leaflet = this.get('leaflet');
    return {
      "layerId": "antarcticaLayer",
      "startLocation": "bottomRight",
      "endLocation": "topLeft",
      "upperBoundary": leaflet.latLng(22,-104),
      "lowerBoundary": leaflet.latLng(-30,23),
      "upperBoundaryMarker": leaflet.latLng(22,-104),
      "lowerBoundaryMarker": leaflet.latLng(-30,23),
      "stroke": "black",
      "strokeWidth": "1",
    };
  }),

  russiaSVG: computed(function() {
    let leaflet = this.get('leaflet');
    return {
      "layerId": "russiaLayer",
      "startLocation": "topRight",
      "endLocation": "bottomLeft",
      "upperBoundary": leaflet.latLng(35,84),
      "lowerBoundary": leaflet.latLng(20,137),
      "upperBoundaryMarker": leaflet.latLng(35,137),
      "lowerBoundaryMarker": leaflet.latLng(20,84),
      "stroke": "black",
      "strokeWidth": "2",
    };
  }),

  indiaSVG: computed(function() {
    let leaflet = this.get('leaflet');
    return {
      "layerId": "indiaLayer",
      "startLocation": "topRight",
      "endLocation": "bottomLeft",
      "upperBoundary": leaflet.latLng(-31,88),
      "lowerBoundary": leaflet.latLng(-68,121),
      "upperBoundaryMarker": leaflet.latLng(-31,121),
      "lowerBoundaryMarker": leaflet.latLng(-68,88),
      "stroke": "black",
      "strokeWidth": "2",
    };
  }),
});

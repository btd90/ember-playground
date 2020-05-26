import Service from '@ember/service';

/**
 * Service to aid overlays on map.
 */
export default Service.extend({

  init() {
    this._super(...arguments);
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
    let overlay = L.imageOverlay(
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
    let overlay = L.videoOverlay(
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
});

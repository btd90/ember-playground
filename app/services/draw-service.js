import Service from '@ember/service';
import {
  A
} from '@ember/array';

/**
 * Service to aid drawing on map.
 */
export default Service.extend({

  init() {
    this._super(...arguments);
  },

  /* Construct draw objects for draw-object component */
  buildDrawObjects: function (newLayers) {
    let builtObjects = A();

    // Fetch each object
    Object.keys(newLayers).forEach(key => {
      let layer = newLayers[key];
      if (layer._latlngs) {
        if (layer._latlngs.length > 1) {
          builtObjects.pushObject({
            name: 'polyline',
            type: 'polyline',
            latlngs: layer._latlngs
          });
        } else {
          builtObjects.pushObject({
            name: 'polygon',
            type: 'polygon',
            latlngs: layer._latlngs
          });
        }
      } else if (layer._mRadius) {
        builtObjects.pushObject({
          name: 'circle',
          type: 'circle',
          latlng: layer._latlng,
          mRadius: layer._mRadius
        });
      } else if (layer._radius) {
        builtObjects.pushObject({
          name: 'circlemarker',
          type: 'circlemarker',
          latlng: layer._latlng,
          radius: layer._radius
        });
      } else if (layer._latlng) {
        builtObjects.pushObject({
          name: 'marker',
          type: 'marker',
          latlng: layer._latlng
        });
      } else {
        // Unsupported Shape
      }
    });
    return builtObjects;
  },
});

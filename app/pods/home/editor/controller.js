import Controller from '@ember/controller';
import {
  computed
} from '@ember/object';
import {
  A
} from '@ember/array';

/**
 * Controller for home editor route.
 */
export default Controller.extend({

  saveEvent: false,

  actions: {
    changeSelection(selection) {
      this.set('chosenName', selection);
    },
    toggleSave() {
      // Trigger save
      this.set('saveEvent', !this.get('saveEvent'));
    }
  },

  names: computed(function () {
    return A();
  }),

  points: computed(function () {
    return A();
  }),

  geojson: computed(function () {
    let geojson = A();
    geojson.pushObject(this.get('markerGeo'));
    return geojson
  }),

  markerGeo: computed(function () {
    return {
      "type": "Feature",
      "properties": {
        "name": "GeoJSON Marker",
        "amenity": "Football Stadium",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [151.99404, -26.75621]
      }
    }
  }),
});

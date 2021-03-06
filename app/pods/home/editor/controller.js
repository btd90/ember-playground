import HomeController from '../controller';
import {
  computed
} from '@ember/object';
import {
  A
} from '@ember/array';

/**
 * Controller for home editor route.
 */
export default HomeController.extend({
  queryParams: ['disabled'],

  init() {
    this._super(...arguments);

    this.set('disabled', false);
    this.set('saveEvent', false);
    this.set('saveButtonText', 'Save');
    this.set('latitude', '-25.3444');
    this.set('longitude', '131.0369');
    this.set('zoom', '1');
  },

  actions: {
    changeSelection(selection) {
      this.set('destinationChoice', selection);
    },
    toggleSave() {
      this.set('saveEvent', !this.get('saveEvent'));
    },
    // MAP LAYER CONTROL EVENTS
    layerControlEvent(event) {
      return event;
    }
  },

  options: computed(function () {
    return ['Australia', 'Japan', 'Russia', 'New Zealand', 'Winterfell'];
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
      },
      "geometry": {
        "type": "Point",
        "coordinates": [151.99404, -26.75621]
      }
    }
  }),
});

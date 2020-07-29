import HomeController from '../controller';
import {
  computed
} from '@ember/object';
import {
  A
} from '@ember/array';

/**
 * Controller for home flights v2 route.
 */
export default HomeController.extend({
  queryParams: ['disabled'],

  init() {
    this._super(...arguments);
    let leaflet = window.L;
  
    this.set('disabled', false);
    this.set('takeOff', false);
    this.set('componentButtonText', 'Start Flight Demo');
    this.set('latitude', '20');
    this.set('longitude', '40');
    this.set('zoom', '1');

    this.set('layerGroupName', 'Flights');
    this.set('firstLayerId', 'firstComponentLayer');
    this.set('upperLeftSVG', leaflet.latLng(30,-245));
    this.set('lowerRightSVG', leaflet.latLng(-30,-65));
  },

  actions: {
    takeOff() {
      this.set('takeOff', true);
    },
    toggleBurger() {
      this._super();
    },
    // MAP LAYER CONTROL EVENTS
    layerControlEvent(event) {
      return event;
    }
  },

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
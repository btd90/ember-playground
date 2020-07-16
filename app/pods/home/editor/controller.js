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
    let leaflet = window.L;
  
    this.set('disabled', false);
    this.set('saveEvent', false);
    this.set('componentsEnabled', false);
    this.set('takeOff', false);
    this.set('saveButtonText', 'Save');
    this.set('componentButtonText', 'Enable Components on Map');
    this.set('latitude', '-25.3444');
    this.set('longitude', '131.0369');
    this.set('zoom', '1');

    this.set('layerGroupName', 'Components');
    this.set('firstLayerId', 'firstComponentLayer');
    this.set('firstLayerLatitude', '-39');
    this.set('firstLayerLongitude', '54');
    this.set('firstLayerButtonText', 'Toggle Menu');
    this.set('secondLayerId', 'secondComponentLayer');
    this.set('secondLayerLatitude', '55');
    this.set('secondLayerLongitude', '-187');
    this.set('secondLayerButtonText', 'Takeoff!');
    this.set('thirdLayerId', 'thirdComponentLayer');
    this.set('fourthLayerId', 'fourthComponentLayer');
    this.set('upperLeftSVG', leaflet.latLng(30,-245));
    this.set('lowerRightSVG', leaflet.latLng(-30,-65));
    this.set('upperLeft', leaflet.latLng(50,153));
    this.set('lowerRight', leaflet.latLng(3,231));
  },

  actions: {
    changeSelection(selection) {
      this.set('destinationChoice', selection);
    },
    toggleSave() {
      this.set('saveEvent', !this.get('saveEvent'));
    },
    enableComponents() {
      this.set('componentsEnabled', true);
    },
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

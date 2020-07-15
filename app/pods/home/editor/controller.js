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
  
  disabled: false,
  saveEvent: false,
  componentsEnabled: false,
  takeOff: false,
  saveButtonText: 'Save',
  componentButtonText: 'Enable Components on Map',
  latitude: '-25.3444',
  longitude: '131.0369',
  zoom: '1',

  layerGroupName: 'Components',
  firstLayerId: 'firstComponentLayer',
  firstLayerLatitude: '-39',
  firstLayerLongitude: '54',
  firstLayerButtonText: 'Toggle Menu',
  secondLayerId: 'secondComponentLayer',
  secondLayerLatitude: '55',
  secondLayerLongitude: '-187',
  secondLayerButtonText: 'Takeoff!',
  thirdLayerId: 'thirdComponentLayer',
  fourthLayerId: 'fourthComponentLayer',
  upperLeftSVG: L.latLng(30,-245),
  lowerRightSVG: L.latLng(-30,-65),
  upperLeft: L.latLng(50,153),
  lowerRight: L.latLng(3,231),

  init() {
    this._super(...arguments);
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

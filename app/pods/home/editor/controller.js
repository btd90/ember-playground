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
  saveButtonText: 'Save',
  componentButtonText: 'Enable Components on Map',
  latitude: '-25.3444',
  longitude: '131.0369',
  zoom: '1',

  // Change to render svg graph and a button??
  layerGroupName: 'Components',
  firstLayerId: 'firstComponentLayer',
  firstLayerLatitude: '30',
  firstLayerLongitude: '30',
  firstLayerButtonText: 'Save1',
  secondLayerId: 'secondComponentLayer',
  secondLayerLatitude: '0',
  secondLayerLongitude: '0',
  secondLayerButtonText: 'Save2',
  thirdLayerId: 'thirdComponentLayer',
  upperLeft: L.latLng(30,-200),
  lowerRight: L.latLng(-30,-50),

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
    // MAP LAYER CONTROL EVENTS
    layerControlEvent(event) {
      return event;
    },
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

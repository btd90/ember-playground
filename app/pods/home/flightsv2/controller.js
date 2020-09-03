import HomeController from '../controller';
import {
  computed
} from '@ember/object';
import {
  A
} from '@ember/array';
import {
  inject as service
} from '@ember/service';

/**
 * Controller for home flights v2 route.
 */
export default HomeController.extend({
  queryParams: ['disabled'],
  overlayService: service(),
  // stour: service('tours/flightsv2-tour'),

  init() {
    this._super(...arguments);

    // Initialize the shepherd tour
    // this.get('stour').setupTour();

    this.set('disabled', false);
    this.set('takeOff', false);
    this.set('latitude', '20');
    this.set('longitude', '40');
    this.set('zoom', '1');
    this.set('buttonText', 'Start Flight Demo');
    this.set('layerGroupName', 'Flights');

    // Add flights
    this.set('mexicoSVG', this.get('overlayService').mexicoSVG);
    this.set('antarcticaSVG', this.get('overlayService').antarcticaSVG);
    this.set('russiaSVG', this.get('overlayService').russiaSVG);
    this.set('indiaSVG', this.get('overlayService').indiaSVG);
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
    return A();
  }),
});

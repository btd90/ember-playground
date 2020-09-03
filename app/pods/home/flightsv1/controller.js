import HomeController from '../controller';
import {
  inject as service
} from '@ember/service';

/**
 * Controller for home flights v1 route.
 */
export default HomeController.extend({
  queryParams: ['disabled'],
  // tour: service('tours/flightsv1-tour'),

  init() {
    this._super(...arguments);

    // Initialize the shepherd tour
    // this.get('tour').setupTour();

    this.set('disabled', false);
    this.set('flightDemo', false);
    this.set('buttonText', 'Start Flight Demo');
    this.set('latitude', '20');
    this.set('longitude', '40');
    this.set('zoom', '1');
  },

  actions: {
    toggleFlightDemo() {
      this.set('flightDemo', true);
    },
    // MAP LAYER CONTROL EVENTS
    layerControlEvent(event) {
      return event;
    }
  },
});

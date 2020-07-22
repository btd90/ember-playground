import HomeController from '../controller';

/**
 * Controller for home flights v1 route.
 */
export default HomeController.extend({
  queryParams: ['disabled'],
  
  init() {
    this._super(...arguments);

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

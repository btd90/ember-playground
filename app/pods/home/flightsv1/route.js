import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

/**
 * Flights v1 route file.
 */
export default Route.extend({
  playgroundtourService: service(),

  setupController: async function (controller, model) {
    this._super(controller, model);

    // Prepare tour
    await this.get('playgroundtourService').prepareTour('flightsv1');
  },
});

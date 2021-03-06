import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

/**
 * Editor route file.
 */
export default Route.extend({
  playgroundtourService: service(),

  setupController: async function (controller, model) {
    this._super(controller, model);

    // Prepare tour
    await this.get('playgroundtourService').prepareTour('editor');
  },
});

import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

/**
 * Controller for home route.
 */
export default Controller.extend({
  burgermenuService: service(),
  playgroundtour: service(),

  init() {
    this._super(...arguments);
  },

  actions: {
    toggleBurger() {
      this.get('burgermenuService').toggleBurger();
    },
    toggleTour() {
      this.get('tour').start();
    },
  },
});

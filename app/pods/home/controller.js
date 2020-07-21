import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

/**
 * Controller for home route.
 */
export default Controller.extend({
  burgermenuService: service(),

  actions: {
    toggleBurger() {
      this.get('burgermenuService').toggleBurger();
    },
  },
});

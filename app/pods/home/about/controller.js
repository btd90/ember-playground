import HomeController from '../controller';
import {
  inject as service
} from '@ember/service';

/**
 * Controller for home about route.
 */
export default HomeController.extend({
  // tour: service('tours/about-tour'),

  init() {
    this._super(...arguments);

    // Initialize the shepherd tour
    // this.get('tour').setupTour();
  }
});

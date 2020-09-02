import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

/**
 * About route file.
 */
export default Route.extend({

  abouttourService: service('tours/generic2-tour'),

  setupController: function (controller, model) {
    this._super(controller, model);

    // Set applicable tour for the parent
    this.get('parentController').set('routeTour', this.get('abouttourService'));
  },

  parentController: Ember.computed(function () {
    return this.controllerFor('home');
  }),
});

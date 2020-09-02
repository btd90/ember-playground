import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

/**
 * Flights v1 route file.
 */
export default Route.extend({

  flightsv1tourService: service('tours/flightsv1-tour'),

  setupController: function (controller, model) {
    this._super(controller, model);

    // Set applicable tour for the parent
    this.get('parentController').set('routeTour', this.get('flightsv1tourService'));
  },

  parentController: Ember.computed(function () {
    return this.controllerFor('home');
  }),
});

import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

/**
 * Index route file.
 */
export default Route.extend({

  indextourService: service('tours/generic-tour'),

  setupController: function (controller, model) {
    this._super(controller, model);

    // Set applicable tour for the parent
    this.get('parentController').set('routeTour', this.get('indextourService'));
  },

  parentController: Ember.computed(function () {
    return this.controllerFor('home');
  }),
});

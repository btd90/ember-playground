import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

/**
 * Editor route file.
 */
export default Route.extend({

  editortourService: service('tours/editor-tour'),

  setupController: function (controller, model) {
    this._super(controller, model);

    // Set applicable tour for the parent
    this.get('parentController').set('routeTour', this.get('editortourService'));
  },

  parentController: Ember.computed(function () {
    return this.controllerFor('home');
  }),
});

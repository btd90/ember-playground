import Service from '@ember/service'
import {
  inject as service
} from '@ember/service';
import {
  scheduleOnce
} from '@ember/runloop';

export default Service.extend({
  tour: service(),

  generic: service('tours/generic-service'),
  index: service('tours/index-service'),
  editor: service('tours/editor-service'),
  flightsv1: service('tours/flightsv1-service'),
  flightsv2: service('tours/flightsv2-service'),
  about: service('tours/about-service'),

  init() {
    this._super(...arguments);
    this.resetDefaults(this.tour);
  },

  // Clear out existing tour configuration
  resetDefaults: function (tour) {
    // Set step defaults
    let defaultStepOptions = {
      classes: 'shepherd-theme-arrows custom-default-class',
      scrollTo: {
        behavior: 'smooth',
        block: 'center'
      },
      cancelIcon: {
        enabled: true
      }
    };

    // Set tour defaults
    let tourDefaults = {
      defaultStepOptions,
      disableScroll: true,
      modal: true,
      styleVariables: {
        // Shepherd theme overrides
        shepherdTextBackground: '#3d2f53',
        shepherdThemePrimary: '#624b86',
        shepherdThemeSecondary: '#c8c7d5'
      }
    };

    tour.setProperties(tourDefaults)
  },

  // Clears out existing tour configuration and adds tour steps relevant to route.
  prepareTour: async function (route) {
    const tour = this.tour;
    this.resetDefaults(tour);

    scheduleOnce('afterRender', this, function () {
      this.get(`${route}`).prepareSteps();
      this.get('generic').prepareGenericSteps();
    });
  },

  // Cleanly start a tour
  start: function () {
    const tour = this.tour;
    tour.isActive ? tour.cancel() : tour.start();
  },

  /* 
    Trigger to cause an active tour to complete, and a new tour to begin.
    As all elements in a tour must exist in the DOM before it is started, 
    this is a possible option for producing a 'continuous' tour capable of 
    handling page/route transitions that introduce new elements to be used 
    by the tour before completion.
    Accepts an optional identifier which must exist in DOM before step is added.
  */
  newTourTrigger: async function (identifier) {
    const tour = this.tour;
    if (tour.isActive) {
      // Complete the current tour and cleanup
      tour.complete();
      this.resetDefaults(tour);

      // Ensures a desired identifier exists before rendering
      if (identifier) await this.get('generic').waitForElementToDisplay(identifier, this);

      // Add individual step and start tour
      await this.get('generic').prepareNewTourStep();
      tour.start();
    }
  },
})

import Service from '@ember/service'
import {
  inject as service
} from '@ember/service';

// Set step defaults
export const defaultStepOptions = {
  classes: 'shepherd-theme-arrows custom-default-class',
  scrollTo: {
    behavior: 'smooth',
    block: 'center'
  },
  cancelIcon: {
    enabled: true
  },
  tippyOptions: {
    duration: 500
  }
};

// Set tour defaults
const tourDefaults = {
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

export default Service.extend({
  tour: service(),

  index: service('tours/index-service'),
  editor: service('tours/editor-service'),
  flightsv1: service('tours/flightsv1-service'),
  flightsv2: service('tours/flightsv2-service'),
  about: service('tours/about-service'),

  _loadedTourName: null,

  init() {
    this._super(...arguments);
    this.resetDefaults(this.tour);
  },

  // Clear out existing tour configuration
  resetDefaults: function(tour) {
    tour.setProperties(tourDefaults)
  },

  prepareIndexTour: async function () {
    const keyName = 'index-tour';
    const tour = this.tour;
    this.resetDefaults(tour);
    
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.get('index').prepareSteps();
      this.get('index').prepareGenericSteps();
    });
    
    this.set('_loadedTourName', keyName);
  },

  prepareEditorTour: async function () {
    const keyName = 'editor-tour';
    const tour = this.tour;
    this.resetDefaults(tour);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.get('editor').prepareSteps();
      this.get('editor').prepareGenericSteps();
    });

    this.set('_loadedTourName', keyName);
  },

  prepareFlightsv1Tour: async function () {
    const keyName = 'flightsv1-tour';
    const tour = this.tour;
    this.resetDefaults(tour);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.get('flightsv1').prepareSteps();
      this.get('flightsv1').prepareGenericSteps();
    });

    this.set('_loadedTourName', keyName);
  },

  prepareFlightsv2Tour: async function () {
    const keyName = 'flightsv2-tour';
    const tour = this.tour;
    this.resetDefaults(tour);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.get('flightsv2').prepareSteps();
      this.get('flightsv2').prepareGenericSteps();
    });
    
    this.set('_loadedTourName', keyName);
  },

  prepareAboutTour: async function () {
    const keyName = 'about-tour';
    const tour = this.tour;
    this.resetDefaults(tour);
    // tour.set("modal", false);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.get('about').prepareSteps();
    });

    this.set('_loadedTourName', keyName);
  },

  // Cleanly start a tour
  start: function () {
    const tour = this.tour;
    tour.isActive ? tour.cancel() : tour.start();
  }
})

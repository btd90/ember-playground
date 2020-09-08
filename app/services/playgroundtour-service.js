import Service from '@ember/service'
import {
  inject as service
} from '@ember/service';
import indexSteps from '../objects/tours/index-tour';
import editorSteps from '../objects/tours/editor-tour';
import flightsv1Steps from '../objects/tours/flightsv1-tour';
import flightsv2Steps from '../objects/tours/flightsv2-tour';
import aboutSteps from '../objects/tours/about-tour';

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
}

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
}

// Clear out existing tour configuration
const resetDefaults = (tour) => tour.setProperties(tourDefaults)

export default Service.extend({
  tour: service(),

  _loadedTourName: null,

  init() {
    this._super(...arguments)
    resetDefaults(this.tour)
  },

  prepareIndexTour: async function () {
    const keyName = 'index-tour'
    const tour = this.tour
    resetDefaults(tour)
    await tour.addSteps(indexSteps)
    this.set('_loadedTourName', keyName)
  },

  prepareEditorTour: async function () {
    const keyName = 'editor-tour'
    const tour = this.tour
    resetDefaults(tour)
    await tour.addSteps(editorSteps)
    this.set('_loadedTourName', keyName)
  },

  prepareFlightsv1Tour: async function () {
    const keyName = 'flightsv1-tour'
    const tour = this.tour
    resetDefaults(tour)
    await tour.addSteps(flightsv1Steps)
    this.set('_loadedTourName', keyName)
  },

  prepareFlightsv2Tour: async function () {
    const keyName = 'flightsv2-tour'
    const tour = this.tour
    resetDefaults(tour)
    await tour.addSteps(flightsv2Steps)
    this.set('_loadedTourName', keyName)
  },

  prepareAboutTour: async function () {
    const keyName = 'about-tour'
    const tour = this.tour
    resetDefaults(tour)
    tour.set("modal", false)
    await tour.addSteps(aboutSteps)
    this.set('_loadedTourName', keyName)
  },

  // Cleanly start a tour
  start: function () {
    const tour = this.tour
    tour.isActive ? tour.cancel() : tour.start()
  }
})

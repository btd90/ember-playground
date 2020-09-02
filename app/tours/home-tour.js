import EmberObject from '@ember/object';
import {
    inject as service
  } from '@ember/service';

/**
 * Tour object for home route
 */
export default EmberObject.extend({
    tour: service(),

  init() {
    this._super(...arguments);
  },

  setupTour(tour) {
    // let tour = this.get('tour');
    // tour.set('defaultStepOptions', shepherdStepDefaults);
    tour.set('disableScroll', true);
    tour.set('modal', true);
    this.get('tour').set('defaults', {
      classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
      scrollTo: true,
      showCancelLink: true
    });
    this.get('tour').set('requiredElements', []);
    // tour.set('requiredElements', requiredElements);
    let steps = [
      {
        attachTo: {
          element:'.hamburger',
          on: 'bottom'
        },
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            Ember.run.scheduleOnce('afterRender', this, function() {
              window.scrollTo(0, 0);
            //   this.get('documents.firstObject').set('isSelected', true);
              resolve();
            });
          });
        },
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Exit',
            type: 'cancel'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
          }
        ],
        cancelIcon: {
          enabled: true
        },
        classes: 'shepherd shepherd-open shepherd-theme-dark shepherd-transparent-text',
        highlightClass: 'highlight',
        id: 'intro',
        scrollTo: false,
        title: 'Welcome to Ember-Shepherd!',
        text: 'Ember-Shepherd is a JavaScript library for guiding users through your Ember app.',
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
      },
      {
        attachTo: {
          element:'.hamburger',
          on: 'bottom'
        },
        // beforeShowPromise: function() {
        //   return new Promise(function(resolve) {
        //     Ember.run.scheduleOnce('afterRender', this, function() {
        //       window.scrollTo(0, 0);
        //       this.get('documents.firstObject').set('isSelected', true);
        //       resolve();
        //     });
        //   });
        // },
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Exit',
            type: 'cancel'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
          }
        ],
        cancelIcon: {
          enabled: true
        },
        classes: 'shepherd shepherd-open shepherd-theme-dark shepherd-transparent-text',
        highlightClass: 'highlight',
        id: 'intro2',
        scrollTo: false,
        title: 'Second Step!',
        text: 'This menu can be clicked.',
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
      }
    ];
    tour.addSteps(steps);

    return tour;
  }
})
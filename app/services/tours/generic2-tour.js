import Service from '@ember/service';
import {
  inject as service
} from '@ember/service';

/**
 * Generic tour service.
 */
export default Service.extend({
  tour: service(),

  init() {
    this._super(...arguments);
  },

  setupTour() {
    let tour = this.get('tour');

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
          buttons: [
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
          title: 'Welcome to the About Route tour at the Playground!',
          text: 'More to come, watch this space.',
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
      this.get('tour').addSteps(steps);
  },

  start() {
    this.get('tour').start();
  },

  next() {
    this.get('tour').next();
  },

  back() {
    this.get('tour').back();
  },

  cancel() {
    this.get('tour').cancel();
  },

  complete() {
    this.get('tour').complete();
  },
})

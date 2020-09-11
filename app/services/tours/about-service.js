import GenericService from './generic-service';
import {
  A
} from '@ember/array';
export default GenericService.extend({

  // Setup steps for tour
  prepareSteps: async function () {
    let tour = this.tour;
    let stepsVals = A();

    stepsVals.push({
      buttons: [{
        classes: 'shepherd-button-primary',
        text: 'Close',
        type: 'cancel'
      }],
      canClickTarget: false,
      title: 'Welcome to the Playground',
      text: `
              <p> This is the About page. </p>
              <p>
                  <i> Watch this space </i>
              </p>
            `
    });

    await tour.addSteps(stepsVals);
  },
})

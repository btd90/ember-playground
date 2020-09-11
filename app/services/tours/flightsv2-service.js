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
        text: 'Next',
        type: 'next'
      }],
      canClickTarget: false,
      title: 'Welcome to the Playground',
      text: `
              <p> This is the Flights v2 page. </p>
              <p>
                  This page allows you to launch the second iteration of the flights demo, which renders interactive 
                  SVG components on the map to trace flight paths.
              </p>
            `
    }, {
      attachTo: {
        element: this.findElementByAttr('flightsv2Trigger'),
        on: 'right'
      },
      buttons: [{
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
      canClickTarget: true,
      title: 'Demo',
      text: `
              <p> The second iteration of the flight demo can be triggered on this map. </p>
              <p> Try it out! </p>
            `
    });

    await tour.addSteps(stepsVals);
  },
})

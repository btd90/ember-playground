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
              <p> This is the Flights v1 page. </p>
              <p>
                  This page allows you to launch the first iteration of the flights demo, which feeds polyline flight 
                  paths to the polyline-decorator component.
              </p>
            `
    }, {
      attachTo: {
        element: this.findElementByAttr('flightsv1Trigger'),
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
              <p> The first iteration of the flight demo can be triggered on this map. </p>
              <p> Try it out! </p>
            `
    });

    await tour.addSteps(stepsVals);
  },
})

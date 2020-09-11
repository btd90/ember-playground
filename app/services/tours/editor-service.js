import GenericService from './generic-service';
import {
  A
} from '@ember/array';
export default GenericService.extend({

  // Add steps to tour
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
              <p> This is the Editor page. </p>
              <p>
                  From this page you can place shapes on the map and <i>Flyto</i> some pre-defined locations.
              </p>
            `
    }, {
      attachTo: {
        element: '.leaflet-marker-icon',
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
      title: 'Markers on the Map',
      text: `
              <p> Hovering over or selecting this marker will trigger a popup with location information. </p>
              <p> Additional markers can be place on the map using the draw menu on the left. </p>
            `
    }, {
      attachTo: {
        element: '.leaflet-draw-toolbar-top',
        on: 'right'
      },
      arrow: true,
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
      canClickTarget: false,
      title: 'Draw Menu',
      text: `
              <p> Additional shapes and markers can be placed on the map from this menu. </p>
            `
    }, {
      attachTo: {
        element: this.findElementByAttr('save-shape'),
        on: 'right'
      },
      arrow: true,
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
      canClickTarget: false,
      title: 'Save Your Work',
      text: `
              <p> Selecting Save will add any shapes on the map to the Draw layer, toggleable from Context Menu. </p>
            `
    }, {
      attachTo: {
        element: ".leaflet-right",
        on: "left"
      },
      arrow: true,
      buttons: [{
          classes: "shepherd-button-primary",
          text: "Back",
          type: "back"
        },
        {
          classes: "shepherd-button-primary",
          text: "Next",
          type: "next"
        }
      ],
      canClickTarget: false,
      title: "Control Menu",
      text: `
              <p> Basemap and layer selections can be made from here. </p>
            `
    });

    await tour.addSteps(stepsVals);
  },
})

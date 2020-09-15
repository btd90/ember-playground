import { set } from '@ember/object';

// shift to tour service?
function findElementByHook(identifier) {
  let elem = document.querySelector(identifier);

  if (elem) {
    let elemId = "#" + elem.id;
    return elemId;
  }
}

function waitForElementToDisplay(selector) {
  return new Promise(function (resolve) {
      (function checkIfElementExists() {
          if (document.querySelector(selector) !== null) {
              resolve(document.querySelector(selector).id);
          } else {
              setTimeout(checkIfElementExists, 500);
          }
      })();
  })
}

export default [
  {
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
  },
  {
    attachTo: {
      // element: waitForElementToDisplay('.saveShapes').then((result) => {
      //   debugger;
      //   return result;
      // }),
      element: findElementByHook('.saveShapes'),
      on: 'right'
    },
    beforeShowPromise: function() {
      // Good for checking element exists but doesn't help attachTo
      return new Promise(async function (resolve) {

        const selector = '.saveShapes';
        await waitForElementToDisplay(selector).then((res) => {
          set(document, 'aa', res);
            return resolve(res);
        });
      })
    },
    // beforeShowPromise: function() {
    //   return new Promise(function(resolve) {
    //     let aa = document.querySelector('.saveShapes');
    //     debugger;
    //     Ember.set(document, 'currentTourElement', '#123');
    //     resolve();
    //     // Ember.run.scheduleOnce('afterRender', this, function() {
    //     //   // console.log(findElementByHook('.saveShapes'));
    //     //   // currentElem = findElementByHook('.saveShapes');
    //     //   // debugger;
    //     //   // window.scrollTo(0, 0);
    //     //   // this.get('documents.firstObject').set('isSelected', true);
    //     //   let aa = document.querySelector('.saveShapes');
    //     //   resolve(aa.id);
    //     // });
    //   });
    // },
    // showOn: !!findElementByHook('.saveShapes'),
  // attachTo: {
  //   element: testServ.test111(),
  //   on: 'right'
  // },
  // {
  //   attachTo: {
  //     element: testServ.test111('test111'),
  //     on: 'right'
  //   },
  // attachTo: {
  //   element: '#test111',
  //   on: 'right'
  // },
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
    title: 'TEST',
    text: `
            <p> TEST </p>
          `
  },
  {
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
  },
  {
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
  },
  {
    attachTo: {
      element: '.saveShapes',
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
  },
  {
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
  },
  {
    attachTo: {
      element: '.hamburger',
      on: 'bottom'
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
    canClickTarget: false,
    title: 'Navigation',
    text: `
            <p> You can navigate to other pages by selecting the Burger Menu from anywhere in the playground. </p>
          `
  },
  {
    attachTo: {
      element: '.tour',
      on: 'bottom'
    },
    buttons: [{
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Close',
        type: 'cancel'
      }
    ],
    canClickTarget: false,
    title: 'Take a Tour',
    text: `
            <p> To see this tour again, or any other tour, select the 'i' from anywhere in the playground. </p>
          `
  }
]

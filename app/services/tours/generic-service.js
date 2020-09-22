import Service from '@ember/service'
import {
  inject as service
} from '@ember/service';
import {
  A
} from '@ember/array';
export default Service.extend({
  tour: service(),

  // Find element in DOM based on Shepherd attribute
  findElementByAttr: function (identifier) {
    let attribute = '[shepdata="' + identifier + '"]';
    let nodeList = document.querySelectorAll(attribute);
    let elem = nodeList ? nodeList.item(0) : undefined;

    if (elem) {
      // If the desired element doesn't have an id, attach to parent
      let attachTo = elem.id ? elem.id : elem.parentElement.id;
      return "#" + attachTo;
    }
  },

  // Ensure an element exists in the DOM before it can be used
  waitForElementToDisplay: function (identifier) {
    let attribute = '[shepdata="' + identifier + '"]';
    return new Promise(function (resolve) {
        (function checkIfElementExists() {
            let nodeList = document.querySelectorAll(attribute);
            let elem = nodeList ? nodeList.item(0) : undefined;

            if (elem) {
              // If the desired element doesn't have an id, attach to parent
              let attachTo = elem.id ? elem.id : elem.parentElement.id;
              resolve("#" + attachTo);
            } else {
                setTimeout(checkIfElementExists, 500);
            }
        })();
    }).then((result) => {
      return result;
    });
  },

  // Setup generic steps for tour
  prepareGenericSteps: async function () {
    let tour = this.tour;
    let stepsVals = A();

    stepsVals.push({
      attachTo: {
        element: this.findElementByAttr('hamburger'),
        on: "bottom"
      },
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
      canClickTarget: true,
      arrow: false,
      title: "Navigation",
      text: `
              <p> You can navigate to other pages by selecting the Burger Menu from anywhere in the playground. </p>
            `
    }, {
      attachTo: {
        element: this.findElementByAttr('tour'),
        on: "bottom"
      },
      buttons: [{
          classes: "shepherd-button-primary",
          text: "Back",
          type: "back"
        },
        {
          classes: "shepherd-button-primary",
          text: "Close",
          type: "cancel"
        }
      ],
      canClickTarget: false,
      title: "Take a Tour",
      text: `
              <p> To see this tour again, or any other tour, select the 'i' from anywhere in the playground. </p>
            `
    });

    await tour.addSteps(stepsVals);
  },

  // Additional steps for a new tour
  prepareNewTourStep: async function () {
    let tour = this.tour;
    let stepsVals = A();
    
    stepsVals.push({
      buttons: [{
          classes: "shepherd-button-primary",
          text: "Next",
          type: "next"
        }
      ],
      canClickTarget: false,
      title: "Tour Transition",
      text: `
              <p> 
                  The existing tour was completed when the Enable Components button was selected, and this new tour has begun. 
                  This approach could be used for chaining tours across multiple routes/transitions where
                  not all DOM elements exist when the tour is first loaded, such as the element in the next step.
              </p>
            `
    },{
      attachTo: {
        element: this.findElementByAttr('menuToggle'),
        on: "top"
      },
      arrow: false,
      buttons: [{
          classes: "shepherd-button-primary",
          text: "Back",
          type: "back"
        }, {
          classes: "shepherd-button-primary",
          text: "Close",
          type: "cancel"
        }
      ],
      canClickTarget: true,
      title: "Toggle Menu",
      text: `
              <p> This button toggles the Main Menu, demonstrating a button can be placed on the map. </p>
            `
    });

    await tour.addSteps(stepsVals);
  }
});


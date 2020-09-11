import Service from '@ember/service'
import {
  inject as service
} from '@ember/service';
import {
  A
} from '@ember/array';
export default Service.extend({
  tour: service(),

  findElementByAttr: function (identifier) {
    // Find element in DOM based on Shepherd attribute
    let attribute = '[shepdata="' + identifier + '"]';
    let nodeList = document.querySelectorAll(attribute);
    let elem = nodeList ? nodeList.item(0) : undefined;

    if (elem) {
      // If the desired element doesn't have an id, attach to parent
      let attachTo = elem.id ? elem.id : elem.parentElement.id;
      return "#" + attachTo;
    }
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
      canClickTarget: false,
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
})

// const ifElementExists = id => () => !!document.getElementById(id);

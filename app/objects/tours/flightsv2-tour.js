export default [{
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
  },
  {
    attachTo: {
      element: '.flightsv2Trigger',
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

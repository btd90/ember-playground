const ifElementExists = id => () => !!document.getElementById(id);

export default [{
    buttons: [{
      classes: "shepherd-button-primary",
      text: "Next",
      type: "next"
    }],
    canClickTarget: false,
    title: "Welcome to the Playground",
    text: `
            <p> This is the Index page. </p>
            <p>
                From this page you can trigger components on the map and <i>Flyto</i> some pre-defined locations.
            </p>
          `
  },
  {
    attachTo: {
      element: ".enableComponents",
      on: "right"
    },
    arrow: false,
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
    title: "Show Components",
    text: `
            <p> Components can be rendered on the map via this trigger. </p>
            <p> Try it out! </p>
          `
  },
  {
    attachTo: {
      element: ".menuToggle",
      on: "top"
    },
    arrow: false,
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
    showOn: ifElementExists("firstComponentLayer"), //need to add beforeShowPromise: function() {
    title: "Toggle Menu",
    text: `
            <p> This button toggles the Main Menu, demonstrating a button can be placed on the map. </p>
          `
  },
  {
    attachTo: {
      element: ".leaflet-control-zoom-fullscreen",
      on: "right"
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
    title: "Fullscreen View",
    text: `
            <p> Map fullscreen view can be triggered here. </p>
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
    title: "Map Menu - Image",
    text: `
            <p> Right-clicking on the map will reveal additional actions and options to apply to the display. </p>
            <img src="/assets/images/building.png" width="150" style="display:block;margin-left:auto;margin-right:auto;width:50%;">
            <p> The example image above can be placed at any location from this menu using 'Place Building'. </p>
          `
  },
  {
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
    title: "Map Menu - Video",
    text: `
            <p> Furthermore, the example video below can also be placed anywhere on the map. </p>
            <video width="375" autoplay loop>
              <source src="/assets/images/takeoff.webm" type="video/webm">
              Your browser does not support HTML5 video.
            </video>
            <p> Selecting 'Takeoff' from the right-click menu will trigger placement. </p>
          `
  },
  {
    attachTo: {
      element: ".hamburger",
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
  },
  {
    attachTo: {
      element: ".tour",
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
  }
];

// import GenericTour from './generic-tour';

// /**
//  * About tour service
//  */
// export default GenericTour.extend({

//   // Setup tour and add steps
//   setupTour: function () {
//     this._super();

//     let steps = [
//       {
//         buttons: [
//           {
//             classes: 'shepherd-button-primary',
//             text: 'Next',
//             type: 'next'
//           }
//         ],
//         cancelIcon: {
//           enabled: true
//         },
//         classes: 'shepherd shepherd-open shepherd-theme-dark shepherd-transparent-text',
//         highlightClass: 'highlight',
//         id: 'intro1',
//         scrollTo: false,
//         title: 'Welcome to the About Route tour at the Playground!',
//         text: 'More to come, watch this space.',
//         showOn: this.checkRoute(),
//         when: {
//           show: () => {
//             console.log('show step');
//           },
//           hide: () => {
//             console.log('hide step');
//           }
//         }
//       }
//     ];
//     this.get('tour').addSteps(steps);
//   },

//   checkRoute() {
//     return false;
//     // let tourRoute = '/home/about';
//     // let owner = Ember.getOwner(this);
//     // return owner.lookup('router:main').url === tourRoute;
//   },
// })
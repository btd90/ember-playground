// import GenericTour from './generic-tour';

// /**
//  * Index tour service
//  */
// export default GenericTour.extend({

//   // Setup tour and add steps
//   setupTour: function () {
//     this._super();

//     let steps = [
//       {
//         // beforeShowPromise: function() {
//         //   return new Promise(function(resolve) {
//         //     Ember.run.scheduleOnce('afterRender', this, function() {
//         //       window.scrollTo(0, 0);
//         //     //   this.get('documents.firstObject').set('isSelected', true);
//         //       resolve();
//         //     });
//         //   });
//         // },
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
//         id: 'intro6',
//         scrollTo: false,
//         title: 'Welcome to the Home Route tour at the Playground!',
//         text: 'This tour will run you through some features of the Home Route.',
//         showOn: this.checkRoute(),
//         when: {
//           show: () => {
//             console.log('show step');
//           },
//           hide: () => {
//             console.log('hide step');
//           }
//         }
//       },
//       {
//         attachTo: {
//           element:'.hamburger',
//           on: 'bottom'
//         },
//         // beforeShowPromise: function() {
//         //   return new Promise(function(resolve) {
//         //     Ember.run.scheduleOnce('afterRender', this, function() {
//         //       window.scrollTo(0, 0);
//         //     //   this.get('documents.firstObject').set('isSelected', true);
//         //       resolve();
//         //     });
//         //   });
//         // },
//         buttons: [
//           {
//             classes: 'shepherd-button-primary',
//             text: 'Back',
//             type: 'back'
//           },
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
//         id: 'intro7',
//         scrollTo: false,
//         title: 'Navigating around the Playground',
//         text: 'To change routes, toggle the main menu via the hamburger button.',
//         showOn: this.checkRoute(),
//         when: {
//           show: () => {
//             console.log('show step');
//           },
//           hide: () => {
//             console.log('hide step');
//           }
//         }
//       },
//       {
//         attachTo: {
//           element:'.hamburger',
//           on: 'bottom'
//         },
//         // beforeShowPromise: function() {
//         //   return new Promise(function(resolve) {
//         //     Ember.run.scheduleOnce('afterRender', this, function() {
//         //       window.scrollTo(0, 0);
//         //       this.get('documents.firstObject').set('isSelected', true);
//         //       resolve();
//         //     });
//         //   });
//         // },
//         buttons: [
//           {
//             classes: 'shepherd-button-primary',
//             text: 'Back',
//             type: 'back'
//           },
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
//         id: 'intro8',
//         scrollTo: false,
//         title: 'Second Step!',
//         text: 'This menu can be clicked.',
//         showOn: false,
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
//     // let tourRoute = '/home/index';
//     // let owner = Ember.getOwner(this);
//     // return owner.lookup('router:main').url === tourRoute;
//   },
// })
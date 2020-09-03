// import GenericTour from './generic-tour';

// /**
//  * Flights v2 tour service
//  */
// export default GenericTour.extend({

//   // Setup tour and add steps
//   setupTour: function () {
//     this._super();
//     debugger;
//     if(this.get('tour.tourObject')) {
//       console.log("AAA");
//     this.get('tour.tourObject').set('steps', [
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
//         id: 'aaaa',
//         scrollTo: false,
//         title: 'AAAAAAAAAA',
//         text: 'AAAAAAAAAAAAAAA.',
//         when: {
//           show: () => {
//             console.log('show step');
//           },
//           hide: () => {
//             console.log('hide step');
//           }
//         }
//       }
//       ]);
//     }

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
//         id: 'intro4',
//         scrollTo: false,
//         title: 'FLIGHTSV2!',
//         text: 'FLIGHTSV2.',
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
//     // this.get('tour').addSteps(steps);
//   },

//   checkRoute() {
//     let tourRoute = '/home/flightsv2';
//     let owner = Ember.getOwner(this);
//     return owner.lookup('router:main').url === tourRoute;
//   },
// })
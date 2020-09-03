// import GenericTour from './generic-tour';

// /**
//  * Editor tour service
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
//         id: 'intro2',
//         scrollTo: false,
//         title: 'EDITOR',
//         text: 'EDITOR.',
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
//     // let tourRoute = '/home/editor';
//     // let owner = Ember.getOwner(this);
//     // return owner.lookup('router:main').url === tourRoute;
//   },
// })
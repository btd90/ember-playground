import Component from '@ember/component';

/**
 * SVG component for visualisation on the map.
 */
export default Component.extend({
    tagName: '',

    // init() {
    //     test11.animate([
    //         { strokeDashoffset: pathDist },
    //         { strokeDashoffset: '0' }
    //         ], {
    //    duration: pathDist * 5,
    //    fill: 'forwards'
    //     });
    // },

    didInsertElement() {
        this._super(...arguments);

        // let test111 = document.getElementById('test111');
        // test111.animate([
        //             { strokeDashoffset: 240 },
        //             { strokeDashoffset: '0' }
        //             ], {
        //        duration: 240 * 5,
        //        fill: 'forwards'
        //         });
        // debugger;

    },    

    actions: {
        test11(event) {
            console.log(event);
        },
    },
})

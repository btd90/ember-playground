import Component from '@ember/component';

/**
 * Button component.
 * 
 * @argument {Action} buttonAction - action trigger on button
 * @argument {String} faIcon - font awesome icon
 * @argument {String} text - button text
 * @argument {Boolean} buttonDisabled - disable button
 * 
 */
export default Component.extend({
    init() {
        this._super(...arguments);
        this.set('buttonClass', '');
    },

    actions: {
        focus1() {
            debugger;
          this.set('buttonClass', 'hover');
        },
    },
})
import Component from '@ember/component';

/**
 * Coloured background test component.
 * 
 * @argument {Object} upperLeft - lat/lng for upper left bounds
 * @argument {Object} lowerRight - lat/lng for lower right bounds
 */
export default Component.extend({
    tagName: 'div',
    classNames: ['colouredBackground'],
})
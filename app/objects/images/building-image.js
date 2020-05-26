import EmberObject from '@ember/object';

/**
 * Building image for Ember Leaflet.
 */
export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.set('url', 'assets/images/building.png');
    this.set('xCoOrd', 36);
    this.set('yCoOrd', -36);
  }
});

import EmberObject from '@ember/object';

/**
 * Takeoff video for Ember Leaflet.
 */
export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.set('url', 'assets/images/takeoff.webm');
    this.set('xCoOrd', 60);
    this.set('yCoOrd', -60);
  }
});

import EmberObject from '@ember/object';

/**
 * Slingshot icon for Ember Leaflet.
 */
export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.set('iconUrl', 'assets/images/sling.png');
    this.set('iconRetinaUrl', 'assets/images/sling.png');
    this.set('shadowUrl', 'assets/images/sling-shadow.png');
    this.set('shadowRetinaUrl', 'assets/images/sling-shadow.png');
    this.set('popupAnchor', [1, -22]);
    this.set('iconSize', [15, 28]);
    this.set('iconAnchor', [6, 24]);
    this.set('shadowSize', [41, 31]);
    this.set('shadowAnchor', [12, 26]);
  }
});

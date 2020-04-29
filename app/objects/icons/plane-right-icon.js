import EmberObject from '@ember/object';

/**
 * Paper plane right icon for Ember Leaflet.
 */
export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.set('iconUrl', 'assets/images/plane-right.png');
    this.set('iconRetinaUrl', 'assets/images/plane-right.png');
    this.set('shadowUrl', 'assets/images/marker-shadow.png');
    this.set('shadowRetinaUrl', 'assets/images/marker-shadow@2x.png');
    this.set('popupAnchor', [8, -22]);
    this.set('iconSize', [25, 28]);
    this.set('iconAnchor', [6, 24]);
    this.set('shadowSize', [41, 31]);
    this.set('shadowAnchor', [10, 31]);
  }
});

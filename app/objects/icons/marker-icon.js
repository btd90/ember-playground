import EmberObject from '@ember/object';

/**
 * Default marker icon for Ember Leaflet.
 */
export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.set('iconUrl', 'assets/images/marker-icon.png');
    this.set('iconRetinaUrl', 'assets/images/marker-icon@2x.png');
    this.set('shadowUrl', 'assets/images/marker-shadow.png');
    this.set('shadowRetinaUrl', 'assets/images/marker-shadow@2x.png');
    this.set('popupAnchor', [1, -34]);
    this.set('iconSize', [25, 41]);
    this.set('iconAnchor', [12, 41]);
    this.set('shadowSize', [41, 41]);
    this.set('shadowAnchor', [12, 41]);
  }
});

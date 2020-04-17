import EmberObject from '@ember/object';

/**
 * Building marker icon for Ember Leaflet.
 */
export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.set('iconUrl', 'assets/images/building.png');
    this.set('iconRetinaUrl', 'assets/images/building.png');
    this.set('shadowUrl', 'assets/images/building-shadow.png');
    this.set('shadowRetinaUrl', 'assets/images/building-shadow.png');
    this.set('popupAnchor', [1, -30]);
    this.set('iconSize', [25, 32]);
    this.set('iconAnchor', [12, 31]);
    this.set('shadowSize', [41, 18]);
    this.set('shadowAnchor', [14, 17]);
  }
});

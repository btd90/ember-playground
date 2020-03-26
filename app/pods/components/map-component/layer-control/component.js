import LayerControl from 'ember-leaflet-layer-control/components/layer-control';
import {
  computed
} from '@ember/object';

/**
 * Override of layer control plugin
 * 
 */
export default LayerControl.extend({
  init() {
    this._super(...arguments);
    console.log("init");
  },

  didReceiveAttrs() {
    this._super(...arguments);
    console.log("didReceiveAttrs");
  },

  didInsertParent() {
    this._super(...arguments);
    debugger;
  },

  // Doesn't update when new array added to map
  test: computed('L.control.layers.length', function() {
    return this.get('L.control.layers.length');
  }),

  didRender() {
    this._super(...arguments);
    console.log("didRender");
  },

  didUpdate() {
    this._super(...arguments);
    console.log("didUpdate");
  },

  didUpdateAttrs() {
    this._super(...arguments);
    console.log("didUpdateAttrs");
  },

  rerender() {
    this._super(...arguments);
    console.log("rerender");
  },

  willDestroy() {
    debugger;
    this._super(...arguments);
    console.log("willDestroy");
  },

  willRender() {
    this._super(...arguments);
    console.log("willRender");
  },

  willUpdate() {
    debugger;
    this._super(...arguments);
    console.log("willUpdate");
  },

});
import HomeController from '../controller';
import {
  computed
} from '@ember/object';
import {
  A
} from '@ember/array';

/**
 * Controller for home index route.
 */
export default HomeController.extend({
  queryParams: ['disabled'],

  init() {
    this._super(...arguments);
    let leaflet = window.L;

    this.set('disabled', false);
    this.set('latitude', '-25.3444');
    this.set('longitude', '131.0369');
    this.set('zoom', '3');

    this.set('componentsEnabled', false);
    this.set('takeOff', false);
    this.set('componentButtonText', 'Enable Components on Map');

    this.set('layerGroupName', 'Components');
    this.set('firstLayerId', 'firstComponentLayer');
    this.set('firstLayerLatitude', '-25');
    this.set('firstLayerLongitude', '80');
    this.set('firstLayerButtonText', 'Toggle Menu');
    this.set('secondLayerId', 'secondComponentLayer');
    this.set('upperLeft', leaflet.latLng(50, 153));
    this.set('lowerRight', leaflet.latLng(3, 231));
  },

  actions: {
    changeSelection(selection) {
      this.set('destinationChoice', selection);
    },
    enableComponents() {
      this.set('componentsEnabled', true);

      // Trigger for completing an active tour and starting another
      this.get('playgroundtourService').newTourTrigger('menuToggle');
    },
    toggleBurger() {
      this._super();
    },
    // MAP LAYER CONTROL EVENTS
    layerControlEvent(event) {
      return event;
    }
  },

  mapDisabled: computed('disabled', function () {
    let disabled = this.get('disabled');

    if (disabled) {
      // Disable map here
      return true;
    } else {
      // Enable map here
      return false;
    }
  }),

  options: computed(function () {
    return ['Melbourne', 'Sydney', 'Winterfell'];
  }),

  points: computed(function () {
    let pointsArray = A();
    pointsArray.pushObject({
      name: 'Melbourne',
      location: [-37.8136, 144.9631],
    });
    pointsArray.pushObject({
      name: 'Sydney',
      location: [-33.8688, 151.2093],
    });
    return pointsArray;
  }),

  geojson: computed(function () {
    let geojson = A();
    geojson.pushObject(this.get('nzGeo'));
    geojson.pushObject(this.get('markerGeo'));
    return geojson;
  }),

  markerGeo: computed(function () {
    return {
      "type": "Feature",
      "properties": {
        "name": "GeoJSON Marker",
        "amenity": "Football Stadium",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [151.99404, -26.75621]
      }
    }
  }),

  nzGeo: computed(function () {
    return {
      "type": "Feature",
      "properties": {
        "name": "New Zealand",
        "code": "NZL",
        "group": "Countries"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                173.020375,
                -40.919052
              ],
              [
                173.247234,
                -41.331999
              ],
              [
                173.958405,
                -40.926701
              ],
              [
                174.247587,
                -41.349155
              ],
              [
                174.248517,
                -41.770008
              ],
              [
                173.876447,
                -42.233184
              ],
              [
                173.22274,
                -42.970038
              ],
              [
                172.711246,
                -43.372288
              ],
              [
                173.080113,
                -43.853344
              ],
              [
                172.308584,
                -43.865694
              ],
              [
                171.452925,
                -44.242519
              ],
              [
                171.185138,
                -44.897104
              ],
              [
                170.616697,
                -45.908929
              ],
              [
                169.831422,
                -46.355775
              ],
              [
                169.332331,
                -46.641235
              ],
              [
                168.411354,
                -46.619945
              ],
              [
                167.763745,
                -46.290197
              ],
              [
                166.676886,
                -46.219917
              ],
              [
                166.509144,
                -45.852705
              ],
              [
                167.046424,
                -45.110941
              ],
              [
                168.303763,
                -44.123973
              ],
              [
                168.949409,
                -43.935819
              ],
              [
                169.667815,
                -43.555326
              ],
              [
                170.52492,
                -43.031688
              ],
              [
                171.12509,
                -42.512754
              ],
              [
                171.569714,
                -41.767424
              ],
              [
                171.948709,
                -41.514417
              ],
              [
                172.097227,
                -40.956104
              ],
              [
                172.79858,
                -40.493962
              ],
              [
                173.020375,
                -40.919052
              ]
            ]
          ],
          [
            [
              [
                174.612009,
                -36.156397
              ],
              [
                175.336616,
                -37.209098
              ],
              [
                175.357596,
                -36.526194
              ],
              [
                175.808887,
                -36.798942
              ],
              [
                175.95849,
                -37.555382
              ],
              [
                176.763195,
                -37.881253
              ],
              [
                177.438813,
                -37.961248
              ],
              [
                178.010354,
                -37.579825
              ],
              [
                178.517094,
                -37.695373
              ],
              [
                178.274731,
                -38.582813
              ],
              [
                177.97046,
                -39.166343
              ],
              [
                177.206993,
                -39.145776
              ],
              [
                176.939981,
                -39.449736
              ],
              [
                177.032946,
                -39.879943
              ],
              [
                176.885824,
                -40.065978
              ],
              [
                176.508017,
                -40.604808
              ],
              [
                176.01244,
                -41.289624
              ],
              [
                175.239567,
                -41.688308
              ],
              [
                175.067898,
                -41.425895
              ],
              [
                174.650973,
                -41.281821
              ],
              [
                175.22763,
                -40.459236
              ],
              [
                174.900157,
                -39.908933
              ],
              [
                173.824047,
                -39.508854
              ],
              [
                173.852262,
                -39.146602
              ],
              [
                174.574802,
                -38.797683
              ],
              [
                174.743474,
                -38.027808
              ],
              [
                174.697017,
                -37.381129
              ],
              [
                174.292028,
                -36.711092
              ],
              [
                174.319004,
                -36.534824
              ],
              [
                173.840997,
                -36.121981
              ],
              [
                173.054171,
                -35.237125
              ],
              [
                172.636005,
                -34.529107
              ],
              [
                173.007042,
                -34.450662
              ],
              [
                173.551298,
                -35.006183
              ],
              [
                174.32939,
                -35.265496
              ],
              [
                174.612009,
                -36.156397
              ]
            ]
          ]
        ]
      },
      "_id": "new zealand"
    }
  }),
});

import EmberLeaflet from 'ember-leaflet/components/leaflet-map';
import MarkerIcon from '../../../objects/icons/marker-icon';
import BuildingIcon from '../../../objects/icons/building-icon';
import {
  A
} from '@ember/array';
import {
  observer
} from '@ember/object';

/**
 * Map display component
 * 
 * @argument {Array} geojson - array of geojson objects.
 * @argument {Array} points - array of markers.
 * @argument {Boolean} saveEvent - used to track when save occurs
 */
export default EmberLeaflet.extend({
  hoveredObject: '',
  clickedObject: '',

  init() {
    this._super(...arguments);

    this.set('zoom', 3);
    this.set('minZoom', 1);
    this.set('maxZoom', 10);
    this.set('lat', -25.3444);
    this.set('lng', 131.0369);

    this.set('drawObjects', A());
    this.set('layerGroups', A());
    this.set('dynamicPoints', A());

    this.set('markerIcon', L.icon(MarkerIcon.create()));
    this.get('drawEnabled') ? this.set('drawEnabled', true) : this.set('drawEnabled', false);
    this.set('enabledBase', false);

    let flightPaths = A();
    flightPaths.push({
      polylineLocations: [
        L.latLng(10, 20),
        L.latLng(20, 30),
        L.latLng(30, 40),
        L.latLng(40, 50),
        L.latLng(50, 60),
        L.latLng(60, 70),
        L.latLng(70, 80)
      ],
      polylinePatterns: [{
        offset: 0, 
        repeat: 50, 
        symbol: L.Symbol.arrowHead({
          pixelSize: 15, 
          headAngle: 30, 
          pathOptions: {
            stroke: true, 
            fillOpacity: 1, 
            weight: 1, 
            color: 'purple',
          }
        })
      }]
    });
    // stroke-linecap: 'round',
    // stroke-linejoin: 'round'
    this.set('flightPaths', flightPaths);
  },

  actions: {
    // CLICK EVENTS
    enableDraw() {
      this.set('drawEnabled', true);
    },
    goMelbourne() {
      let map = this.get('_layer');
      map.flyTo([-37.8136, 144.9631], 8);
    },
    goSydney() {
      let map = this.get('_layer');
      map.flyTo([-33.8688, 151.2093], 8);
    },
    // POPUP EVENTS
    mouseOverObject(obj) {
      this.set('hoveredObject', obj);
    },
    // DRAW EVENTS
    drawCreated(event, layerGroup, map) {
      let layerGroups = this.get('layerGroups');
      layerGroups.push(layerGroup._leaflet_id);
    },
    drawEdited(event, layerGroup, map) {
      let layerGroups = this.get('layerGroups');
      layerGroups.push(layerGroup._leaflet_id);
    },
    drawDeleted(event, layerGroup, map) {
      let layerGroups = this.get('layerGroups');
      layerGroups.push(layerGroup._leaflet_id);
    },
    // ADD/REMOVE LAYER EVENTS
    addPoint(event) {
      let lat = event.latlng.lat.toFixed(1);
      let lng = event.latlng.lng.toFixed(1);
      let points = this.get('dynamicPoints');
      points.pushObject({
        name: 'Point: ' + lat + ', ' + lng,
        location: [lat, lng]
      })
    },
    removePoints() {
      this.set('dynamicPoints', A());
    },
    addBaseLayer() {
      this.set('enabledBase', true);
    },
    removeBaseLayer() {
      this.set('enabledBase', false);
    },
    // LAYER CONTROL EVENTS
    layerControlEvent(event) {
      return event;
    },
    // ICON EVENTS
    buildingIcons() {
      this.set('markerIcon', L.icon(BuildingIcon.create()));
    },
    markerIcons() {
      this.set('markerIcon', L.icon(MarkerIcon.create()));
    }
  },

  didInsertParent() {
    this._super(...arguments);

    // Update control 
    let map = this.get('_layer');
    map.attributionControl.setPosition("bottomleft");
    map.attributionControl.setPrefix("Lat: 0 Long: 0");

    // Override events
    map.addEventListener('mousemove', this.mousemove, this);
    map.addEventListener('click', this.mouseclick, this);
  },

  mousemove(event) {
    let map = this.get('_layer');
    let latVal = event.latlng.lat.toFixed(4);
    let lngVal = event.latlng.lng.toFixed(4);
    map.attributionControl.setPrefix("Lat: " + latVal + " Long: " + lngVal);
  },

  mouseclick(event) {
    // unused
  },

  /* Track when save clicked */
  saveObserver: observer('saveEvent', function () {
    let drawObjects = this.findDrawObjects(this.get('layerGroups').uniq());
    this.set('drawObjects', drawObjects);

    // Close draw layer (known bug)
    //this.set('drawEnabled', false);
  }),

  /* Locate each object from the layer group */
  findDrawObjects: function (layerGroups) {
    let drawObjects = A();
    let map = this.get('_layer');

    // Loop over new layer groups
    layerGroups.forEach(layerGroup => {
      // Add each to Draw layer
      let builtObjects = this.buildDrawObjects(map._layers[layerGroup]._layers);
      drawObjects.pushObjects(builtObjects);

      // Remove from draw plugin (broken)
      //layerGroup.removeFrom(map);
    });
    return drawObjects;
  },

  /* Construct draw objects for draw-object component */
  buildDrawObjects: function (newLayers) {
    let builtObjects = A();

    // Fetch each object
    Object.keys(newLayers).forEach(key => {
      let layer = newLayers[key];
      if (layer._latlngs) {
        if (layer._latlngs.length > 1) {
          return builtObjects.pushObject({
            name: 'polyline',
            type: 'polyline',
            latlngs: layer._latlngs
          });
        } else {
          return builtObjects.pushObject({
            name: 'polygon',
            type: 'polygon',
            latlngs: layer._latlngs
          });
        }
      } else if (layer._mRadius) {
        return builtObjects.pushObject({
          name: 'circle',
          type: 'circle',
          latlng: layer._latlng,
          mRadius: layer._mRadius
        });
      } else if (layer._radius) {
        return builtObjects.pushObject({
          name: 'circlemarker',
          type: 'circlemarker',
          latlng: layer._latlng,
          radius: layer._radius
        });
      } else if (layer._latlng) {
        return builtObjects.pushObject({
          name: 'marker',
          type: 'marker',
          latlng: layer._latlng
        });
      } else {
        // Unsupported Shape
      }
    });
    return builtObjects;
  },

});

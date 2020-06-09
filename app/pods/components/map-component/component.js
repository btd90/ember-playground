import EmberLeaflet from 'ember-leaflet/components/leaflet-map';
import MarkerIcon from '../../../objects/icons/marker-icon';
import BuildingIcon from '../../../objects/icons/building-icon';
import SlingShotIcon from '../../../objects/icons/sling-shot-icon';
import BuildingImage from '../../../objects/images/building-image';
import TakeoffVideo from '../../../objects/videos/takeoff-video';
import EmberObject from '@ember/object';
import {
  later
} from '@ember/runloop';
import {
  inject as service
} from '@ember/service';
import {
  isEmpty,
  isPresent
} from '@ember/utils';
import {
  A
} from '@ember/array';
import {
  observer,
  computed,
} from '@ember/object';

/**
 * Map display component
 * 
 * @argument {Array} geojson - array of geojson objects.
 * @argument {Array} points - array of markers.
 * @argument {Boolean} saveEvent - used to track when save occurs
 * @argument {Boolean} flightDemo - trigger for flight path demo on map
 */
export default EmberLeaflet.extend({
  drawService: service(),
  overlayService: service(),
  polylineService: service(),
  hoveredObject: '',
  clickedObject: '',
  timer: '',

  init() {
    this._super(...arguments);

    this.set('zoom', 1);
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

    // Image/Video Overlays
    this.set('imageOverlays', A());
    this.set('imageOverlaysGroup', L.layerGroup());
    this.set('imageOverlaysName', 'Images');
    this.set('videoOverlays', A());
    this.set('videoOverlaysGroup', L.layerGroup());
    this.set('videoOverlaysName', 'Videos');

    // Construct polyline object
    if (isPresent(this.get('flightDemo'))) this.set('polylineArray', this.get('polylineService').convertLineString(true, true, true, true));
    if (!isEmpty(this.get('polylineArray'))) this.set('flightPaths', this.get('polylineService').buildPolyline(this.get('polylineArray')));
  },

  actions: {
    // LAYER CONTROL EVENTS
    layerControlEvent(event) {
      return event;
    },
    // CLICK EVENTS
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
    drawCreated(event, layerGroup /*, map*/) {
      let layerGroups = this.get('layerGroups');
      layerGroups.push(layerGroup._leaflet_id);
    },
    drawEdited(event, layerGroup /*, map*/) {
      let layerGroups = this.get('layerGroups');
      layerGroups.push(layerGroup._leaflet_id);
    },
    drawDeleted(event, layerGroup /*, map*/) {
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
    // ICON EVENTS
    buildingIcons() {
      this.set('markerIcon', L.icon(BuildingIcon.create()));
    },
    markerIcons() {
      this.set('markerIcon', L.icon(MarkerIcon.create()));
    },
    // IMAGE OVERLAY EVENTS
    placeBuilding(event) {
      let image = BuildingImage.create();
      this.imageOverlay(event.latlng, image.get('xCoOrd'), image.get('yCoOrd'), image.get('url'));
    },
    // VIDEO OVERLAY EVENTS
    takeoff(event) {
      let video = TakeoffVideo.create();
      this.videoOverlay(event.latlng, video.get('xCoOrd'), video.get('yCoOrd'), video.get('url'));
    },
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

  mouseclick(/* event */) {
    // unused
  },

  /* Track when save clicked */
  saveObserver: observer('saveEvent', function () {
    let drawObjects = this.findDrawObjects(this.get('layerGroups').uniq());
    this.set('drawObjects', drawObjects);

    // Close draw layer (known bug)
    //this.set('drawEnabled', false);
  }),

  /* Track when flight demo triggered */
  flightObserver: observer('flightDemo', function () {
    if (this.get('flightDemo')) {
      this.set('timer', EmberObject.create({
        time: 0
      }));
      this.flightTimer();
    }
  }),

  /* Handle adding image overlays to map */
  imageOverlay: function(originLatLng, xCoOrd, yCoOrd, url) {
    let imageOverlaysName = this.get('imageOverlaysName');
    let updatedImageOverlaysGroup = this.get('overlayService').updateImageOverlay(
      this.get('_layer'), 
      this.get('imageOverlaysGroup'),
      originLatLng,
      xCoOrd,
      yCoOrd,
      url);

    // Update imageOverlays object
    this.set('imageOverlays', {
      overlayGroup: updatedImageOverlaysGroup,
      overlayName: imageOverlaysName,
      count: updatedImageOverlaysGroup.getLayers().length
    });
  },

  /* Handle adding video overlays to map */
  videoOverlay: function(originLatLng, xCoOrd, yCoOrd, url) {
    let videoOverlaysName = this.get('videoOverlaysName');
    let updatedVideoOverlaysGroup = this.get('overlayService').updateVideoOverlay(
      this.get('_layer'), 
      this.get('videoOverlaysGroup'),
      originLatLng,
      xCoOrd,
      yCoOrd,
      url);

    // Update videoOverlays object
    this.set('videoOverlays', {
      overlayGroup: updatedVideoOverlaysGroup,
      overlayName: videoOverlaysName,
      count: updatedVideoOverlaysGroup.getLayers().length
    });
  },

  /* Locate each object from the layer group */
  findDrawObjects: function (layerGroups) {
    let drawObjects = A();
    let map = this.get('_layer');

    // Loop over new layer groups
    layerGroups.forEach(layerGroup => {
      // Add each to Draw layer
      let builtObjects = this.get('drawService').buildDrawObjects(map._layers[layerGroup]._layers);
      drawObjects.pushObjects(builtObjects);

      // Remove from draw plugin (broken)
      //layerGroup.removeFrom(map);
    });
    return drawObjects;
  },

  /* Timer for flight demo */
  flightTimer: function () {
    // Update polyline object with flight path change
    let polylineArray = this.get('polylineService').updatePolyline(this.get('polylineArray'));

    // Apply update
    this.set('flightPaths', this.get('polylineService').buildPolyline(polylineArray));

    // Update timer (limited to 10 seconds)
    let timer = this.get('timer');
    timer.set('time', timer.get('time') + 1);
    if (timer.get('time') < 10) {
      later(this, this.flightTimer, 1000);
    } else {
      this.set('flightDemo', false)
    }
  },

  // Icons
  slingShotIcon: computed(function () {
    return L.icon(SlingShotIcon.create());
  })
});

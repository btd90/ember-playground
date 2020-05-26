import EmberLeaflet from 'ember-leaflet/components/leaflet-map';
import MarkerIcon from '../../../objects/icons/marker-icon';
import BuildingIcon from '../../../objects/icons/building-icon';
import PlaneRightIcon from '../../../objects/icons/plane-right-icon';
import PlaneLeftIcon from '../../../objects/icons/plane-left-icon';
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
  set
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

  polylineBuilder: service(),
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
    if (isPresent(this.get('flightDemo'))) this.set('polylineArray', this.get('polylineBuilder').convertLineString(true, true, true, true));
    if (!isEmpty(this.get('polylineArray'))) this.set('flightPaths', this.buildPolyline(this.get('polylineArray')));
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
    let map = this.get('_layer');
    let imageOverlaysName = this.get('imageOverlaysName');
    let imageOverlaysGroup = this.get('imageOverlaysGroup');

    // Convert LatLng into container pixel position
    let originPoint = map.latLngToContainerPoint(originLatLng);

    // Add image pixel dimensions
    let nextCornerPoint = originPoint.add({x: xCoOrd, y: yCoOrd});

    // Convert back into LatLng
    let nextCornerLatLng = map.containerPointToLatLng(nextCornerPoint);

    // Add building to images layer
    let overlay = L.imageOverlay(
      url, [originLatLng, [nextCornerLatLng.lat, nextCornerLatLng.lng]], {interactive: true});
    overlay.addTo(imageOverlaysGroup);

    // Add updated layer group to map
    map.addLayer(imageOverlaysGroup);

    // Add click handler to overlay
    let imageElement = overlay.getElement();
    imageElement.addEventListener('click', this.imageClick, this);

    // Update imageOverlays object
    this.set('imageOverlays', {
      overlayGroup: imageOverlaysGroup,
      overlayName: imageOverlaysName,
      count: imageOverlaysGroup.getLayers().length
    });
  },

  /* Click action for image overlays */
  imageClick: function(/* image */) {
    // unused
  },

  /* Handle adding video overlays to map */
  videoOverlay: function(originLatLng, xCoOrd, yCoOrd, url) {
    let map = this.get('_layer');
    let videoOverlaysName = this.get('videoOverlaysName');
    let videoOverlaysGroup = this.get('videoOverlaysGroup');

    // Convert LatLng into container pixel position
    let originPoint = map.latLngToContainerPoint(originLatLng);

    // Add image pixel dimensions
    let nextCornerPoint = originPoint.add({x: xCoOrd, y: yCoOrd});

    // Convert back into LatLng
    let nextCornerLatLng = map.containerPointToLatLng(nextCornerPoint);
    
    // Add takeoff to videos layer
    let overlay = L.videoOverlay(
      url, [originLatLng, [nextCornerLatLng.lat, nextCornerLatLng.lng]], { interactive: true });
    overlay.addTo(videoOverlaysGroup);

    // Add updated layer group to map, and update videoOverlays object
    map.addLayer(videoOverlaysGroup);

    // Add click handler to overlay
    let videoElement = overlay.getElement();
    videoElement.addEventListener('click', this.videoClick, this);

    // Update videoOverlays object
    this.set('videoOverlays', {
      overlayGroup: videoOverlaysGroup,
      overlayName: videoOverlaysName,
      count: videoOverlaysGroup.getLayers().length
    });
  },

  /* Click action for video overlays */
  videoClick: function(video) {
    video.target.play();
  },

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

  /* Construct polyline object for flight paths */
  buildPolyline: function (polylineArray) {
    let polylineObject = A();

    // Build polyline object
    polylineArray.forEach(polyline => {
      // Calculate pattern fields
      let flightIcon = polyline.invertIcon ? this.get('planeRightIcon') : this.get('planeLeftIcon');
      let pixelSize = polyline.reverse ? -8 : 8;

      // Add a pattern
      let pattern = {
        offset: 5,
        repeat: 30,
        symbol: L.Symbol.arrowHead({
          pixelSize: pixelSize,
          headAngle: 30,
          pathOptions: {
            stroke: true,
            fillOpacity: 1,
            weight: 1,
            color: polyline.statusColour,
          }
        })
      };

      // Create poly object
      polylineObject.pushObject({
        polylineLocation: polyline.coordinates,
        polylinePattern: [pattern],
        firstLocation: polyline.coordinates[0],
        lastLocation: polyline.coordinates[polyline.coordinates.length - 1],
        flight: polyline.flight,
        flightIcon: flightIcon,
        flightStatus: polyline.flightStatus,
        reverse: polyline.reverse,
        popupOpen: polyline.popupOpen,
      })
    });

    return polylineObject;
  },

  /* Timer for flight demo */
  flightTimer: function () {
    let polylineArray = this.get('polylineArray');
    let statusArr = ['Awaiting Departure..', 'In The Air..', 'Arrived!!'];
    let colourArr = ['grey', 'orange', 'green'];
    let randomPoly = Math.floor(Math.random() * 4);

    // Clear any open popups
    polylineArray.forEach(flight => {
      set(flight, 'popupOpen', false);
    });

    // Identify and update a random flight
    let updateToInFlight = polylineArray[randomPoly];
    set(updateToInFlight, 'popupOpen', true);
    let currentStatus = updateToInFlight.statusColour;

    switch (currentStatus) {
      case "grey":
        set(updateToInFlight, 'flightStatus', statusArr[1]);
        set(updateToInFlight, 'statusColour', colourArr[1]);
        break;
      case "orange":
        set(updateToInFlight, 'flightStatus', statusArr[2]);
        set(updateToInFlight, 'statusColour', colourArr[2]);
        break;
      case "green":
        set(updateToInFlight, 'flightStatus', statusArr[0]);
        set(updateToInFlight, 'statusColour', colourArr[0]);
        set(updateToInFlight, 'reverse', !updateToInFlight.reverse);
        set(updateToInFlight, 'invertIcon', !updateToInFlight.invertIcon);
        break;
      default:
        // Invalid flight status
        break;
    }

    // Apply update
    this.set('flightPaths', this.buildPolyline(polylineArray));

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
  planeRightIcon: computed(function () {
    return L.icon(PlaneRightIcon.create());
  }),
  planeLeftIcon: computed(function () {
    return L.icon(PlaneLeftIcon.create());
  }),
  slingShotIcon: computed(function () {
    return L.icon(SlingShotIcon.create());
  })
});

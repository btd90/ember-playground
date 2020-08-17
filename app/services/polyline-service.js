import Service from '@ember/service';
import PlaneRightIcon from '../objects/icons/plane-right-icon';
import PlaneLeftIcon from '../objects/icons/plane-left-icon';
import {
  A
} from '@ember/array';
import {
  computed,
  set
} from "@ember/object";

/**
 * Service to aid polylines on the map.
 */
export default Service.extend({

  init() {
    this._super(...arguments);
    this.set('leaflet', window.L);

    // Flight demo vars
    this.set('statusArr', ['Awaiting Departure..', 'In The Air..', 'Arrived!!']);
    this.set('colourArr', ['grey', 'orange', 'green']);

    // Fly to locations
    this.set('russia', {
      location: [65, 98],
      zoom: 2
    });
    this.set('japan', {
      location: [37, 138],
      zoom: 4
    });
    this.set('newzealand', {
      location: [-42, 173],
      zoom: 4
    });
    this.set('australia', {
      location: [-25, 134],
      zoom: 3
    });
    this.set('melbourne', {
      location: [-37.8136, 144.9631],
      zoom: 8
    });
    this.set('sydney', {
      location: [-33.8688, 151.2093],
      zoom: 8
    });
  },

  /* Fetch location/zoom for fly to destination */
  findDestination(destination) {
    let dest;

    switch(destination) {
      case "Russia":
        dest = this.get('russia');
        break;
      case "Japan":
        dest = this.get('japan');
        break;
      case "New Zealand":
        dest = this.get('newzealand');
        break;
      case "Australia":
        dest = this.get('australia');
        break;
      case "Melbourne":
        dest = this.get('melbourne');
        break;
      case "Sydney":
        dest = this.get('sydney');
        break;
      default:
        break;
    }
    return dest;
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
        symbol: this.get('leaflet').Symbol.arrowHead({
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

  // Update flight status for polyline demo
  updatePolyline(polylineArray) {
    let statusArr = this.get('statusArr');
    let colourArr = this.get('colourArr');
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
    return polylineArray;
  },

  // Convert linestring to object for polyline
  convertLineString(mexico, antarctica, russia, india) {
    let polylineArray = A();

    // Add flight paths
    if (mexico) {
      let mexicoLineString = this.get('mexicoLineString');
      polylineArray.pushObject({
        coordinates: mexicoLineString.geometry.coordinates,
        flight: mexicoLineString.properties.flight,
        flightStatus: mexicoLineString.properties.status,
        invertIcon: mexicoLineString.properties.invertIcon,
        statusColour: mexicoLineString.properties.statusColour,
        popupOpen: mexicoLineString.properties.popupOpen,
      });
    }
    if (antarctica) {
      let antarcticaLineString = this.get('antarcticaLineString');
      polylineArray.pushObject({
        coordinates: antarcticaLineString.geometry.coordinates,
        flight: antarcticaLineString.properties.flight,
        flightStatus: antarcticaLineString.properties.status,
        invertIcon: antarcticaLineString.properties.invertIcon,
        statusColour: antarcticaLineString.properties.statusColour,
        popupOpen: antarcticaLineString.properties.popupOpen,
      });
    }
    if (russia) {
      let russiaLineString = this.get('russiaLineString');
      polylineArray.pushObject({
        coordinates: russiaLineString.geometry.coordinates,
        flight: russiaLineString.properties.flight,
        flightStatus: russiaLineString.properties.status,
        invertIcon: russiaLineString.properties.invertIcon,
        statusColour: russiaLineString.properties.statusColour,
        popupOpen: russiaLineString.properties.popupOpen,
      });
    }
    if (india) {
      let indiaLineString = this.get('indiaLineString');
      polylineArray.pushObject({
        coordinates: indiaLineString.geometry.coordinates,
        flight: indiaLineString.properties.flight,
        flightStatus: indiaLineString.properties.status,
        invertIcon: indiaLineString.properties.invertIcon,
        statusColour: indiaLineString.properties.statusColour,
        popupOpen: indiaLineString.properties.popupOpen,
      });
    }
    return polylineArray;
  },

  planeRightIcon: computed(function () {
    return this.get('leaflet').icon(PlaneRightIcon.create());
  }),
  planeLeftIcon: computed(function () {
    return this.get('leaflet').icon(PlaneLeftIcon.create());
  }),

  mexicoLineString: computed(function () {
    return {
      "type": "Feature",
      "properties": {
        "name": "Mexico Flight Path",
        "flight": "mexico",
        "status": "Awaiting Departure..",
        "statusColour": "grey",
        "invertIcon": false,
        "reverse": false,
        "popupOpen": false,
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-29.6, 23],
          [-25.3, 10.6],
          [-21, -1.8],
          [-16.7, -8.8],
          [-12.4, -19.4],
          [-8.1, -30],
          [-3.8, -40.6],
          [0.5, -51.2],
          [4.8, -61.8],
          [9.1, -72.4],
          [13.4, -83],
          [17.7, -93.6],
          [22, -104.2]
        ]
      }
    };
  }),

  antarcticaLineString: computed(function () {
    return {
      "type": "Feature",
      "properties": {
        "name": "Antarctica Flight Path",
        "flight": "antarctica",
        "status": "In The Air..",
        "statusColour": "orange",
        "invertIcon": false,
        "reverse": false,
        "popupOpen": false,
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-30, 120],
          [-40, 111],
          [-50, 102],
          [-60, 93],
          [-70, 84]
        ]
      }
    };
  }),

  russiaLineString: computed(function () {
    return {
      "type": "Feature",
      "properties": {
        "name": "Russia Flight Path",
        "flight": "russia",
        "status": "Awaiting Departure..",
        "statusColour": "grey",
        "invertIcon": true,
        "reverse": false,
        "popupOpen": false,
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [10, 20],
          [20, 30],
          [30, 40],
          [40, 50],
          [50, 60],
          [60, 70],
          [70, 80]
        ]
      }
    };
  }),

  indiaLineString: computed(function () {
    return {
      "type": "Feature",
      "properties": {
        "name": "India Flight Path",
        "flight": "india",
        "status": "Arrived!!",
        "statusColour": "green",
        "invertIcon": false,
        "reverse": false,
        "popupOpen": false,
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [36, 138],
          [32, 123],
          [28, 108],
          [24, 93],
          [20, 78]
        ]
      }
    };
  }),
});

import Service from '@ember/service';
import { A } from '@ember/array';
import { computed } from "@ember/object";

/**
 * Service for converting Geo LineString (flight paths) to an object that can be 
 * used by polyline layer.  
 */
export default Service.extend({
  
    init() {
        this._super(...arguments);
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

    mexicoLineString: computed(function() {
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

    antarcticaLineString: computed(function() {
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

    russiaLineString: computed(function() {
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

    indiaLineString: computed(function() {
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
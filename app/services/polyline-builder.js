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
    convertLineString(africa, antarctica, russia, japan) {
        let polylineArray = A();

        // Add flight paths
        if (africa) {
            let africaLineString = this.get('africaLineString');
            polylineArray.pushObject(africaLineString.geometry.coordinates);
        }
        if (antarctica) {
            let antarcticaLineString = this.get('antarcticaLineString');
            polylineArray.pushObject(antarcticaLineString.geometry.coordinates);
        }
        if (russia) {
            let russiaLineString = this.get('russiaLineString');
            polylineArray.pushObject(russiaLineString.geometry.coordinates);
        }
        if (japan) {
            let japanLineString = this.get('japanLineString');
            polylineArray.pushObject(japanLineString.geometry.coordinates);
        }

        return polylineArray;
    },

    africaLineString: computed(function() {
        return {
            "type": "Feature",
            "properties": {
                "name": "Africa Flight Path",
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

    japanLineString: computed(function() {
        return {
            "type": "Feature",
            "properties": {
                "name": "Japan Flight Path",
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
import Component from '@ember/component';
import { computed } from '@ember/object';

/**
 * SVG component for visualisation on the map, capable of drawing a line
 * from one edge of the display to the other.
 *
 * @argument {String} start - defined location in the view to start the
 *   path, accepts one of [topLeft, topRight, bottomLeft, bottomRight]
 * @argument {String} end - defined location in the view to end the
 *   path, accepts one of [topLeft, topRight, bottomLeft, bottomRight]
 */
export default Component.extend({
    tagName: '',

    // Build path string based on start/end points
    pathVal: computed('start', 'end', function() {
        let start = this.get('start');
        let end = this.get('end');
        let position = 'M ';
        let startPoint, positionString, endPoint;

        // Prepare string for path
        switch(start) {
            case "topLeft":
                startPoint = '0 0';
                positionString = ' C 20 20, 40 20, ';
                if (end === "topLeft") endPoint = '0 0';
                if (end === "topRight") endPoint = '100 0';
                if (end === "bottomLeft") endPoint = '0 100';
                if (end === "bottomRight") endPoint = '100 100';
                break;
            case "topRight":
                startPoint = '100 0';
                positionString = ' C 20 20, ';
                if (end === "topLeft") endPoint = '40 20, 0 0';
                if (end === "topRight") endPoint = '40 20, 100 0';
                if (end === "bottomLeft") endPoint = '60 20, 0 100';
                if (end === "bottomRight") endPoint = '60 20, 100 100';
                break;
            case "bottomLeft":
                startPoint = '0 100';
                positionString = ' C 20 20, ';
                if (end === "topLeft") endPoint = '40 20, 0 0';
                if (end === "topRight") endPoint = '60 20, 100 0';
                if (end === "bottomLeft") endPoint = '40 20, 0 100';
                if (end === "bottomRight") endPoint = '40 60, 100 100';
                break;
            case "bottomRight":
                startPoint = '100 100';
                positionString = ' C 20 20, ';
                if (end === "topLeft") endPoint = '40 20, 0 0';
                if (end === "topRight") endPoint = '60 20, 100 0';
                if (end === "bottomLeft") endPoint = '40 40, 0 100';
                if (end === "bottomRight") endPoint = '40 60, 100 100';
                break;
            default:
                // Invalid position
        }

        return position + startPoint + positionString + endPoint;
    }),
})

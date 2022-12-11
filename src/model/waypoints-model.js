import {getRandomMockWaypoint} from '../mock/waypoint.js';

const WAYPOINT_COUNT = 3;

export default class WaypointsModel {
  wayponints = Array.from({length: WAYPOINT_COUNT}, getRandomMockWaypoint);

  getWaypoints() {
    return this.wayponints;
  }
}


import {getRandomPoint, getRandomDestination, getRandomOffers} from '../mock/point.js';

const WAYPOINT_COUNT = 5;

export default class PointsModel {

  constructor() {
    this.points = Array.from({length: WAYPOINT_COUNT}, getRandomPoint);
    this.destinations = Array.from({length: WAYPOINT_COUNT}, getRandomDestination);
    this.offers = Array.from({length: WAYPOINT_COUNT}, getRandomOffers);
  }

  getPoints() {
    return this.points;
  }

  getDestination() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}

import {getRandomPoint, getRandomDestination, getRandomOffers} from '../mock/point.js';

const WAYPOINT_COUNT = 5;

export default class PointsModel {
  points = Array.from({length: WAYPOINT_COUNT}, getRandomPoint);
  destinations = Array.from({length: WAYPOINT_COUNT}, getRandomDestination);
  offers = Array.from({length: WAYPOINT_COUNT}, getRandomOffers);

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


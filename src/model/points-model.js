import {getRandomPoint, DESTINATIONS, OFFERS} from '../mock/point.js';

const WAYPOINT_COUNT = 5;

export default class PointsModel {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor () {
    this.#points = Array.from({length: WAYPOINT_COUNT}, getRandomPoint);
    this.#destinations = DESTINATIONS;
    this.#offers = OFFERS;

  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}

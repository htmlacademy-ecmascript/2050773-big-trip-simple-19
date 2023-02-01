import {getRandomPoint, DESTINATIONS, OFFERS} from '../mock/point.js';
import Observable from '../framework/observable.js';

const WAYPOINT_COUNT = 5;

export default class PointsModel extends Observable {
  #points = Array.from({length: WAYPOINT_COUNT}, getRandomPoint);
  #destinations = DESTINATIONS;
  #offers = OFFERS;


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

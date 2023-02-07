// import {getRandomPoint, DESTINATIONS, OFFERS} from '../mock/point.js';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';


// const WAYPOINT_COUNT = 5;

export default class PointsModel extends Observable {
  #pointsApiService = null;
  // #points = Array.from({length: WAYPOINT_COUNT}, getRandomPoint);
  #points = [];
  #destinations = [];
  #offersByTypes = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offersByTypes;
  }


  // get points() {

  //   return this.#points.map((point) => {
  //     const offerByTypes = this.#offersByTypes.find((offer) => offer.type === point.type);
  //     const destination = this.#destinations.find((direction) => direction.id === point.destination);
  //     const offersByTypes = this.#offersByTypes;
  //     const destinations = this.#destinations;


  //     return {
  //       ...point,
  //       destination,
  //       offerByTypes,
  //       offersByTypes,
  //       destinations
  //     };
  //   });
  // }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const allOffers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;
      this.#points = points.map(this.#adaptToClient);
      this.#offersByTypes = allOffers;
    }
    catch(err) {
      this.#points = [];
      this.#offersByTypes = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting points');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoiny(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      destId: point['destination'],
      selectedOffers: point['offers'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['destination'];
    delete adaptedPoint['offers'];

    return adaptedPoint;
  }
}

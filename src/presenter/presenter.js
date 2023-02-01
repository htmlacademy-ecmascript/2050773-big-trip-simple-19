import TripEventsListView from '../view/trips-list-view.js';
import NoTripView from '../view/no-trip-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter.js';


export default class FormPresenter {
  #formContainer = null;
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #pointComponent = new TripEventsListView();
  #tripEventPresenter = new Map();
  #sortComponent = new SortView();
  #noTripComponent = new NoTripView();


  constructor({formContainer, pointsModel}) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;

  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#tripEventPresenter.forEach((presenter) => presenter.resetView());
  };


  #renderSort() {
    render(this.#sortComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destinations, offers) {

    const tripEventPresenter = new TripEventPresenter({
      tripListContainer: this.#pointComponent.element,
      onModeChange: this.#handleModeChange
    });

    tripEventPresenter.init(point, destinations, offers);
    this.#tripEventPresenter.set(point.id, tripEventPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#destinations, this.#offers);
    }
  }

  #renderNoPoints() {
    render(this.#noTripComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearTrips() {
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();
  }

  #renderBoard() {
    render(this.#pointComponent, this.#formContainer);
    if (this.#points.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPoints();
  }
}

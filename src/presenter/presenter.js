import TripEventsListView from '../view/trips-list-view.js';
import NoTripView from '../view/no-trip-view.js';
import SortView from '../view/sort.js';
import {render} from '../framework/render.js';
import TripEventPresenter from '../presenter/trip-evet-presenter.js';


export default class FormPresenter {
  #formContainer = null;
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #pointComponent = new TripEventsListView();


  constructor({formContainer, pointsModel}) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;

  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(this.#pointComponent, this.#formContainer);

    if (this.#points.every((point) => point.isArchive)) {
      render(new NoTripView(), this.#pointComponent.element);
    } else {
      render(new SortView(), this.#pointComponent.element);
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i], this.#destinations, this.#offers);
      }
    }
  }

  #renderPoint(point, destinations, offers) {

    const tripEventPresenter = new TripEventPresenter({
      tripListContainer: this.#pointComponent.element,
    });

    tripEventPresenter.init(point, destinations, offers);
  }
}

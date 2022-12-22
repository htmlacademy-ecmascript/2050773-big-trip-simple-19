import FormCreationView from '../view/creation-form.js';
import TripEventView from '../view/trip-event.js';
import {render} from '../render.js';


export default class FormPresenter {
  #formContainer = null;
  #pointsModel = null;
  #formComponent = null;

  #points = [];
  #destinations = [];
  #offers = [];


  constructor({formContainer, pointsModel}) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;
    this.#formComponent = new FormCreationView();

  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];


    render(new FormCreationView(this.#points[0], this.#destinations, this.#offers), this.#formContainer);

    const tripEventListElement = document.querySelector('.trip-events__list');

    for (let i = 0; i < this.#points.length; i++) {
      render(new TripEventView({point: this.#points[i]}), tripEventListElement);
    }
  }
}

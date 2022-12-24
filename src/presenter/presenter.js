import FormCreationView from '../view/creation-form.js';
import TripEventComponent from '../view/one-trip-view.js';
import TripEventsView from '../view/events-view.js';
import {render, RenderPosition} from '../render.js';


export default class FormPresenter {
  #formContainer = null;
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #formComponent = new TripEventsView();


  constructor({formContainer, pointsModel}) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;

  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(this.#formComponent, this.#formContainer);


    // render(new FormCreationView(this.#points[0], this.#destinations, this.#offers), this.#formContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.#points.length; i++) {
      render(new TripEventComponent({point: this.#points[i]}), this.#formComponent.element);
    }
  }
}

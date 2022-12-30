import FormCreation from '../view/creation-form.js';
import TripEventComponent from '../view/one-trip-view.js';
import TripEventsView from '../view/events-view.js';
import NoTripView from '../view/no-trip-view.js';
import SortView from '../view/sort.js';
import {render} from '../render.js';


export default class FormPresenter {
  #formContainer = null;
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #pointComponent = new TripEventsView();


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
    const pointComponent = new TripEventComponent({point});
    const pointEditComponent = new FormCreation(point, destinations, offers);

    const replacePointToForm = () => {
      this.#pointComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };


    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click',() => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit',(evt) =>{
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',(evt) =>{
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#pointComponent.element);
  }
}

import FormCreation from '../view/creation-form.js';
import TripEventComponent from '../view/one-trip-view.js';
import TripEventsView from '../view/events-view.js';
import NoTripView from '../view/no-trip-view.js';
import SortView from '../view/sort.js';
import {render} from '../framework/render.js';


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

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new TripEventComponent({point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new FormCreation(point, destinations, offers,{
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRolldownClick: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToForm() {
      this.#pointComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replaceFormToPoint () {
      this.#pointComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    render(pointComponent, this.#pointComponent.element);
  }
}

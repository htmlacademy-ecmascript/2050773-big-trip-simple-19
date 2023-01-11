import {render, replace} from '../framework/render.js';
import EditTripView from '../view/edit-point-form.js';
import TripEventComponent from '../view/one-trip-view.js';

export default class TripEventPresenter {
  #tripListContainer = null;
  #tripComponent = null;
  #tripEditComponent = null;
  #point = null;
  #destinations = null;
  #offers = null;

  constructor({tripListContainer}) {
    this.#tripListContainer = tripListContainer;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#tripComponent = new TripEventComponent({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });

    this.tripEditComponent = new EditTripView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRolldownClick: this.#handleFormSubmit,
    });

    render(this.#tripComponent, this.#tripListContainer);
  }

  #replacePointToForm() {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}

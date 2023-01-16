import {render, replace} from '../framework/render.js';
import EditTripView from '../view/edit-trp-view.js';
import TripEventComponent from '../view/one-trip-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripEventPresenter {
  #tripListContainer = null;
  #tripComponent = null;
  #tripEditComponent = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;


  constructor({tripListContainer, onModeChange}) {
    this.#tripListContainer = tripListContainer;
    this.#handleModeChange = onModeChange;
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

    this.#tripEditComponent = new EditTripView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRolldownClick: this.#handleFormSubmit,
    });

    render(this.#tripComponent, this.#tripListContainer);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

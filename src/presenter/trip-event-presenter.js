import {render, replace, remove} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import EditTripView from '../view/edit-point-view.js';
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
  #handleDataChange = null;
  #mode = Mode.DEFAULT;


  constructor({tripListContainer, onDataChange, onModeChange}) {
    this.#tripListContainer = tripListContainer;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

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
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripListContainer);
      return;
    }

    if (this.#tripListContainer.contains(prevTripEditComponent.element)) {
      replace(this.#tripComponent, prevTripEditComponent);
    }

    if (this.#tripListContainer.contains(prevTripEditComponent.element)) {
      replace(this.#tripEditComponent, prevTripEditComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripComponent, prevTripEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);

  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#tripEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#tripEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#tripEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripEditComponent.shake(resetFormState);
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToPoint();
  };
}

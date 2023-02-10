import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {createDestination, createDescription, createPictures} from '../utils.js';
import dayjs from 'dayjs';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: '22022-02-24T12:55:56.845Z',
  dateTo: '2022-02-24T11:22:13.375Z',
  destination: -1,
  offers: [],
  type: 'Bus',
};

// const createOfferTemplate = (offer) =>
//   `
//   <div class="event__offer-selector">
//     <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
//     <label class="event__offer-label" for="event-offer-luggage-1">
//       <span class="event__offer-title">${offer.title}</span>
//       &plus;&euro;&nbsp;
//       <span class="event__offer-price" pattern="^[0-9]+$">${offer.price}</span>
//     </label>
//   </div>`;

const createOffersTemplate = (offers, checkedOffers, isDisabled) => {
  if (offers.length > 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${offers.map(({ id, title, price }) =>`
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" value=${id} ${checkedOffers.includes(id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
              <label class="event__offer-label" for="event-offer-${id}">
                <span class="event__offer-title">${title}</span>
                  &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
          </div>`).join('')}
        </div>
      </section>`);
  }
};


const createPicturesTemplate = (picture) => ` <img class="event__photo" src="${picture.src}">`;


const findOffersByID = (type, offers) => {
  for (let j = 0; j < offers.length; j++) {
    if (offers[j].type === type) {
      return offers[j];
    }
  }
};


const createPointPictures = (pointPictures) => `<div class="event__photos-tape">${pointPictures.map((picture) => createPicturesTemplate(picture)).join('')}</div>`;

const createFormCreationTemplate = (point, destinations, offers, isDisabled) => {
  const {dateFrom, dateTo, destinationId, type, basePrice, isSaving, isDeleting} = point;


  const offersByType = findOffersByID(type, offers).offers;

  const offersTemplate = createOffersTemplate(offersByType, offers, isDisabled);


  const pointPictures = createPictures(destinationId, destinations);

  return `<ul class="trip-events__list">
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png"" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${createDestination(destinationId, destinations)}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('MM/DD/YY	HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('MM/DD/YY	HH:mm')}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
          <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            ${offersTemplate}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description"> ${createDescription(destinationId, destinations)}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${createPointPictures(pointPictures)}
            </div>
          </section>
        </section>
      </form>
    </li>
  </ul>`;
};

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleRolldownClick = null;
  #handleDeleteClick = null;

  constructor({point = BLANK_POINT, destinations, offers, onFormSubmit, onRolldownClick, onDeleteClick}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRolldownClick = onRolldownClick;
    this.#handleDeleteClick = onDeleteClick;


    this._restoreHandlers();
  }

  get template() {
    return createFormCreationTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editRolldownHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

  }

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#destinations.find((item) => item.name === evt.target.value);
    const newDestinationId = newDestination ? newDestination.id : -1;
    this.updateElement({
      destinationId: newDestinationId,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offersIds: this._state.type === evt.target.value ? this._state.offers : []
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const currentPoint = EditPointView.parseStateToPoint(this._state);
    this.#handleFormSubmit(currentPoint);
  };

  #editRolldownHandler = (evt) => {
    evt.preventDefault();
    const currentPoint = EditPointView.parseStateToPoint(this._state);
    this.#handleFormSubmit(currentPoint);
  };


  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return { ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}

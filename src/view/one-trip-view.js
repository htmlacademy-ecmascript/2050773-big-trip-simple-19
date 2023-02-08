import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {createDestination} from '../utils.js';

const findOffersByID = (type, offers) => {
  for (let j = 0; j < offers.length; j++) {
    if (offers[j].type === type) {
      return offers[j];
    }
  }
};

const createTripEventTemplate = (point, destinations, offers) => {
  const {dateFrom, dateTo, destId, type, basePrice} = point;
  let OfferAdditional = findOffersByID(type, offers);
  OfferAdditional = OfferAdditional.offers[0];

  return `<li class="trip-events__item">
      <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM D')}</time>

        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${createDestination(destId, destinations)}</h3>
        <div class="event__schedule">
          <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateFrom).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${OfferAdditional.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${OfferAdditional.price}</span>
          </li>
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};


export default class TripEventComponent extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;

  constructor({point, destinations, offers,onEditClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createTripEventTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}

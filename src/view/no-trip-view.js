import AbstractView from '../framework/view/abstract-view.js';

const createNoTripTemplate = () => `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`;


export default class NoTripView extends AbstractView {
  get template() {
    return createNoTripTemplate();
  }
}

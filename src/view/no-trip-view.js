import AbstractView from '../framework/view/abstract-view.js';

function createNoTripTemplate () {
  return (
    `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`
  );
}

export default class NoTripView extends AbstractView {
  get template() {
    return createNoTripTemplate();
  }
}

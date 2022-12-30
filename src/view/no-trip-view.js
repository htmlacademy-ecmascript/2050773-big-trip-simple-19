import {createElement} from '../render.js';

function createNoTripTemplate () {
  return (
    `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`
  );
}

export default class NoTripView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoTripTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}


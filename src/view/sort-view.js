import AbstractView from '../framework/view/abstract-view.js';
import { NO_SORT_TYPES, SortType } from '../const.js';

function createItemTemplate (sortItem, isChecked) {
  const isDisabled = NO_SORT_TYPES.includes(sortItem);
  return `<div class="trip-sort__item  trip-sort__item--${sortItem}">
      <input id="sort-${sortItem}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sortItem}"
      data-sort-type="${sortItem}" ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortItem}">${sortItem}</label>
    </div>`;
}

function createSortTemplate(currentSortType) {
  const sortItemTemplate = Object.entries(SortType).map((item) => item[1])
    .map((sortItem) => createItemTemplate(sortItem, currentSortType === sortItem))
    .join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortItemTemplate}
</form>`;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}

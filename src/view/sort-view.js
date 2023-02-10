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

// import AbstractView from '../framework/view/abstract-view.js';
// import {SortType} from '../const.js';


// const createSortTemplate = (currentSortType) =>
//   `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
//       <div class="trip-sort__item  trip-sort__item--day">
//         <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortType.DAY ? 'checked' : ''}>
//         <label class="trip-sort__btn" for="sort-day">Day</label>
//       </div>

//       <div class="trip-sort__item  trip-sort__item--event">
//         <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" ${currentSortType === SortType.EVENT ? 'checked' : ''} >
//         <label class="trip-sort__btn" for="sort-event">Event</label>
//       </div>

//       <div class="trip-sort__item  trip-sort__item--time">
//         <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortType.TIME ? 'checked' : ''}>
//         <label class="trip-sort__btn" for="sort-time">Time</label>
//       </div>

//       <div class="trip-sort__item  trip-sort__item--price">
//         <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortType.PRICE ? 'checked' : ''}>
//         <label class="trip-sort__btn" for="sort-price">Price</label>
//       </div>

//       <div class="trip-sort__item  trip-sort__item--offer">
//         <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" ${currentSortType === SortType.OFFER ? 'checked' : ''}>
//         <label class="trip-sort__btn" for="sort-offer">Offers</label>
//       </div>
//     </form>`;


// export default class SortView extends AbstractView {
//   #currentSortType = null;
//   #handleSortTypeChange = null;

//   constructor({currentSortType, onSortTypeChange}) {
//     super();
//     this.#currentSortType = currentSortType;
//     this.#handleSortTypeChange = onSortTypeChange;

//     this.element.addEventListener('click', this.#sortTypeChangeHandler);
//   }

//   get template() {
//     return createSortTemplate(this.#currentSortType);
//   }

//   #sortTypeChangeHandler = (evt) => {

//     evt.preventDefault();
//     this.#handleSortTypeChange(evt.target.dataset.sortType);
//   };
// }

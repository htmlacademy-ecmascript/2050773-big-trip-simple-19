import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import TripEventView from './view/trip-event.js';
import EditFormView from './view/edit-form.js';
import {RenderPosition, render} from './render.js';
import FormPresenter from './presenter/presenter.js';
const TRIP_EVENTS_AMOUNT = 3;


const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events'); //его в презентер

render(new FilterView(), siteFiltersElement);
render(new SortView(), tripEventsElement);
// render(new FormCreationView(), tripEventsElement); //вместо него презентер

const formPresenter = new FormPresenter({formContainer: tripEventsElement});

formPresenter.init();

const TripEventListElement = document.querySelector('.trip-events__list');

for (let i = 0; i < TRIP_EVENTS_AMOUNT; i++) {
  render(new TripEventView(), TripEventListElement);
}

render(new EditFormView(), TripEventListElement, RenderPosition.AFTERBEGIN);

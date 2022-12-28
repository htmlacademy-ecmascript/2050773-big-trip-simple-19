import FilterView from './view/filter.js';
import SortView from './view/sort.js';
// import EditFormView from './view/edit-form.js';
import {render} from './render.js';
import FormPresenter from './presenter/presenter.js';
import PointsModel from './model/points-model';


const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events'); //его в презентер

render(new FilterView(), siteFiltersElement);
render(new SortView(), tripEventsSection);


const pointsModel = new PointsModel();
const formPresenter = new FormPresenter({
  formContainer: tripEventsSection,
  pointsModel,
});

formPresenter.init();

// const tripEventListElement = document.querySelector('.trip-events__list');
// render(new EditFormView(), tripEventListElement, RenderPosition.AFTERBEGIN);

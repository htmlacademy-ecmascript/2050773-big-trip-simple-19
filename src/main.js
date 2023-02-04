import FormPresenter from './presenter/presenter.js';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');


const filterModel = new FilterModel();
const pointsModel = new PointsModel();

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  filterModel,
  pointsModel
});

const formPresenter = new FormPresenter({
  formContainer: tripEventsSection,
  newPointButtonContainer: siteHeaderElement,
  pointsModel,
  filterModel,
});

filterPresenter.init();
formPresenter.init();

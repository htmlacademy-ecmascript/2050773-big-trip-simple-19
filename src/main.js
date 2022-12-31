import FilterView from './view/filter.js';
import {render} from './framework/render.js';
import FormPresenter from './presenter/presenter.js';
import PointsModel from './model/points-model';


const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

render(new FilterView(), siteFiltersElement);

const pointsModel = new PointsModel();
const formPresenter = new FormPresenter({
  formContainer: tripEventsSection,
  pointsModel,
});

formPresenter.init();

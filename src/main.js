import FormPresenter from './presenter/presenter.js';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';
import { render } from './framework/render.js';


const AUTHORIZATION = 'Basic hS2s45tgfr4567uhg1';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';


const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');


const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

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
  onNewPointDestroy: handleNewEventFormClose
});

const newEventButtonComponent = new NewPointButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  formPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}

Promise.all([
  pointsModel.init()
]).catch(() => {
  newEventButtonComponent.element.disabled = true;
}).finally(() => {
  render(newEventButtonComponent, siteHeaderElement);
});



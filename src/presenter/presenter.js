import TripEventsListView from '../view/trips-list-view.js';
import NoTripView from '../view/no-trip-view.js';
import SortView from '../view/sort-view.js';
import NewPointPresenter from './new-point-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter.js';
import {UpdateType, UserAction, FilterType, SortType} from '../const.js';
import {filter} from '../utils.js';


export default class FormPresenter {
  #formContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #pointComponent = new TripEventsListView();
  #tripEventPresenter = new Map();
  #newPointPresenter = null;
  #noTripComponent = new NoTripView();
  #sortComponent = null;
  #currentSortType = SortType.PRICE;


  constructor({formContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    return filteredPoints;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoard();
  }


  createPoint() {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  }


  #renderPoint(point, destinations, offers) {

    const tripEventPresenter = new TripEventPresenter({
      tripListContainer: this.#pointComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });

    tripEventPresenter.init(point, destinations, offers);
    this.#tripEventPresenter.set(point.id, tripEventPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#destinations, this.#offers);
    }
  }

  #renderNoPoints() {
    render(this.#noTripComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  }


  #clearBoard() {
    this.#newPointPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#noTripComponent);

  }

  #renderBoard() {
    render(this.#pointComponent, this.#formContainer);
    if (this.#points.every((point) => point.isArchive)) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPoints();
  }
}

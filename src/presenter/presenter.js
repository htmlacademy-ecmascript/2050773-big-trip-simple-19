import TripEventsListView from '../view/trip-events-list-view.js';
import NoTripView from '../view/no-trip-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import SortView from '../view/sort-view.js';
import NewPointPresenter from './new-point-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter.js';
import {UpdateType, UserAction, FilterType, SortType} from '../const.js';
import {filter, sortByTime, sortByPrice, sortByDay} from '../utils.js';
import LoadingView from '../view/loading-view.js';
import ErrorLoadingView from '../view/error-loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class FormPresenter {
  #formContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #newPointButtonContainer = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #sortView = null;


  #pointComponent = new TripEventsListView();
  #tripEventPresenter = new Map();
  #newPointPresenter = null;
  #newPointButtonComponent = null;
  #noTripComponent = null;
  #sortComponent = null;
  #loadingComponent = new LoadingView();
  #ErrorLoadingView = new ErrorLoadingView();
  #currentSortType = SortType.PRICE;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isErrorLoading = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({formContainer, newPointButtonContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointButtonContainer = newPointButtonContainer;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick,
    });


    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = [...this.#pointsModel.points];


    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }
    return filteredPoints.sort(sortByDay);
  }

  get destinations() {
    const destinations = [...this.#pointsModel.destinations];
    return destinations;
  }

  get offers() {
    const offers = [...this.#pointsModel.offers];
    return offers;
  }


  #updatePoints() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
  }

  createPoint() {

    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    remove(this.#noTripComponent);

    this.#newPointPresenter.init(this.#points[0], this.#destinations, this.#offers);
  }


  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#newPointButtonComponent.element.disabled = true;
    this.createPoint();
  };


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripEventPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#tripEventPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#tripEventPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#tripEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#tripEventPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#tripEventPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.ERROR_LOADING:
        this.#isErrorLoading = true;
        remove(this.#loadingComponent);
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
    this.#updatePoints();
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.#destinations, this.#offers);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderErrorLoading() {
    render(this.#ErrorLoadingView, this.#formContainer);
  }

  #renderNoPoints() {
    this.#noTripComponent = new NoTripView({
      filterType: this.#filterType
    });

    render(this.#noTripComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  }


  #clearBoard() {
    this.#newPointPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#noTripComponent);
    remove(this.#loadingComponent);
  }

  #renderBoard() {
    if (this.#isErrorLoading) {
      this.#renderErrorLoading();
      return;
    }

    render(this.#pointComponent, this.#formContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderNoPoints();
    }
    this.#renderSort();
    this.#renderPoints();

    render(this.#newPointButtonComponent, this.#newPointButtonContainer);
    this.#handleNewPointFormClose();
  }
}

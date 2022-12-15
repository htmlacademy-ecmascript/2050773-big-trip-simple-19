import FormCreationView from '../view/creation-form.js';
import TripEventView from '../view/trip-event.js';
import {render} from '../render.js';


export default class FormPresenter {
  formComponent = new FormCreationView();

  constructor({formContainer, pointsModel}) {
    this.formContainer = formContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destination = [...this.pointsModel.getDestination()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new FormCreationView(this.points[0], this.destination, this.offers), this.formContainer);

    const TripEventListElement = document.querySelector('.trip-events__list');

    for (let i = 0; i < this.points.length; i++) {
      render(new TripEventView({point: this.points[i]}), TripEventListElement);
    }
  }
}

import FormCreationView from '../view/creation-form.js';
import {render} from '../render.js';

export default class FormPresenter {
  formComponent = new FormCreationView();

  constructor({formContainer}) {
    this.formContainer = formContainer;
  }

  init() {
    render(this.formComponent, this.formContainer);
  }
}

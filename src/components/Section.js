export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderCards(items) {
    items.reverse().forEach(item => {
      this.addItem(item);
    })
  }

  addItem(item) {
    this._element.prepend(this._renderer(item));
  }

}

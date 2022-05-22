export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderCards(items) {
    items.forEach(item => {
      this.addItem(item);
    })
  }

  addItem(item) {
    this._selector.append(this._renderer(item));
  }

}

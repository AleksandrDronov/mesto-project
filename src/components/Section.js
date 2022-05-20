export default class Section {
  constructor ({items, userId, renderer}, selector){
    this._items = items;
    this._userId = userId;
    this._renderer = renderer;
    this._selector = selector;
  }

renderCards() {
  this._items.forEach(item => {
    this._renderer(item);
  })
}

addItem(item) {
  page.querySelector(this._selector).append(item);
}

}

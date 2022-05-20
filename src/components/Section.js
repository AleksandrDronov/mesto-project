export default class Section {
  constructor ({items, renderer}, selector){
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

renderCards() {
  this._items.forEach(item => {
    this._renderer(item);
  })
}

addItem(item) {
  document.querySelector(this._selector).append(item);
}

}

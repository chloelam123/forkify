//import from parent class
import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';
  _message = '';

  addHandleRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
    // return this._data.map(data => this._generateMarkupPreview(data)).join('');
  }
}

export default new BookmarksView();

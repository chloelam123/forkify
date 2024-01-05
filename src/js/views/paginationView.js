//import from parent class
import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupPreviewBtnNext(curPage);
    }

    //Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPreviewBtnPrev(curPage);
    }

    //Other page
    if (this._data.page < numPages) {
      let markup = this._generateMarkupPreviewBtnPrev(curPage);
      markup += this._generateMarkupPreviewBtnNext(curPage);
      return markup;
    }

    //page 1, and there are No other pages
    return '';
  }

  _generateMarkupPreviewBtnPrev(result) {
    return `
      <button data-goto="${
        result - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${result - 1}</span>
          </button>
          `;
  }

  _generateMarkupPreviewBtnNext(result) {
    return `
    <button data-goto="${result + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${result + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
          `;
  }
}

export default new PaginationView();

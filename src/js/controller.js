import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// import icons from '../img/icons.svg'; //Parcel 1
import icons from 'url:../img/icons.svg'; //Parcel 2
import 'core-js/stable'; //is for polyfilling everything
import 'regenerator-runtime/runtime'; //is for polyfilling async/await

// if (module.hot) {
//   module.hot.accept;
// }

///////////////part of view
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

//Spinner

//s1: make an Ajax request to an API

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //prevent no id scenario occurs error
    //guard clauses. modern way to handle
    if (!id) return;
    recipeView.renderSpinner();

    //1) Update results view to mark selected search result
    resultView.update(model.getSearchResultPage());

    //2)Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //3) loading recipe
    await model.loadRecipe(id);

    //4) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //useful for checking the prototype
    // console.log(resultView);

    //1)get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResult(query);

    //3) render results
    resultView.render(model.getSearchResultPage());

    //4)Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  //3) render new results
  resultView.render(model.getSearchResultPage(goToPage));

  //4)Render new pagination buttons
  paginationView.render(model.state.search);
};

///Part2
const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2)update recipe view
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

//init
const init = function () {
  bookmarksView.addHandleRender(controlBookmarks);
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandleUpdateServings(controlServings);
  recipeView.addHandleBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandleClick(controlPagination);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

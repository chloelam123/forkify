import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

// import icons from '../img/icons.svg'; //Parcel 1
import icons from 'url:../img/icons.svg'; //Parcel 2
import 'core-js/stable'; //is for polyfilling everything
import 'regenerator-runtime/runtime'; //is for polyfilling async/await

if (module.hot) {
  module.hot.accept;
}

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

    //1. loading recipe
    await model.loadRecipe(id);

    //2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //useful for checking the prototype
    console.log(resultView);

    //1)get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResult(query);

    //3) render results
    resultView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

//init
const init = function () {
  recipeView.addHandleRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

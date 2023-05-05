import {shuffle} from './util.js';
import {createMiniatures} from './miniatures.js';

const MAX_RANDOM_PHOTO_NUMBER = 10;
const defaultFilterButton = document.getElementById('filter-default');
const randomFilterButton = document.getElementById('filter-random');
const discussedFilterButton = document.getElementById('filter-discussed');

const removeMiniatures = function() {
  const miniaturesList = document.querySelectorAll('.picture');
  miniaturesList.forEach((element) => {
    element.remove();
  });
};

const compareMiniatures = (a, b) =>  b.comments.length - a.comments.length;

const filterByDefault = function(miniatures) {
  defaultFilterButton.addEventListener('click', () => {
    removeMiniatures();
    discussedFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.add('img-filters__button--active');
    createMiniatures(miniatures);
  });
};

const filterRandom = (miniatures) => {
  randomFilterButton.addEventListener('click', () => {
    removeMiniatures();
    discussedFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    const randomPhotoList = shuffle(miniatures);
    createMiniatures(randomPhotoList.slice(0, MAX_RANDOM_PHOTO_NUMBER));
  });
};

const filterDiscussed = (miniatures) => {
  discussedFilterButton.addEventListener('click', () => {
    removeMiniatures();
    randomFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.add('img-filters__button--active');
    const newArray = miniatures.slice();
    createMiniatures(newArray.sort(compareMiniatures));
  });
};

const imageFiltering = (miniatures) => {
  filterByDefault(miniatures);
  filterRandom(miniatures);
  filterDiscussed(miniatures);
};

export {imageFiltering};

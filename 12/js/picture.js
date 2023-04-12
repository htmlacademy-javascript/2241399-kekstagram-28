import {debounce} from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS = 10;

const imgFilters = document.querySelector('.img-filters');

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const generatePictures = (data) => {
  const picturesFragment = document.createDocumentFragment();
  data.forEach((picture) => {
    const picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = picture.url;
    picturesElement.querySelector('.picture__likes').textContent = picture.likes;
    picturesElement.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesElement.dataset.id = picture.id;
    pictureListElement.appendChild(picturesElement);
  });

  pictureListElement.appendChild(picturesFragment);
};

const sortByComments = (photoOne, photoTwo) => {
  const commentsA = photoOne.comments.length;
  const commentsB = photoTwo.comments.length;
  return commentsB - commentsA;
};

const sortRandomly = () => Math.random() > 0.5 ? 1 : -1;

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const sortPhotos = (photos) => {
  const defaultSorting = document.querySelector('#filter-default');
  const randomSorting = document.querySelector('#filter-random');
  const sortingByComments = document.querySelector('#filter-discussed');

  defaultSorting.addEventListener('click', debounce(() => {
    defaultSorting.classList.add('img-filters__button--active');
    randomSorting.classList.remove('img-filters__button--active');
    sortingByComments.classList.remove('img-filters__button--active');
    const picArray = document.querySelectorAll('.picture');
    picArray.forEach((picture) => {
      picture.remove();
    });
    generatePictures(photos);
  }, RERENDER_DELAY));

  randomSorting.addEventListener('click', debounce(() => {
    defaultSorting.classList.remove('img-filters__button--active');
    randomSorting.classList.add('img-filters__button--active');
    sortingByComments.classList.remove('img-filters__button--active');
    const sortedPhotos = photos.slice().sort(sortRandomly).slice(0, RANDOM_PHOTOS);
    const picArray = document.querySelectorAll('.picture');
    picArray.forEach((picture) => {
      picture.remove();
    });
    generatePictures(sortedPhotos);
  }, RERENDER_DELAY));

  sortingByComments.addEventListener('click', debounce(() => {
    sortingByComments.classList.add('img-filters__button--active');
    defaultSorting.classList.remove('img-filters__button--active');
    randomSorting.classList.remove('img-filters__button--active');
    const sortedPhotos = photos.slice().sort(sortByComments);
    const picArray = document.querySelectorAll('.picture');
    picArray.forEach((picture) => {
      picture.remove();
    });
    generatePictures(sortedPhotos);
  }, RERENDER_DELAY));
};

export {generatePictures, showFilters, sortPhotos};

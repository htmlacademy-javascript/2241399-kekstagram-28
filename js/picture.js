import {getData} from './api.js';
import {showAlert} from './util.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const generatePictures = (data) => {
  data.forEach((picture) => {
    const picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = picture.url;
    picturesElement.querySelector('.picture__likes').textContent = picture.likes;
    picturesElement.querySelector('.picture__comments').textContent = picture.comments.length;


    pictureListElement.appendChild(picturesElement);
  });

  pictureListElement.appendChild(picturesFragment);
};
try {
  const picturesData = await getData();
  generatePictures(picturesData);
} catch (err) {
  showAlert(err.message);
}


export {generatePictures};

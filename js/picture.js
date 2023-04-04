import {generateDescriptionsArray} from './data.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesData = generateDescriptionsArray();
const picturesFragment = document.createDocumentFragment();

const generatePictures = () => {
  picturesData.forEach((picture) => {
    const picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = picture.url;
    picturesElement.querySelector('.picture__likes').textContent = picture.likes;
    picturesElement.querySelector('.picture__comments').textContent = picture.comments.length;


    pictureListElement.appendChild(picturesElement);
  });

  pictureListElement.appendChild(picturesFragment);
};

generatePictures();

export {generatePictures};

import {generatePictures} from './picture.js';
import {openBigPicture} from './full-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    if(!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +picture.dataset.picturelId
    );
    openBigPicture(picture);
  });

  generatePictures(pictures, container);
};

export {renderGallery};

import './util.js';
import './picture.js';
import './full-picture.js';
import './form.js';
import './scale.js';
import './effects.js';
import './api.js';
import './gallery.js';
import './message.js';

import { getData, sendData } from './api.js';
import {setOnFormSubmit, closeModal} from './form.js';
import {renderGallery} from './gallery.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import { addEventListenersPictures } from './full-picture.js';


setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

getData()
  .then((photosFromServer) => {
    renderGallery(photosFromServer);
    addEventListenersPictures(photosFromServer);
  });

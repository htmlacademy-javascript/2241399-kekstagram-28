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
import {showAlert} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';


setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}


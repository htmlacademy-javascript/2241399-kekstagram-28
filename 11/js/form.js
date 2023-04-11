import { resetScale } from './scale.js';
import {isEscapeKey} from './util.js';
import { resetEffects } from './effects.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const TAG_ERROR_TEXT = 'Хэштеги заполнены неверно';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('.img-upload__start');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keyddown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey() && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

const onCancelButtonClick = () => {
  closeModal();
};

const onFileInputChange = () => {
  openModal();
};

const isValidHashtag = (tag) => VALID_SYMBOLS.test(tag);
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueHashtags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtags = (index) => {
  const tags = index
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueHashtags(tags) && tags.every(isValidHashtag);
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  TAG_ERROR_TEXT
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', setOnFormSubmit);

export {closeModal, setOnFormSubmit};

import {isEscapeKey} from './util.js';
import {picturesData} from './picture.js';

const body = document.querySelector('body');
// большая версия каринки
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
// маленькая версия картинки
const bigPictureOpenElements = document.querySelectorAll('.picture');
// крестик на большой картинке
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const countLikesElement = bigPictureElement.querySelector('.likes-count');
const countCommentsElement = bigPictureElement.querySelector('.comments-count');
const commentsList = bigPictureElement.querySelector('.social__comments');
const descriptionElement = bigPictureElement.querySelector('.social__caption');


const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
  }
};

const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const closeBigPicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');

  document.removeEventListener('keydown', onBigPictureEscKeydown);

  body.classList.remove('modal-open');
};

const openBigPicture = (src, countLikes, countComments, description) => {
  bigPictureImgElement.src = src;
  countLikesElement.textContent = countLikes;
  countCommentsElement.textContent = countComments;
  descriptionElement.textContent = description;


  bigPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', onBigPictureEscKeydown);

  body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const generateComments = (commentsArray) => {
  commentsArray.forEach((comment) => {
    const commentElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;


    commentsList.appendChild(commentElement);
  });

  // commentsList.appendChild(picturesFragment);
};

bigPictureOpenElements.forEach((picture, index) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    const commentsArray = picturesData[index].comments;
    generateComments(commentsArray);

    const imgSrc = picture.querySelector('img').src;
    const imgLikes = picture.querySelector('.picture__likes').textContent;
    const imgComents = picture.querySelector('.picture__comments').textContent;
    const imgDescription = picturesData[index].description;
    openBigPicture(imgSrc, imgLikes, imgComents, imgDescription);
  });
});


bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});


export {openBigPicture, closeBigPicture};


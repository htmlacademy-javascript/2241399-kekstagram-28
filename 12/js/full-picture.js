import {isEscapeKey} from './util.js';

const COMMENTS_PER_LOAD = 5;

const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const countLikesElement = bigPictureElement.querySelector('.likes-count');
const countCommentsElement = bigPictureElement.querySelector('.comments-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const commentLoader = bigPictureElement.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const bigPicCommentsSection = bigPictureElement.querySelector('.social__comments');

const minCommentsCount = bigPictureElement.querySelector('.comments-current-count');
let batchOfComments;
let localComments;


const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
  }
};

// Отрисовка отдельно взятого коммента и добавление в <ul>
const createComments = (comments) => {
  const singleCommentFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    singleCommentFragment.appendChild(newComment);
  });
  bigPicCommentsSection.innerHTML = '';
  bigPicCommentsSection.appendChild(singleCommentFragment);
};

// Загрузка новых комментариев
const loadMoreComments = () => {
  batchOfComments += COMMENTS_PER_LOAD;
  const loadedComments = localComments.slice(0, batchOfComments);
  if (loadedComments.length === localComments.length) {
    commentLoader.classList.add('hidden');
  }
  createComments(loadedComments);
  minCommentsCount.textContent = loadedComments.length;
};

// Отображение комментариев
const loadComments = () => {
  if (localComments.length <= COMMENTS_PER_LOAD) {
    createComments(localComments);
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
    batchOfComments = COMMENTS_PER_LOAD;
    createComments(localComments.slice(0, batchOfComments));
  }
  commentLoader.addEventListener('click', loadMoreComments);
};

const closeBigPicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');

  document.removeEventListener('keydown', onBigPictureEscKeydown);

  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  commentLoader.removeEventListener('click', loadMoreComments);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

const openBigPicture = (src, countLikes, countComments, description) => {
  //Добавляем данные выбранного фото в разметку
  bigPictureImgElement.src = src;
  countLikesElement.textContent = countLikes;
  countCommentsElement.textContent = countComments;
  descriptionElement.textContent = description;

  bigPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', onBigPictureEscKeydown);

  body.classList.add('modal-open');
};

const addEventListenersPictures = (data) => {
  const onMiniPicClick = (evt) => {
    if(evt.target.closest('.picture')) {
      const target = evt.target.closest('.picture');
      const localPicElement = data.find((photoItem) => Number(target.dataset.id) === photoItem.id);
      localComments = localPicElement.comments;
      loadComments(localComments);
      const numberOfComments = localPicElement.comments.length;

      const imgSrc = localPicElement.url;
      const imgLikes = localPicElement.likes;
      const imgComents = localPicElement.comments.length;
      const imgDescription = localPicElement.description;

      minCommentsCount.textContent = numberOfComments <= COMMENTS_PER_LOAD ? numberOfComments : COMMENTS_PER_LOAD;

      openBigPicture(imgSrc, imgLikes, imgComents, imgDescription);
    }
  };

  document.querySelector ('.pictures').addEventListener('click', onMiniPicClick);
};


export {openBigPicture, closeBigPicture, addEventListenersPictures};

import {isEscapeKey} from './util.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

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
const currentCommetsCount = bigPictureElement.querySelector('.comments-current-count');
const commentsLoader = document.querySelector('.comments-loader');
const PAGE_LIMIT = 5;
const FIRST_PAGE_INDEX = 1;

let currentPage = FIRST_PAGE_INDEX;


const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
  }
};

//Пришлось занести в функцию openBigPicture функции handleButtonStatus и showComments,
//так как найти способ как-то по-другому удалять обработчик кнопки commentsLoader не получилось

//Функция для открытия модалки с большим фото и подробной информацией
const openBigPicture = (src, countLikes, countComments, description) => {
  //Добавляем данные выбранного фото в разметку
  bigPictureImgElement.src = src;
  countLikesElement.textContent = countLikes;
  countCommentsElement.textContent = countComments;
  descriptionElement.textContent = description;

  bigPictureElement.classList.remove('hidden');
  console.log(bigPictureElement);

  document.addEventListener('keydown', onBigPictureEscKeydown);

  body.classList.add('modal-open');

  //Массив данных с элементами - комментариями
  const commentsArray = bigPictureElement.querySelectorAll('.social__comment');

  //Считаем количество всех страниц с комментариями
  const pageCount = Math.ceil(commentsArray.length / PAGE_LIMIT);

  //сбрасываем счетчик текущей страницы на начальное значение

  currentPage = FIRST_PAGE_INDEX;
  currentCommetsCount.textContent = commentsArray.length > PAGE_LIMIT ? PAGE_LIMIT : commentsArray.length;
  commentsLoader.classList.remove('hidden');

  //Скрываем все комментарии, которые потом будем показывать постранично по нажатию на кнопку "Показать еще"
  for (let i = currentCommetsCount.textContent; i < commentsArray.length; i++) {
    commentsArray[i].classList.add('hidden');
  }

  const handleButtonStatus = () => {
    if (pageCount <= currentPage) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', myListener);
    }
  };

  handleButtonStatus();

  //Функция постраничного отображения комментариев
  const showComments = (pageIndex) => {
    //увеличиваем индекс текущей страницы
    currentPage = pageIndex;

    //Проверяем, находимся ли мы на последней странице, чтобы скрыть кнопку "Показать еще"
    handleButtonStatus();

    const startRange = (pageIndex - 1) * PAGE_LIMIT;
    const endRange = currentPage === pageCount ? commentsArray.length : pageIndex * PAGE_LIMIT;

    for (let i = startRange; i < endRange; i++) {
      commentsArray[i].classList.remove('hidden');
    }

    //Обновляем цифру отображенных комментов на странице в разметке
    currentCommetsCount.textContent = endRange;
  };

  function myListener() {
    showComments(currentPage + 1);
  }

  //Обработчик нажатия на кнопку "Показать еще"
  commentsLoader.addEventListener('click', myListener);
};

const generateComments = (commentsArray) => {
  const commentElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);

  //Очищаем список комментариев
  commentsList.innerHTML = '';

  //Создаем комментарии с данными выбранного фото и добавляем их в модалку
  commentsArray.forEach((comment) => {
    const cloneCommentElement = commentElement.cloneNode(true);
    cloneCommentElement.querySelector('.social__picture').src = comment.avatar;
    cloneCommentElement.querySelector('.social__picture').alt = comment.name;
    cloneCommentElement.querySelector('.social__text').textContent = comment.message;
    commentsList.appendChild(cloneCommentElement);
  });
};

const addEventListenersPictures = (data) => {
  bigPictureOpenElements.forEach((picture, index) => {
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      console.log('fghj');
      const commentsArray = data[index].comments;
      generateComments(commentsArray);

      const imgSrc = picture.querySelector('img').src;
      const imgLikes = picture.querySelector('.picture__likes').textContent;
      const imgComents = picture.querySelector('.picture__comments').textContent;
      const imgDescription = data[index].description;

      openBigPicture(imgSrc, imgLikes, imgComents, imgDescription);
    });
  });
};

try {
  const picturesData = await getData();

  console.log('picturesData', picturesData);

  window.addEventListener('DOMContentLoaded', () => {
    addEventListenersPictures(picturesData);
  });


}catch (err) {
  showAlert(err.message);
}

const closeBigPicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');

  document.removeEventListener('keydown', onBigPictureEscKeydown);

  body.classList.remove('modal-open');
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture, closeBigPicture};

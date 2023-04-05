import {getRandomInteger, getRandomArrayElement} from './util.js';

const DESCRIPTIONS_LIST = ['Дерево', 'Хоршо', 'Дорога'];
const MESSAGES_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES_LIST = ['Маша', 'Катя', 'Петя'];

const COUNT_LIKES_MIN = 1;
const COUNT_LIKES_MAX = 5;
const COUNT_COMMENTS = 3;
const COUNT_DESCRIPTIONS = 25;

const generateComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES_LIST),
  name: getRandomArrayElement(NAMES_LIST),
});

const generateCommentsArray = (count) => {
  const commentsArray = [];
  for (let i = 0; i <= count; i++) {
    commentsArray.push(generateComment(i));
  }
  return commentsArray;
};

const generateDescriprion = (i) => ({
  id: i,
  url: `photos/${i + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS_LIST),
  likes: getRandomInteger(COUNT_LIKES_MIN, COUNT_LIKES_MAX),
  comments: generateCommentsArray(COUNT_COMMENTS),
});

const generateDescriptionsArray = () => {
  const descriptionsArray = [];
  for (let i = 0; i < COUNT_DESCRIPTIONS; i++) {
    descriptionsArray.push(generateDescriprion(i));
  }
  return descriptionsArray;
};

generateDescriptionsArray();

export {generateDescriptionsArray, generateDescriprion};

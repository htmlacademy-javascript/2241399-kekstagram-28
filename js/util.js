const getRandomInteger = (minNumber, maxNumber) => {
  const lower = Math.ceil(Math.min(minNumber, maxNumber));
  const upper = Math.floor(Math.max(minNumber, maxNumber));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (arrayName) => arrayName[getRandomInteger(0, arrayName.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';


export {getRandomInteger, getRandomArrayElement, isEscapeKey, isEnterKey};

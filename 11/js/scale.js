const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (index) => {
  imageElement.style.transform = `scale(${index / 100})`;
  scaleElement.value = `${index}%`;
};

const onSmallerButtonClick = () => {
  const currentIndex = parseInt(scaleElement.value, 10);
  let newIndex = currentIndex - SCALE_STEP;
  if (newIndex < MIN_SCALE) {
    newIndex = MIN_SCALE;
  }
  scaleImage(newIndex);
};

const onBiggerButtonClick = () => {
  const currentIndex = parseInt(scaleElement.value, 10);
  let newIndex = currentIndex + SCALE_STEP;
  if(newIndex > MAX_SCALE) {
    newIndex = MAX_SCALE;
  }
  scaleImage(newIndex);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };

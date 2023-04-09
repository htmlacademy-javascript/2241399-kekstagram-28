const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__overlay');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const openSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const closeSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const onEffectsChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')){
    return;
  }
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

window.noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step:DEFAULT_EFFECT.step,
  connect: 'lower',
});
closeSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};

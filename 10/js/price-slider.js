const START_SLIDER = 0;
const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
priceInput.value = 0;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  start: START_SLIDER,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed();
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceInput.value = sliderElement.noUiSlider.get();
});

priceInput.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceInput.value);
});

export {
  sliderElement,
  START_SLIDER
};

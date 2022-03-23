const map = document.querySelector('.map__filters');
const mapElements = map.querySelectorAll('select, fieldset');
const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');

const switchForm = (activate = false) => {
  map.classList.add('map__filters--disabled');
  mapElements.forEach((element) => {
    element.disabled = !activate;
  });
  form.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.disabled = !activate;
  });
  if (activate) {
    map.classList.remove('map__filters--disabled');
    form.classList.remove('ad-form--disabled');
  }
};

export {
  switchForm
};

const map = document.querySelector('.map__filters');
const mapElements = map.querySelectorAll('select, fieldset');
const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');


const disablingForm = () => {
  map.classList.add('map__filters--disabled');
  mapElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  form.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const enablingForm = () => {
  map.classList.remove('map__filters--disabled');
  mapElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  form.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {
  disablingForm,
  enablingForm
};

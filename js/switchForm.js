const filtersMap = document.querySelector('.map__filters');
const mapElements = filtersMap.querySelectorAll('select, fieldset');
const userForm = document.querySelector('.ad-form');
const formElements = userForm.querySelectorAll('fieldset');

const switchUserForm = (activate = false) => {
  userForm.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.disabled = !activate;
  });
  if (activate) {
    userForm.classList.remove('ad-form--disabled');
  }
};

const switchFilter = (activate = false) => {
  filtersMap.classList.add('map__filters--disabled');
  mapElements.forEach((element) => {
    element.disabled = !activate;
  });
  if (activate) {
    filtersMap.classList.remove('map__filters--disabled');
  }
};

export {
  switchUserForm,
  switchFilter
};

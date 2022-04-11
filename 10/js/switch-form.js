const filterMap = document.querySelector('.map__filters');
const mapElements = filterMap.querySelectorAll('select, fieldset');
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
  filterMap.classList.add('map__filters--disabled');
  mapElements.forEach((element) => {
    element.disabled = !activate;
  });
  if (activate) {
    filterMap.classList.remove('map__filters--disabled');
  }
};

export {
  switchUserForm,
  switchFilter
};

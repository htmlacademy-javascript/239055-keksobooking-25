import './priceSlider.js';
import { sendData } from './api.js';
import { formReset } from './util.js';

const form = document.querySelector('.ad-form');
const buttonSubmit = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
};

const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

const roomsNumber = form.querySelector('#room_number');
const guestsNumber = form.querySelector('#capacity');
const capacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const validateCapacity = () => capacity[roomsNumber.value].includes(Number(guestsNumber.value));
const getRoomsErrorMessage = () => {
  switch (Number(roomsNumber.value)) {
    case 100:
      return 'Не для гостей';
    case 1:
      return 'Не более 1-го гостя';
    case 2:
      return 'Не более 2-х гостей';
  }
};

const getGuestsErrorMessage = () => {
  switch (Number(guestsNumber.value)) {
    case 0:
      return 'Необходимо не менее 100 комнат';
    case 2:
      return 'Необходимо не менее 2-х комнат';
    case 3:
      return 'Необходимо не менее 3-х комнат';
  }
};

pristine.addValidator(roomsNumber, validateCapacity, getRoomsErrorMessage);
pristine.addValidator(guestsNumber, validateCapacity, getGuestsErrorMessage);

const typeAd = form.querySelector('#type');
const price = form.querySelector('#price');
const priceByType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const changeMinPrice = () => {
  price.min = priceByType[typeAd.value];
  price.placeholder = priceByType[typeAd.value];
};

typeAd.addEventListener('change', changeMinPrice);
const validatePrice = () => price.value && Number(form.querySelector('#price').value) >= Number(form.querySelector('#price').min);
const getPriceErrorMessage = () => `Минимальная цена - ${price.min}`;
pristine.addValidator(price, validatePrice, getPriceErrorMessage);

const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const changeTimeIn = () => {
  timeOut.value = timeIn.value;
};
const changeTimeOut = () => {
  timeIn.value = timeOut.value;
};
timeIn.addEventListener('change', changeTimeIn);
timeOut.addEventListener('change', changeTimeOut);

const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockButtonSubmit();
      sendData(
        () => {
          onSuccess();
          unblockButtonSubmit();
        },
        () => {
          onError();
          unblockButtonSubmit();
        },
        new FormData(evt.target)
      );
    }
  });
};

resetButton.addEventListener('click', formReset);

export { setUserFormSubmit };

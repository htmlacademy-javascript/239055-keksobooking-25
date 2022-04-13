import { sendData } from './api.js';
import { onFormResetClick } from './util.js';

const userForm = document.querySelector('.ad-form');
const submitButton = userForm.querySelector('.ad-form__submit');
const resetButton = userForm.querySelector('.ad-form__reset');

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const pristine = new Pristine(userForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

const roomsNumber = userForm.querySelector('#room_number');
const guestsNumber = userForm.querySelector('#capacity');
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

const typeAd = userForm.querySelector('#type');
const price = userForm.querySelector('#price');
const priceByType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const onPriceChange = () => {
  price.min = priceByType[typeAd.value];
  price.placeholder = priceByType[typeAd.value];
};

typeAd.addEventListener('change', onPriceChange);
const validatePrice = () => price.value && Number(userForm.querySelector('#price').value) >= Number(userForm.querySelector('#price').min);
const getPriceErrorMessage = () => `Минимальная цена - ${price.min}`;
pristine.addValidator(price, validatePrice, getPriceErrorMessage);

const timeIn = userForm.querySelector('#timein');
const timeOut = userForm.querySelector('#timeout');
const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};
const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};
timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

const setUserFormSubmit = (onSuccess, onError) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onError();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

resetButton.addEventListener('click', onFormResetClick);

export { setUserFormSubmit };

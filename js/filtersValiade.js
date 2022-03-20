Pristine.addMessages('ru', {
  required: 'Поле обязательно для заполнения',
  email: 'В этом поле требуется действующий адрес электронной почты',
  number: 'В этом поле необходимо указать число',
  integer: 'то поле требует целочисленного значения',
  url: 'В этом поле необходимо указать действительный URL-адрес веб-сайта.',
  tel: 'В этом поле необходимо указать действительный номер телефона',
  maxlength: 'Длина поля не должна превышать ${1} символов',
  minlength: 'Длина поля не может быть менее ${1} символов',
  min: 'Минимально допустимое значение - ${1}',
  max: 'Максимально допустимое значение - ${1}',
  pattern: 'Соответствуйте запрошенному формату',
  equals: 'Поля не совпадают'
});
Pristine.setLocale('ru');

const form = document.querySelector('.ad-form');

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

const changeMinPrice = () => {
  switch (typeAd.value) {
    case 'bungalow':
      price.min = 0;
      price.placeholder = '0';
      break;
    case 'flat':
      price.min = 1000;
      price.placeholder = '1000';
      break;
    case 'hotel':
      price.min = 3000;
      price.placeholder = '3000';
      break;
    case 'house':
      price.min = 5000;
      price.placeholder = '5000';
      break;
    case 'palace':
      price.min = 10000;
      price.placeholder = '10000';
      break;
  }
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

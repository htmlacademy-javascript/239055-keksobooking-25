const MAX_PRICE = 100000;

const filters = document.querySelector('.ad-form');

const pristine = new Pristine(filters, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

// const pristine = new Pristine(orderForm, {
//   classTo: 'form__item', // Элемент, на который будут добавляться классы
//   errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
//   successClass: 'form__item--valid', // Класс, обозначающий валидное поле
//   errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
//   errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
//   errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
// });

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  filters.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const validatePrice = (value) => value < MAX_PRICE;

pristine.addValidator(
  filters.querySelector('#price'),
  validatePrice,
  'Не более 100 000'
);

const roomsNumber = filters.querySelector('#room_number');
const guestsNumber = filters.querySelector('#capacity');
const capacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const validateCapacity = () => capacity[roomsNumber.value].includes(guestsNumber.value);
const getCapacityErrorMessage = () => 'Лажа';

pristine.addValidator(roomsNumber, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(guestsNumber, validateCapacity, getCapacityErrorMessage);

filters.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

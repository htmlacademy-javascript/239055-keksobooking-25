import { isEscapeKey } from './util.js';

const bodyHTML = document.querySelector('body');
const form = document.querySelector('.ad-form');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');
const onSuccess = templateSuccess.cloneNode(true);
const onError = templateError.cloneNode(true);
const closeOnError = onError.querySelector('.error__button');

const showFormMessage = (message) => () => {
  bodyHTML.appendChild(message);
  message.classList.add('shownMessage');
};

// const closeFormMessage = () => {
//   const shownMessage = document.querySelector('.shownMessage');
//   shownMessage.remove();
// };

onSuccess.addEventListener('click', () => {
  onSuccess.remove();
  form.reset();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onSuccess.remove();
  }
});

onError.addEventListener('click', () => {
  onError.remove();
});

closeOnError.addEventListener('click', () => {
  onError.remove();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onError.remove();
  }
});

export {
  showFormMessage,
  onSuccess,
  onError
};

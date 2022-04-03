import { isEscapeKey } from './util.js';

const bodyHTML = document.querySelector('.body');
const form = document.querySelector('.ad-form');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');
const successMessage = templateSuccess.cloneNode(true);
const errorMessage = templateError.cloneNode(true);
const closeErrorMessage = errorMessage.querySelector('.error__button');

const showSuccessMessage = () => {
  bodyHTML.appendChild(successMessage);
};

successMessage.addEventListener('click', () => {
  successMessage.remove();
  form.reset();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessage.remove();
  }
});

const showErrorMessage = () => {
  bodyHTML.appendChild(errorMessage);
};

errorMessage.addEventListener('click', () => {
  errorMessage.remove();
});

closeErrorMessage.addEventListener('click', () => {
  errorMessage.remove();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessage.remove();
  }
});

export {
  showSuccessMessage,
  showErrorMessage
};

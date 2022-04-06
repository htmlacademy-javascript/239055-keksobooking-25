import { isEscapeKey, formReset } from './util.js';

const bodyHTML = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');
const onSuccess = templateSuccess.cloneNode(true);
const onError = templateError.cloneNode(true);
const closeOnError = onError.querySelector('.error__button');

const showFormMessage = (message) => () => {
  bodyHTML.appendChild(message);
  message.classList.add('shownMessage');
};

function onCloseFormMessage (evt) {
  const shownMessage = document.querySelector('.shownMessage');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (shownMessage.classList.contains('success')) {
      formReset();
    }
    shownMessage.remove();
    document.removeEventListener('keydown', onCloseFormMessage);
  }
}

document.addEventListener('keydown', onCloseFormMessage);

onSuccess.addEventListener('click', () => {
  formReset();
  onSuccess.remove();
});

onError.addEventListener('click', () => {
  onError.remove();
});

closeOnError.addEventListener('click', () => {
  onError.remove();
});

export {
  showFormMessage,
  onSuccess,
  onError
};

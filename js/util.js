import {
  DEFAULT_MARKER_POSITION,
  DEFAULT_VIEW,
  mainMarker,
  mapCanvas,
  address,
  renderCards
} from './map.js';
import {
  sliderElement,
  START_SLIDER
} from './priceSlider.js';
import {
  filterForm,
  getFilteredArray
} from './filter.js';
import {
  previewUserPhoto,
  previewHousingPhoto
} from './userPictures.js';
import { getData } from './api.js';

const showDataErrorMessage = (textMessage, delay) => () => {
  const messageContainer = document.querySelector('.map__canvas');
  const message = document.createElement('div');
  message.style.zIndex = 1000;
  message.style.padding = '50px';
  message.style.fontSize = '30px';
  message.style.textAlign = 'center';
  message.style.width = '50%';
  message.style.left = '50%';
  message.style.top = '50%';
  message.style.transform = 'translate(-50%, -50%)';
  message.style.borderRadius = '20px';
  message.style.position = 'absolute';
  message.style.margin = '0 auto';
  message.style.backgroundColor = '#ededed';
  message.style.opacity = '0.9';
  message.textContent = textMessage;
  messageContainer.append(message);

  if (delay) {
    setTimeout(() => {
      message.remove();
    }, delay);
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const form = document.querySelector('.ad-form');
const formReset = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  form.reset();
  filterForm.reset();
  mainMarker.setLatLng(DEFAULT_MARKER_POSITION);
  mapCanvas.setView(DEFAULT_MARKER_POSITION, DEFAULT_VIEW);
  mapCanvas.closePopup();
  address.value = DEFAULT_MARKER_POSITION;
  sliderElement.noUiSlider.set(START_SLIDER);
  previewUserPhoto.src = 'img/muffin-grey.svg';
  previewHousingPhoto.innerHTML = '';
  getData((data) => {
    const filteredData = getFilteredArray(data);
    renderCards(filteredData);
  },);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  showDataErrorMessage,
  isEscapeKey,
  formReset,
  debounce
};

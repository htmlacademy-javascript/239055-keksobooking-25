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
} from './price-slider.js';
import {
  filterForm,
  getFilteredArray
} from './filter.js';
import {
  previewUserPhoto,
  previewHousingPhoto
} from './user-pictures.js';
import { getData } from './api.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const form = document.querySelector('.ad-form');
const onFormResetClick = (evt) => {
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
  isEscapeKey,
  onFormResetClick,
  debounce
};


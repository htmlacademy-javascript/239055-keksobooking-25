import './formValidate.js';
import './priceSlider.js';
import { renderCards } from './map.js';
import { showDataErrorMessage } from './util.js';
import { setUserFormSubmit } from './formValidate.js';
import { showSuccessMessage } from './modalMessage.js';
import { showErrorMessage } from './modalMessage.js';

fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .catch(() => showDataErrorMessage())
  .then((adsads) => renderCards(adsads));

setUserFormSubmit(showSuccessMessage, showErrorMessage);

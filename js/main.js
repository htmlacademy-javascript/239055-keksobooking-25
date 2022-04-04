import './formValidate.js';
import './priceSlider.js';
import { renderCards } from './map.js';
import { showDataErrorMessage } from './util.js';
import { setUserFormSubmit } from './formValidate.js';
import { showFormMessage, onSuccess, onError } from './modalMessage.js';
import { getData } from './api.js';

getData(renderCards, showDataErrorMessage);

setUserFormSubmit(showFormMessage(onSuccess), showFormMessage(onError));

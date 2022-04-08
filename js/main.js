import './formValidate.js';
import './userPictures.js';
import { renderCards } from './map.js';
import {
  showDataErrorMessage,
  debounce } from './util.js';
import { setUserFormSubmit } from './formValidate.js';
import { showFormMessage, onSuccess, onError } from './modalMessage.js';
import { getData } from './api.js';
import { getFilteredArray, onChangeFilter } from './filter.js';

const DELAY_POPUP_MESSAGE = 5000;
const RERENDER_DELAY = 500;

getData(
  (data) => {
    let filteredData = getFilteredArray(data);
    // if (!filteredData.length) {
    //   showDataErrorMessage('Нет соответствующих объявлений', DELAY_POPUP_MESSAGE);
    // }
    renderCards(filteredData);
    onChangeFilter(debounce(() => {
      filteredData = getFilteredArray(data);
      renderCards(filteredData);
    }, RERENDER_DELAY));
  },
  showDataErrorMessage('Не удалось загрузить данные. Попробуйте обновить страницу', DELAY_POPUP_MESSAGE)
);

setUserFormSubmit(showFormMessage(onSuccess), showFormMessage(onError));

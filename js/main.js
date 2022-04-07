import './formValidate.js';
import { renderCards } from './map.js';
import { showDataErrorMessage } from './util.js';
import { setUserFormSubmit } from './formValidate.js';
import { showFormMessage, onSuccess, onError } from './modalMessage.js';
import { getData } from './api.js';
import { onChangeTypeHouse } from './filter.js';
import { onChangeRoomsHouse } from './filter.js';
import { onChangeGuestsHouse } from './filter.js';
import { onChangePriceHouse } from './filter.js';
// import { onChangeFeaturesHouse } from './filter.js';

const DELAY_POPUP_MESSAGE = 5000;

getData(
  (data) => {
    renderCards(data);
    onChangeTypeHouse(() => renderCards(data));
    onChangeRoomsHouse(() => renderCards(data));
    onChangeGuestsHouse(() => renderCards(data));
    onChangePriceHouse(() => renderCards(data));
    // onChangeFeaturesHouse(() => renderCards(data));
  },
  showDataErrorMessage('Не удалось загрузить данные. Попробуйте обновить страницу', DELAY_POPUP_MESSAGE)
);

// getData(
//   (renderCards),
//   showDataErrorMessage('Не удалось загрузить данные. Попробуйте обновить страницу', DELAY_POPUP_MESSAGE)
// );

setUserFormSubmit(showFormMessage(onSuccess), showFormMessage(onError));

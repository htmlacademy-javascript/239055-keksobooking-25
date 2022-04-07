import { showDataErrorMessage } from './util.js';

const AVERAGE_PRICE_RANGE = {
  min: 10000,
  max: 50000
};
const DELAY_POPUP_MESSAGE = 2000;
const filter = document.querySelector('.map__filters');
const typeHouse = filter.querySelector('#housing-type');
const priceHouse = filter.querySelector('#housing-price');
const roomsHouse = filter.querySelector('#housing-rooms');
const guestsHouse = filter.querySelector('#housing-guests');
// const featuresHouse = filter.querySelector('.map__features');

// const getFeaturesHouse = () => {
//   const featuresHouseElements = featuresHouse.querySelectorAll('[type=checkbox]:checked');
//   const values = Array.prototype.map.call(featuresHouseElements, ({ value }) => value);
//   console.log(values);
//   return values;
// };

// const comparisonFeatures = (element) => {
//   const elementFeatures = element.offer.features.sort();
//   const elementFeatures2 = getFeaturesHouse().sort();
//   if ((element.offer.features))
// };

const comparisonType = (element) => {
  if ((element.offer.type === typeHouse.value) || typeHouse.value === 'any') {
    return true;
  }
  return false;
};

const comparisonPrice = (element) => {
  let priceRange = 'middle';
  if (element.offer.price < AVERAGE_PRICE_RANGE.min) {
    priceRange = 'low';
  } else if (element.offer.price > AVERAGE_PRICE_RANGE.max) {
    priceRange = 'high';
  }
  if ((priceRange === priceHouse.value) || priceHouse.value === 'any') {
    return true;
  }
  return false;
};

const comparisonRooms = (element) => {
  if ((element.offer.rooms === parseInt((roomsHouse.value), 10)) || roomsHouse.value === 'any') {
    return true;
  }
  return false;
};

const comparisonGuests = (element) => {
  if ((element.offer.guests === parseInt((guestsHouse.value), 10)) || guestsHouse.value === 'any') {
    return true;
  }
  return false;
};

const getFilteredArray = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (
      comparisonType(element) &&
      comparisonPrice(element) &&
      comparisonRooms(element) &&
      comparisonGuests(element)) {
      newArray.push(element);
    }
  });

  if (newArray.length) {
    console.log(`Совпадений - ${newArray.length}`);
    console.log(newArray);
    return newArray;
  } else {
    console.log('Совпадений нет');
    const show = showDataErrorMessage('Нет соответствующих объявлений', DELAY_POPUP_MESSAGE);
    show();
  }
};

const onChangeTypeHouse = (cb) => {
  typeHouse.addEventListener('change', cb);
};

const onChangePriceHouse = (cb) => {
  priceHouse.addEventListener('change', cb);
};

const onChangeRoomsHouse = (cb) => {
  roomsHouse.addEventListener('change', cb);
};

const onChangeGuestsHouse = (cb) => {
  guestsHouse.addEventListener('change', cb);
};

// const onChangeFeaturesHouse = (cb) => {
//   featuresHouse.addEventListener('change', () => {
//     getFeaturesHouse();
//     cb();
//   });
// };

export {
  getFilteredArray,
  onChangeTypeHouse,
  onChangePriceHouse,
  onChangeRoomsHouse,
  onChangeGuestsHouse
  // onChangeFeaturesHouse
};

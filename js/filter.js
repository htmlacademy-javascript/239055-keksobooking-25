// const PRICE_RANGE = {
//   low: {
//     min: 0,
//     max: 9999
//   },
//   middle: {
//     min: 10000,
//     max: 50000
//   },
//   high: {
//     min: 50001,
//     max: 100000
//   }
// };
const AVERAGE_PRICE_RANGE = {
  min: 10000,
  max: 50000
};
const DEFAULT_VALUE = 'any';
const MAX_NUMBER_AD = 10;
const filterForm = document.querySelector('.map__filters');
const typeHouse = filterForm.querySelector('#housing-type');
const priceHouse = filterForm.querySelector('#housing-price');
const roomsHouse = filterForm.querySelector('#housing-rooms');
const guestsHouse = filterForm.querySelector('#housing-guests');
const featuresHouse = filterForm.querySelector('.map__features');

const getFeaturesHouse = () => {
  const featuresHouseElements = featuresHouse.querySelectorAll('[type=checkbox]:checked');
  const values = Array.prototype.map.call(featuresHouseElements, ({ value }) => value);
  return values;
};

const comparisonFeatures = (element) => {
  const featuresFilter = getFeaturesHouse();
  const featuresAd = element.offer.features;
  const comparison = () => {
    if (featuresAd) {
      for (let i = 0; i < featuresFilter.length; i++) {
        if (!featuresAd.includes(featuresFilter[i])) {
          return false;
        }
      }
      return true;
    }
  };
  if (comparison() || !featuresFilter.length) {
    return true;
  }
  return false;
};

const comparisonType = (element) =>
  (element.offer.type === typeHouse.value) || typeHouse.value === DEFAULT_VALUE;

// const comparisonPrice = (element) =>
//   (element.offer.price >= PRICE_RANGE[priceHouse.value].min &&
//     element.offer.price <= PRICE_RANGE[priceHouse.value].max)
//     || priceHouse.value === DEFAULT_VALUE;

const comparisonPrice = (element) => {
  let priceRange = 'middle';
  if (element.offer.price < AVERAGE_PRICE_RANGE.min) {
    priceRange = 'low';
  } else if (element.offer.price > AVERAGE_PRICE_RANGE.max) {
    priceRange = 'high';
  }
  return (priceRange === priceHouse.value) || priceHouse.value === DEFAULT_VALUE;
};

const comparisonRooms = (element) =>
  (element.offer.rooms === parseInt((roomsHouse.value), 10)) || roomsHouse.value === DEFAULT_VALUE;

const comparisonGuests = (element) =>
  (element.offer.guests === parseInt((guestsHouse.value), 10)) || guestsHouse.value === DEFAULT_VALUE;

const getFilteredArray = (array) => {
  const newArray = [];
  getFeaturesHouse();

  for (let i = 0; i < array.length; i++) {
    if (newArray.length < MAX_NUMBER_AD) {
      if (
        comparisonType(array[i]) &&
        comparisonPrice(array[i]) &&
        comparisonRooms(array[i]) &&
        comparisonGuests(array[i]) &&
        comparisonFeatures(array[i])) {
        newArray.push(array[i]);
      }
    }
  }
  return newArray;
};

const onChangeFilter = (cb) => {
  filterForm.addEventListener('change', cb);
};

export {
  filterForm,
  getFilteredArray,
  onChangeFilter
};

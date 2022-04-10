const PRICE_RANGE = {
  low: {
    min: 0,
    max: 9999
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50001,
    max: 100000
  }
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

const compareFeatures = (element) => {
  const featuresFilter = getFeaturesHouse();
  const featuresAd = element.offer.features;
  const compare = () => {
    if (featuresAd) {
      for (let i = 0; i < featuresFilter.length; i++) {
        if (!featuresAd.includes(featuresFilter[i])) {
          return false;
        }
      }
      return true;
    }
  };
  if (compare() || !featuresFilter.length) {
    return true;
  }
  return false;
};

const compareType = (element) =>
  typeHouse.value === DEFAULT_VALUE || (element.offer.type === typeHouse.value);

const comparePrice = (element) =>
  priceHouse.value === DEFAULT_VALUE || element.offer.price >= PRICE_RANGE[priceHouse.value].min &&
    element.offer.price <= PRICE_RANGE[priceHouse.value].max;

const compareRooms = (element) =>
  roomsHouse.value === DEFAULT_VALUE || (element.offer.rooms === parseInt((roomsHouse.value), 10));

const compareGuests = (element) =>
  guestsHouse.value === DEFAULT_VALUE || (element.offer.guests === parseInt((guestsHouse.value), 10));

const getFilteredArray = (array) => {
  const newArray = [];
  getFeaturesHouse();

  for (let i = 0; i < array.length; i++) {
    if (newArray.length < MAX_NUMBER_AD) {
      if (
        compareType(array[i]) &&
        comparePrice(array[i]) &&
        compareRooms(array[i]) &&
        compareGuests(array[i]) &&
        compareFeatures(array[i])) {
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

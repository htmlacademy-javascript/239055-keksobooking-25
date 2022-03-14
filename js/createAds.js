import {
  getRandomInt,
  getRandomElement,
  shuffleArray,
  getRandomFloat,
  getLinksAvatar,
  getRandomArray
} from './util.js';

import {
  COUNT_ADS,
  MIN_PRICE,
  MAX_PRICE,
  MAX_ROOMS,
  MAX_GUESTS,
  MIN_LOCATION_LAT,
  MAX_LOCATION_LAT,
  MIN_LOCATION_LNG,
  MAX_LOCATION_LNG,
  DECIMAL,
  PHOTOS_AD,
  FEATURES_AD,
  TIMES_RENTAL,
  TYPES_AD,
  TITLES_AD
} from './data.js';

const createAd = () => {
  const price = getRandomInt(MIN_PRICE, MAX_PRICE);
  const type = getRandomElement(Object.keys(TYPES_AD));
  const title = `${getRandomElement(TITLES_AD)} ${type} for ${price} per night`;
  const rooms = getRandomInt(1, MAX_ROOMS);
  const guests = getRandomInt(1, MAX_GUESTS);
  const features = shuffleArray(FEATURES_AD).slice(0, getRandomInt(1, FEATURES_AD.length-1));
  const locationLat = getRandomFloat(MIN_LOCATION_LAT, MAX_LOCATION_LAT, DECIMAL);
  const locationLng = getRandomFloat(MIN_LOCATION_LNG, MAX_LOCATION_LNG, DECIMAL);
  return {
    author: {
      avatar: `img/avatars/user${getLinksAvatar()}.png`,
    },

    offer: {
      title: title,
      address: `${locationLat}, ${locationLng}`,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: getRandomElement(TIMES_RENTAL),
      checkout: getRandomElement(TIMES_RENTAL),
      features: features,
      description: `${title}, with ${rooms} rooms that can accommodate up to ${guests} guests! We have ${features.join(', ')}.`,
      photos: getRandomArray(PHOTOS_AD),
    },

    location: {
      lat: locationLat,
      lng: locationLng,
    }
  };
};

const createAds = () => Array.from({length: COUNT_ADS}, createAd);

export {createAds};

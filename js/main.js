const COUNT_ADS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 10;
const MIN_LOCATION_LAT = 35.65;
const MAX_LOCATION_LAT = 35.7;
const MIN_LOCATION_LNG = 139.7;
const MAX_LOCATION_LNG = 139.8;
const DECIMAL = 5;

const PHOTOS_AD = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const FEATURES_AD = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const TIMES_RENTAL = [
  '12:00',
  '13:00',
  '14:00',
];

const TIPES_AD = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TITLES_AD = [
  'Cheap',
  'Wonderful',
  'Cool',
  'Great',
  'Mind-blowing',
];

const linksAvatar = Array.from({length: COUNT_ADS}, (v, k) => k+1);

const getRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return 'Неправильные аргументы';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, decimal) => {
  if (min < 0 || min >= max || decimal < 0) {
    return 'Неправильные аргументы';
  }
  return (Math.random() * (max - min) + min).toFixed(decimal);
};

const getRandomElement = (elements) => elements[getRandomInt(0, elements.length-1)];

const getLinksAvatar = () => {
  let randomIndex = getRandomInt(0, linksAvatar.length-1);
  if (linksAvatar.length === 1) {
    randomIndex = 0;
  }
  let randomLink = linksAvatar[randomIndex];
  if (randomLink < 10) {
    randomLink = `0${randomLink}`;
  }
  linksAvatar.splice(randomIndex, 1);
  return randomLink;
};

const getRandomArray = (array) => {
  const MAX_LENGTH_ARRAY = 10;
  const copyArray = array.slice();
  const randomArray = Array.from({length: getRandomInt(1, MAX_LENGTH_ARRAY)});
  for (let i = 0; i < randomArray.length; i++) {
    randomArray[i] = getRandomElement(copyArray);
  }
  return randomArray;
};

const shuffleArray = (array) => {
  let j;
  let temp;
  const copyArray = array.slice();
  for(let i = copyArray.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = copyArray[j];
    copyArray[j] = copyArray[i];
    copyArray[i] = temp;
  }
  return copyArray;
};

const createAd = () => {
  const price = getRandomInt(MIN_PRICE, MAX_PRICE);
  const type = getRandomElement(TIPES_AD);
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

Array.from({length: COUNT_ADS}, createAd);

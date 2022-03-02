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

const COUNT_ADS = 5; // количество предложений, которые необходимо создать
const LINKS_AVATAR = Array.from({length: COUNT_ADS}, (v, k) => k+1); // Массив "ссылок" на аватар

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
  let randomIndex = getRandomInt(0, LINKS_AVATAR.length-1);
  if (LINKS_AVATAR.length === 1) {
    randomIndex = 0;
  }
  let randomLink = LINKS_AVATAR[randomIndex];
  if (randomLink < 10) {
    randomLink = `0${randomLink}`;
  }
  LINKS_AVATAR.splice(randomIndex, 1);
  return randomLink;
};

const getRandomArray = (array) => {
  const COPY_ARRAY = array.slice();
  const MAX_LENGTH_ARRAY = 10;
  const RANDOM_ARRAY = Array.from({length: getRandomInt(1, MAX_LENGTH_ARRAY)});
  for (let i = 0; i < RANDOM_ARRAY.length; i++) {
    RANDOM_ARRAY[i] = getRandomElement(COPY_ARRAY);
  }
  return RANDOM_ARRAY;
};

const shuffleArray = (array) => {
  let j;
  let temp;
  const COPY_ARRAY = array.slice();
  for(let i = COPY_ARRAY.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = COPY_ARRAY[j];
    COPY_ARRAY[j] = COPY_ARRAY[i];
    COPY_ARRAY[i] = temp;
  }
  return COPY_ARRAY;
};

const createAd = () => {
  const MIN_PRICE = 100;
  const MAX_PRICE = 1000;
  const PRICE = getRandomInt(MIN_PRICE, MAX_PRICE);
  const TYPE = getRandomElement(TIPES_AD);
  const TITLE = `${getRandomElement(TITLES_AD)} ${TYPE} for ${PRICE} per night`;
  const MAX_ROOMS = 10;
  const ROOMS = getRandomInt(1, MAX_ROOMS);
  const MAX_GUESTS = 10;
  const GUESTS = getRandomInt(1, MAX_GUESTS);
  const FEATURES = shuffleArray(FEATURES_AD).slice(0, getRandomInt(1, FEATURES_AD.length-1));
  const MIN_LOCATION_LAT = 35.65;
  const MAX_LOCATION_LAT = 35.7;
  const MIN_LOCATION_LNG = 139.7;
  const MAX_LOCATION_LNG = 139.8;
  const DECIMAL = 5;
  const LOCATION_LAT = getRandomFloat(MIN_LOCATION_LAT, MAX_LOCATION_LAT, DECIMAL);
  const LOCATION_LNG = getRandomFloat(MIN_LOCATION_LNG, MAX_LOCATION_LNG, DECIMAL);
  return {
    author: {
      avatar: `img/avatars/user${getLinksAvatar()}.png`, // строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
    },

    offer: {
      title: TITLE, // строка — заголовок предложения. Придумайте самостоятельно.
      address: `${LOCATION_LAT}, ${LOCATION_LNG}`, // строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}
      price: PRICE, // число — стоимость. Случайное целое положительное число
      type: TYPE, // строка — одно из пяти фиксированных значений TIPES_AD
      rooms: ROOMS, // число — количество комнат. Случайное целое положительное число
      guests: GUESTS, // число — количество гостей, которое можно разместить. Случайное целое положительное число
      checkin: getRandomElement(TIMES_RENTAL), // строка — одно из трёх фиксированных значений TIMES_RENTAL
      checkout: getRandomElement(TIMES_RENTAL), // строка — одно из трёх фиксированных значений TIMES_RENTAL
      features: FEATURES, // массив строк — массив случайной длины из значений FEATURES_AD. Значения не должны повторяться
      description: `${TITLE}, with ${ROOMS} rooms that can accommodate up to ${GUESTS} guests! We have ${FEATURES.join(', ')}.`, // строка — описание помещения. Придумайте самостоятельно
      photos: getRandomArray(PHOTOS_AD), // массив строк — массив случайной длины из значений PHOTOS_AD
    },

    location: {
      lat: LOCATION_LAT, // число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
      lng: LOCATION_LNG, // число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
    }
  };
};

Array.from({length: COUNT_ADS}, createAd);

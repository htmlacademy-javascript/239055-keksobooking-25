const photosAd = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const featuresAd = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const timeRental = [
  '12:00',
  '13:00',
  '14:00',
];

const typeAd = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const titleAd = [
  'Cheap',
  'Wonderful',
  'Cool',
  'Great',
  'Mind-blowing',
];

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

const countAds = 10; // количество предложений, которые необходимо создать

let countLinksAvatar = countAds + 1; // вспомогательная переменная для создания массива ссылок на аватар
const createLinksAvatar = () => {
  countLinksAvatar--;
  return countLinksAvatar;
};
const linksAvatar = Array.from({length: countAds}, createLinksAvatar);
const getLinksAvatar = () => {
  let i = getRandomInt(0, linksAvatar.length-1);
  if (linksAvatar.length === 1) {
    i = 0;
  }
  let j = linksAvatar[i];
  if (j < 10) {
    j = '0' + j;
  }
  linksAvatar.splice(i, 1);
  return j;
};

const getRandomArray = (array) => {
  const copyArray = array.slice();
  const randomArray = Array.from({length: getRandomInt(1, 10)});
  for (let i = 0; i < randomArray.length; i++) {
    randomArray[i] = getRandomElement(copyArray);
  }
  return randomArray;
};

const createAd = () => {
  const locationLat = getRandomFloat(35.65, 35.7, 5);
  const locationLng = getRandomFloat(139.7, 139.8, 5);
  const type = getRandomElement(typeAd);
  const price = getRandomInt(100, 1000);
  const rooms = getRandomInt(1, 10);
  const guests = getRandomInt(1, 10);
  const title = getRandomElement(titleAd) + ` ` + type + ` for ` + price + ` per night`;
  const features = featuresAd.slice(0, getRandomInt(1, featuresAd.length-1));
  return {
    author: {
      avatar: 'img/avatars/user' + getLinksAvatar() + '.png', // строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
    },

    offer: {
      title: title, // строка — заголовок предложения. Придумайте самостоятельно.
      address: locationLat + ', ' + locationLng, // строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}
      price: price, // число — стоимость. Случайное целое положительное число
      type: type, // строка — одно из пяти фиксированных значений typeAd
      rooms: rooms, // число — количество комнат. Случайное целое положительное число
      guests: guests, // число — количество гостей, которое можно разместить. Случайное целое положительное число
      checkin: getRandomElement(timeRental), // строка — одно из трёх фиксированных значений timeRental
      checkout: getRandomElement(timeRental), // строка — одно из трёх фиксированных значений timeRental
      features: features, // массив строк — массив случайной длины из значений featuresAd. Значения не должны повторяться
      description: title + ', with ' + rooms + ' rooms that can accommodate up to ' + guests + ' guests! ' + 'We have ' + features.join(', ') + '.', // строка — описание помещения. Придумайте самостоятельно
      photos: getRandomArray(photosAd), // массив строк — массив случайной длины из значений photosAd
    },

    location: {
      lat: locationLat, // число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
      lng: locationLng, // число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
    }
  }
}

const ads = Array.from({length: countAds}, createAd);
console.log(ads);

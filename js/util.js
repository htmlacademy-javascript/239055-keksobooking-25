import {COUNT_ADS} from './data.js';

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

const linksAvatar = Array.from({length: COUNT_ADS}, (v, k) => k+1);

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

const showDataErrorMessage = () => {
  const messageContainer = document.querySelector('.map__canvas');
  const message = document.createElement('div');
  message.style.zIndex = 1000;
  message.style.padding = '50px';
  message.style.fontSize = '30px';
  message.style.textAlign = 'center';
  message.style.width = '50%';
  message.style.left = '50%';
  message.style.top = '50%';
  message.style.transform = 'translate(-50%, -50%)';
  message.style.borderRadius = '20px';
  message.style.position = 'absolute';
  message.style.margin = '0 auto';
  message.style.backgroundColor = '#ededed';
  message.style.opacity = '0.9';
  message.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  messageContainer.append(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInt,
  getRandomElement,
  shuffleArray,
  getRandomFloat,
  getLinksAvatar,
  getRandomArray,
  showDataErrorMessage,
  isEscapeKey
};


import {TYPES_AD} from './data.js';

const templateAd = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');

const renderCard = (itemArray) => {
  const {author, offer} = itemArray;
  const someAd = templateAd.cloneNode(true);
  const title = someAd.querySelector('.popup__title');
  const address = someAd.querySelector('.popup__text--address');
  const price = someAd.querySelector('.popup__text--price');
  const type = someAd.querySelector('.popup__type');
  const capacity = someAd.querySelector('.popup__text--capacity');
  const time = someAd.querySelector('.popup__text--time');
  const features = someAd.querySelector('.popup__features');
  const description = someAd.querySelector('.popup__description');
  const photos = someAd.querySelector('.popup__photos');
  const avatar = someAd.querySelector('.popup__avatar');

  title.textContent = offer.title;
  if (!offer.title) {
    title.remove();
  }

  address.textContent = offer.address;
  if (!offer.title) {
    address.remove();
  }

  price.textContent = `${offer.price} ₽/ночь`;
  if (!offer.price) {
    price.remove();
  }

  type.textContent = TYPES_AD[offer.type];
  if (!offer.type) {
    type.remove();
  }

  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  if (!offer.rooms || !offer.guests) {
    capacity.remove();
  }

  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (!offer.checkout || !offer.checkout) {
    time.remove();
  }

  const featuresAd = offer.features;
  features.innerHTML = '';
  featuresAd.forEach((element) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${element}`);
    features.append(featureItem);
  });
  if (!offer.features) {
    features.remove();
  }

  description.textContent = offer.description;

  const photosAd = offer.photos;
  photos.innerHTML = '';
  photosAd.forEach((element) => {
    const photo = document.createElement('img');
    photo.src = element;
    photo.classList.add('popup__photo');
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    photos.appendChild(photo);
  });
  if (!offer.photos) {
    photos.remove();
  }

  avatar.src = author.avatar;
  if (!author.avatar) {
    avatar.remove();
  }

  map.append(someAd);
};

export {renderCard};
